import React from "react";
import {
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Avatar,
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@nextui-org/react";
import Link from "next/link";
import { UsersIcon } from "@heroicons/react/outline";
import { HeaderForm } from "./HeaderForm";
import { fetchUserType } from "@/db/queries/getUser";

interface HeaderContentProps {
  user: fetchUserType;
}

const HeaderContent = ({ user }: HeaderContentProps) => {
  return (
    <>
      <NavbarContent>
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarContent className="gap-4 hidden sm:flex" justify="center">
        <NavbarItem>
          <Link href="/">Panel</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/dashboard/employees">Çalışanlar</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/dashboard/members">Üyeler</Link>
        </NavbarItem>
        <NavbarItem className="flex gap-2 items-center">
          <Popover placement="bottom-end">
            <PopoverTrigger>
              <Avatar
                isBordered
                color="default"
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              />
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex flex-col gap-2 w-56 items-center p-4 box-border ">
                <h3 className="text-md hover:bg-gray-100 rounded ease-in duration-300 w-full text-center p-2">
                  {user?.name}
                </h3>
                <Link
                  href="/dashboard/profile"
                  className=" text-lg text-center w-full p-2 hover:bg-gray-100 rounded ease-in duration-300"
                >
                  <div className="flex gap-2 items-center justify-center">
                    <UsersIcon className="w-5 h-5" />
                    Profil
                  </div>
                </Link>
                <HeaderForm size="md" color="danger" />
              </div>
            </PopoverContent>
          </Popover>
        </NavbarItem>
      </NavbarContent>
    </>
  );
};

export default HeaderContent;
