import { Account, Client, Databases } from "appwrite";
import { appWriteConfig } from "./config";
import { cookies } from "next/headers";

export const createSessionClient = async () => {
  const client = new Client()
    .setEndpoint(appWriteConfig.endpointUrl)
    .setProject(appWriteConfig.projectId);

  const session = (await cookies()).get("appwrite-session");

  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },

    get databases() {
      return new Databases(client);
    },
  };
};

export const createAdminClient = async () => {
  const client = new Client();
};
