"use client";
import React, { ReactElement, useEffect } from "react";
import { Breadcrumb, Image, Layout, Menu } from "antd";
import { fetchUserType } from "@/db/queries/getUser";
import Link from "next/link";
import { selectSetUser, useUserStore } from "@/store/userStore";
import { usePathname } from "next/navigation";
import { HeaderForm } from "../Header/HeaderForm";
import HeaderNav from "./HeaderNav";
import { selectSetNavSider, useNavSiderStore } from "@/store/useNavSider";
import { renderIcon } from "@/hooks/renderIcon";
import NotPermmisonPage from "../NotPermmisonPage";
import { NavMenu, Notification } from "@prisma/client";

const { Header, Content, Footer, Sider } = Layout;

interface HeaderAntdProps {
  children: React.ReactNode;
  user: fetchUserType;
  navMenu: NavMenu[];
  notifactionData: Notification[];
}

const HeaderAntd = ({
  children,
  user,
  navMenu,
  notifactionData,
}: HeaderAntdProps) => {
  const setUser = useUserStore(selectSetUser);
  const setNavMenu = useNavSiderStore(selectSetNavSider);
  const currentPage = usePathname()
    .split("/")
    .filter((item) => item !== "")
    .map((item) => {
      return {
        href: `${item === "dashboard" ? "/dashboard" : `/dashboard/${item}`}`,
        title: item[0].toLocaleUpperCase() + item.slice(1),
      };
    });

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);
  const permisson = navMenu.some(
    (item) =>
      item.navid ===
        (children as ReactElement).props.initialChildNode[1]?.key ||
      item.key === (children as ReactElement).props.childPropSegment
  );

  if (!permisson) {
    return (
      <NotPermmisonPage
        status="403"
        title="403"
        subTitle="Bu sayfaya yetkiniz yoktur."
      />
    );
  }

  return (
    <>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {}}
          onCollapse={(collapsed, type) => {
            if (type === "clickTrigger") {
              setNavMenu(!collapsed);
            }
          }}
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
                  icon={renderIcon(item.icon)}
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
            <HeaderNav user={user} notifactionData={notifactionData} />
          </Header>
          <Content style={{ margin: "0px 16px 0" }}>
            <div className="w-full p-4 box-border min-h-[85vh] overflow-y-auto mt-[14px] bg-[#f9fafb]">
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
