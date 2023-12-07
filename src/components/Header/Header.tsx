import React from "react";
import { Navbar, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { HeaderForm } from "./HeaderForm";
import { fetchUser } from "@/db/queries/getUser";
import HeaderContent from "./HeaderContent";
import { db } from "@/db";
import { navMenuIcon } from "@/hooks/navIcon";
import Link from "next/link";

export default async function Header() {
  const user = await fetchUser();
  const navMenu = await db.navMenu.findMany({
    where: {
      seeRoles: user?.role,
    },
  });

  return (
    <Navbar className="border rounded shadow w-full ">
      <HeaderContent user={user} />
      <NavbarMenu>
        {navMenu.map((item) => {
          return (
            <NavbarMenuItem
              key={item.key}
              className="flex items-center justify-center gap-2 "
            >
              {item.icon ? navMenuIcon(item.icon) : null}
              <Link
                className="w-full hover:bg-gray-100 ease-in duration-300 p-2 box-border"
                href={item.url}
              >
                {item.title}
              </Link>
            </NavbarMenuItem>
          );
        })}
        <NavbarMenuItem>
          <HeaderForm color="danger" />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
