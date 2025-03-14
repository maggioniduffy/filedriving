"use client";

import { navItems } from "@/constants";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface Props {
  type?: "mobile" | "desktop";
}
const NavList = ({ type = "desktop" }: Props) => {
  const pathname = usePathname();
  return (
    <ul>
      {navItems.map(({ url, name, icon }) => (
        <Link href={url} key={name} className="lg:w-full">
          <li
            className={cn(
              type === "desktop" ? "sidebar-nav-item" : "mobile-nav-item",
              pathname === url && "shad-active"
            )}
          >
            <Image
              src={icon}
              alt={name}
              width={24}
              height={24}
              className={cn("nav-icon", pathname === url && "nav-icon-active")}
            />
            <p className={type === "desktop" ? "hidden lg:block" : ""}>
              {" "}
              {name}{" "}
            </p>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default NavList;
