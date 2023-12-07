import React from "react";
import { Navbar, Link, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { HeaderForm } from "./HeaderForm";
import { fetchUser } from "@/db/queries/getUser";
import HeaderContent from "./HeaderContent";

export default async function Header() {
  const user = await fetchUser();

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar className="border rounded shadow">
      <HeaderContent user={user} />
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href="#"
              size="md"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <HeaderForm />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
