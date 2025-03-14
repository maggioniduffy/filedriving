"use server";

import { ID, Query } from "appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { appWriteConfig } from "../appwrite/config";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";
import { avatarPlaceholderUrl } from "@/constants";
import { redirect } from "next/navigation";
import { Avatars } from "node-appwrite";

const COOKIE = process.env.COOKIE_NAME! || "appwrite-session";

interface createAccountDTO {
  fullName: string;
  email: string;
}

interface VerifySecretDTO {
  accountId: string;
  password: string;
}

const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();
  const result = await databases.listDocuments(
    appWriteConfig.databaseId,
    appWriteConfig.usersCollectionId,
    [Query.equal("email", email)]
  );

  return result.total > 0 ? result.documents[0] : null;
};

const handleError = (error: unknown, message: string) => {
  console.error(error, message);
  throw error;
};

export const sendEmailOTP = async (email: string) => {
  const { account } = await createAdminClient();
  try {
    const session = await account.createEmailToken(ID.unique(), email);
    return session.userId;
  } catch (error) {
    handleError(error, "Failed to send email OTP");
  }
};

function getAvatarUrl(
  fullName: string,
  width = 100,
  height = 100,
  bgColor = "EA6365"
) {
  return `https://cloud.appwrite.io/v1/avatars/initials?name=${encodeURIComponent(
    fullName
  )}&width=${width}&height=${height}&background=${bgColor}`;
}

export const createAccount = async ({ fullName, email }: createAccountDTO) => {
  const existingUser = await getUserByEmail(email);
  const accountId = await sendEmailOTP(email);

  if (!accountId) throw new Error("Failed to send an OTP");

  if (!existingUser) {
    const { databases } = await createAdminClient();

    const avatar = getAvatarUrl(fullName);

    await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.usersCollectionId,
      ID.unique(),
      {
        email,
        fullName,
        avatar,
        accountId,
      }
    );
  }

  return parseStringify({ accountId });
};

export const verifySecret = async ({
  accountId,
  password,
}: VerifySecretDTO) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createSession(accountId, password);
    (await cookies()).set(COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify({ sessionId: session.$id });
  } catch (error) {
    handleError(error, "Failed to verify secret");
  }
};

export const getCurrentUser = async () => {
  const { databases, account } = await createSessionClient();

  const result = await account.get();
  const user = await databases.listDocuments(
    appWriteConfig.databaseId,
    appWriteConfig.usersCollectionId,
    [Query.equal("accountId", result.$id)]
  );

  if (user.total < 0) return null;

  return parseStringify(user.documents[0]);
};

export const signOutUser = async () => {
  try {
    const { account } = await createSessionClient();
    await account.deleteSession("current");
    (await cookies()).delete(COOKIE);
  } catch (error) {
    handleError(error, "Failed to sign out user");
  } finally {
    redirect("/sign-in");
  }
};
