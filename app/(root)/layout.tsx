import Header from "@/components/Header";
import MobileNavigation from "@/components/MobileNavigation";
import SideBar from "@/components/SideBar";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();

  if (!user) return redirect("/sign-in");

  return (
    <main className="flex h-screen">
      <SideBar {...user} />
      <section className="flex h-full flex-1 flex-col">
        <MobileNavigation {...user} />
        <Header />
        <div className="main-content">{children}</div>
      </section>
    </main>
  );
};

export default layout;
