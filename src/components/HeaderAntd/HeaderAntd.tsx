"use client";
import React, { useEffect } from "react";
import { Avatar, Breadcrumb, Image, Layout, Menu, Popover } from "antd";
import { fetchUserType } from "@/db/queries/getUser";
import Link from "next/link";
import { navMenuIcon } from "@/hooks/navIcon";
import { selectSetUser, useUserStore } from "@/store/userStore";
import { usePathname } from "next/navigation";
import { Icon } from "@tremor/react";
import { MailIcon } from "@heroicons/react/outline";
import { HeaderForm } from "../Header/HeaderForm";

const { Header, Content, Footer, Sider } = Layout;

interface HeaderAntdProps {
  children: React.ReactNode;
  user: fetchUserType;
  navMenu: {
    navid: string;
    key: string;
    title: string;
    icon: string;
    seeRoles: string;
    url: string;
  }[];
}
const PopOverContent = <div className="flex flex-col gap-2">Mail</div>;

const HeaderAntd = ({ children, user, navMenu }: HeaderAntdProps) => {
  const setUser = useUserStore(selectSetUser);
  const currentPage = usePathname()
    .split("/")
    .filter((item) => item !== "")
    .map((item, index) => {
      return {
        href: `${item === "dashboard" ? "/dashboard" : `/dashboard/${item}`}`,
        title: item[0].toLocaleUpperCase() + item.slice(1),
      };
    });

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return (
    <>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {}}
          onCollapse={(collapsed, type) => {}}
        >
          <div className="flex items-center mt-5 p-5 rounded-full box-border justify-center">
            <Image
              width={100}
              height={100}
              className="rounded-xl"
              src={
                user?.photoUrl ||
                "https://i.pravatar.cc/150?u=a042581f4e29026024d"
              }
              alt="user"
            />
          </div>
          <Menu theme="dark" mode="inline" className="mt-5">
            {navMenu.map((item) => {
              return (
                <Menu.Item
                  key={item.key}
                  icon={navMenuIcon(item.icon)}
                  className="flex"
                >
                  <Link className="w-full  box-border" href={item.url}>
                    {item.title}
                  </Link>
                </Menu.Item>
              );
            })}
          </Menu>
          <div className="ml-5">
            <HeaderForm />
          </div>
        </Sider>
        <Layout>
          <Header
            style={{ padding: 0, backgroundColor: "#f9fafb" }}
            className="border  shadow"
          >
            <div className="flex items-center h-full gap-2 justify-end px-5 ">
              <Popover
                content={PopOverContent}
                placement="bottomRight"
                title="Mail bildirimleri"
              >
                <Icon
                  icon={MailIcon}
                  variant="light"
                  color="blue"
                  size="md"
                  tooltip="Bildirimler"
                />
              </Popover>
              <h3 className="text-gray-500 text-lg font-semibold">
                {user?.name}
              </h3>
              <Avatar
                size={45}
                src={
                  user?.photoUrl ||
                  "https://i.pravatar.cc/150?u=a042581f4e29026024d"
                }
              />
            </div>
          </Header>
          <Content style={{ margin: "0px 16px 0" }}>
            <div className="w-full p-4  box-border overflow-y-auto mt-[14px] bg-[#f9fafb]">
              <Breadcrumb
                items={currentPage.map((item) => {
                  return {
                    title: <Link href={item.href}>{item.title}</Link>,
                  };
                })}
              />
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>Desing with Enes</Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default HeaderAntd;
