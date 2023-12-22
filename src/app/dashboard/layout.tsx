import HeaderAntd from "@/components/HeaderAntd/HeaderAntd";
import { fetchUser } from "@/db/queries/getUser";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import { fetchMenuList } from "@/db/queries/getMenuList";
import { getAllEmployees } from "@/db/queries/getAllEmployees";
import { NavMenu } from "@prisma/client";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await fetchUser();
  const navMenuFetch = fetchMenuList(user?.role) || [];
  const employeesFetch = getAllEmployees();

  const [navMenu, { overAgreement: employees }] = await Promise.all([
    navMenuFetch,
    employeesFetch,
  ]);

  return (
    <>
      <StyledComponentsRegistry>
        <HeaderAntd
          user={user}
          navMenu={navMenu as NavMenu[]}
          employees={employees}
        >
          {children}
        </HeaderAntd>
      </StyledComponentsRegistry>
    </>
  );
}
