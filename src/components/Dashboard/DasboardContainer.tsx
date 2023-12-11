import React from "react";
import { Card, Metric, Text, Flex, ProgressBar, Grid } from "@tremor/react";
import DashboardCard from "./components/DashboardCard";
import DrawerComponent from "../Drawer";
import DashboardCardAdd from "./components/DashboardCardAdd";
import { getDashboardCardData } from "@/db/queries/getDashboardCardData";
import { fetchUser } from "@/db/queries/getUser";
import { Button, Popover } from "antd";
import { DashboardCardDelete } from "@/actions/DashboardCardDelete";
import DashboardCardDeleteComponent from "./components/DashboardCardDelete";
import { fetchMenuList } from "@/db/queries/getMenuList";

const categories = [
  {
    title: "Satışlar",
    metric: 12699,
    target: 80000,
  },
  {
    title: "Üye Sayısı",
    metric: 1600,
    target: 3000,
  },
  {
    title: "Personel Sayısı",
    metric: 5,
    target: 5,
  },
];

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
        {categories.map((item) => {
          const value =
            ((item.target - Math.abs(item.target - item.metric)) /
              item.target) *
            100;
          return (
            <Card key={item.title}>
              <Text>{item.title}</Text>
              <Metric>{item.metric}</Metric>
              <Flex className="mt-4">
                <Text className="truncate">{`${value.toFixed(2)}% (${
                  item.metric
                })`}</Text>
                <Text>{item.target}</Text>
              </Flex>

              <ProgressBar value={Number(value.toFixed(2))} className="mt-2" />
            </Card>
          );
        })}
      </Grid>
      <div className="mt-6">
        <Card>
          <div className="box-border min-h-[60vh] flex gap-2">
            <div className="md:w-[50%] h-full">
              <div className="flex gap-2">
                {user?.role === "admin" ? (
                  <>
                    <DrawerComponent
                      buttonName="Kart Ekle"
                      title="Admin Kart Ekle"
                    >
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
                  </>
                ) : null}
              </div>
              <Grid
                numItemsSm={2}
                numItemsLg={2}
                className="gap-6 mt-3 min-h-[60vh]"
              >
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
          </div>
        </Card>
      </div>
    </>
  );
};

export default DasboardContainer;
