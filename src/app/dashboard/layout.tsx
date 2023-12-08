import HeaderAntd from "@/components/HeaderAntd/HeaderAntd";
import { db } from "@/db";
import { fetchUser } from "@/db/queries/getUser";
import StyledComponentsRegistry from "@/lib/AntdRegistry";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await fetchUser();
  const navMenu = await db.navMenu.findMany({
    where: {
      seeRoles: user?.role,
    },
  });
  return (
    <>
      <StyledComponentsRegistry>
        <HeaderAntd user={user} navMenu={navMenu}>
          {children}
        </HeaderAntd>
      </StyledComponentsRegistry>
    </>
  );
}
