"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Separator } from "./ui/separator";
import NavList from "./NavList";
import FileUploader from "./FileUploader";
import { Button } from "./ui/button";
import { signOutUser } from "@/lib/actions/user.actions";

interface Props {
  ownerId: string;
  accountId: string;
  fullName: string;
  email: string;
  avatar: string;
}

const MobileNavigation = ({
  ownerId,
  accountId,
  avatar,
  email,
  fullName,
}: Props) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="mobile-header">
      <Image
        src="/assets/icons/logo-full-brand.svg"
        alt="Logo"
        width={120}
        height={52}
        className="h-auto"
      />

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Image
            src={"/assets/icons/menu.svg"}
            alt="search"
            width={30}
            height={30}
          />
        </SheetTrigger>
        <SheetContent className="shad-sheet h-screen px-3">
          <SheetTitle>
            <div className="header-user">
              <Image
                src={avatar}
                alt="avatar"
                width={44}
                height={44}
                className="header-user-avatar"
              />
              <div className="sm:hideen lg:block">
                <p className="subtitle-2 capitalize">{fullName}</p>
                <p className="caption">{email}</p>
              </div>
            </div>
            <Separator className="mb-4 bg-light-200/20" />
          </SheetTitle>
          <nav className="mobile-nav">
            <NavList type="mobile" />
          </nav>
          <Separator className="my-5 bg-light-200/20" />
          <div className="flex flex-col justify-between gap-5 pb-5">
            <FileUploader />
            <Button
              type="submit"
              className="mobile-sign-out-button"
              onClick={async () => await signOutUser()}
            >
              <Image
                src="/assets/icons/logout.svg"
                alt="logo"
                width={24}
                height={24}
              />
              <p> Logout </p>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;
