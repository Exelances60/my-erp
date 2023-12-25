import React from "react";
import { Card, Grid } from "@tremor/react";
import { getDashboardCardData } from "@/db/queries/getDashboardCardData";
import { fetchUser } from "@/db/queries/getUser";
import { DashboardCardDelete } from "@/actions/DashboardAction/DashboardCardDelete";
import DashboardCardDeleteComponent from "./components/DashboardCardDelete";
import { fetchMenuList } from "@/db/queries/getMenuList";
import DashboardLeftContainer from "./components/DashboardLeftContainer";
import DashboardRightContainer from "./components/DashboardRightContainer";
import DashboardShortCurtCard from "./DashboardShortCurtCard";

const DasboardContainer = async () => {
  const dashboardCardFetch = getDashboardCardData();
  const userFetch = fetchUser();
  const [dashboardCardData, user] = await Promise.all([
    dashboardCardFetch,
    userFetch,
  ]);
  const menuList = await fetchMenuList(user?.role);
  const deleteCardPopOver = (
    <div className="flex flex-col  gap-2">
      {dashboardCardData.map((item) => {
        const deleteAction = DashboardCardDelete.bind(null, item.id);
        return (
          <DashboardCardDeleteComponent
            key={item.id}
            item={item}
            deleteAction={deleteAction}
          />
        );
      })}
    </div>
  );

  return (
    <>
      <Grid numItemsSm={3} numItemsLg={3} className="gap-6 mt-3">
        <DashboardShortCurtCard />
      </Grid>
      <div className="mt-6 ">
        <Card className="w-full flex min-h-fit ">
          <div className="box-border min-h-[60vh] w-full flex flex-col md:flex-row  gap-2">
            <DashboardLeftContainer
              user={user}
              menuList={menuList}
              deleteCardPopOver={deleteCardPopOver}
              dashboardCardData={dashboardCardData}
            />

            <DashboardRightContainer />
          </div>
        </Card>
      </div>
    </>
  );
};

export default DasboardContainer;
