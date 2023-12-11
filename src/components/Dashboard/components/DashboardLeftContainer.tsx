import React from "react";
import { Grid } from "@tremor/react";
import DrawerComponent from "@/components/Drawer";
import DashboardCardAdd from "./DashboardCardAdd";
import { Button, Popover } from "antd";
import { fetchUserType } from "@/db/queries/getUser";
import { MenuListType } from "@/db/queries/getMenuList";
import DashboardCard from "./DashboardCard";
import { fetchDashboardCardData } from "@/db/queries/getDashboardCardData";
import CheekRole from "@/hooks/CheekRole";

interface IDashboardLeftContainerProps {
  user: fetchUserType;
  menuList: MenuListType;
  dashboardCardData: fetchDashboardCardData[];
  deleteCardPopOver: JSX.Element;
}

const DashboardLeftContainer = ({
  user,
  menuList,
  dashboardCardData,
  deleteCardPopOver,
}: IDashboardLeftContainerProps) => {
  return (
    <div className="md:w-[50%] h-full">
      <div className="flex gap-2">
        <CheekRole role={["admin", "owner"]}>
          <DrawerComponent buttonName="Kart Ekle" title="Admin Kart Ekle">
            <DashboardCardAdd menuList={menuList} />
          </DrawerComponent>
          <Popover
            content={deleteCardPopOver}
            placement="bottomRight"
            trigger={"click"}
          >
            <Button type="primary" danger>
              Kart Sil
            </Button>
          </Popover>
        </CheekRole>
      </div>
      <Grid numItemsSm={2} numItemsLg={2} className="gap-6 mt-3 min-h-[60vh]">
        {dashboardCardData.map((item) => {
          return (
            <DashboardCard
              key={item.id}
              icon={item.icon}
              title={item.title}
              uniqueKey={item.id}
              path={item.path}
              detailsText={item.mainText}
            />
          );
        })}
      </Grid>
    </div>
  );
};

export default DashboardLeftContainer;
