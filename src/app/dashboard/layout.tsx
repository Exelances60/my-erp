import HeaderAntd from "@/components/HeaderAntd/HeaderAntd";
import { fetchUser } from "@/db/queries/getUser";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import { fetchMenuList } from "@/db/queries/getMenuList";
import { NavMenu } from "@prisma/client";
import { getAllNotification } from "@/db/queries/getAllNotifacition";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await fetchUser();
  const navMenuFetch = fetchMenuList(user?.role) || [];
  const notiFactionFetch = getAllNotification();

  const [navMenu, { response: notifactionData }] = await Promise.all([
    navMenuFetch,
    notiFactionFetch,
  ]);

  return (
    <>
      <StyledComponentsRegistry>
        <HeaderAntd
          user={user}
          navMenu={navMenu as NavMenu[]}
          notifactionData={notifactionData}
        >
          {children}
        </HeaderAntd>
      </StyledComponentsRegistry>
    </>
  );
}
