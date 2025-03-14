"use client";

import { avatarPlaceholderUrl } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavList from "./NavList";

interface Props {
  fullName: string;
  email: string;
  avatar: string;
}

const SideBar = ({ fullName, email, avatar }: Props) => {
  return (
    <aside className="sidebar">
      <Link href="/">
        <Image
          src="/assets/icons/logo-full-brand.svg"
          alt="Logo"
          width={160}
          height={50}
          className="hidden h-auto lg:block"
        />

        <Image
          src="/assets/icons/logo-brand.svg"
          alt="Logo"
          width={52}
          height={52}
          className="h-auto lg:hidden"
        />
      </Link>

      <nav className="sidebar-nav">
        <NavList />
      </nav>

      <Image
        src={"/assets/images/files-2.png"}
        alt="Logo"
        width={506}
        height={418}
        className="w-full"
      />

      <div className="sidebar-user-info">
        <Image
          src={avatarPlaceholderUrl}
          alt="Avatar"
          width={44}
          height={44}
          className="sidebar-user-avatar"
        />
        <div className="hidden lg:block">
          <p className="subtitle-2 capitalize"> {fullName} </p>
          <p className="caption"> {email} </p>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
