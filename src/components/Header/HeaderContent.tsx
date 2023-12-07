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
import { UserOutlined } from "@ant-design/icons";
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
        <NavbarItem>Dashboard</NavbarItem>
        <NavbarItem>Çalışanlar</NavbarItem>
        <NavbarItem>Üyeler</NavbarItem>
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
              <div className="flex flex-col gap-2 w-56 items-center p-4 box-border">
                <h3 className="text-md">{user?.name}</h3>
                <Link
                  href="/dashboard/profile"
                  className=" text-lg text-center w-full p-2"
                >
                  <div className="flex gap-2 items-center justify-center">
                    <UserOutlined />
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
