"use client";
import React from "react";
import { Image, Layout, Menu } from "antd";
import { fetchUserType } from "@/db/queries/getUser";
import { HeaderForm } from "../Header/HeaderForm";
import Link from "next/link";
import { navMenuIcon } from "@/hooks/navIcon";
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

const HeaderAntd = ({ children, user, navMenu }: HeaderAntdProps) => {
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
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
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
          ></Header>
          <Content style={{ margin: "0px 16px 0" }}>
            <div className="w-full p-5 box-border overflow-y-auto bg-[#f9fafb]">
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
