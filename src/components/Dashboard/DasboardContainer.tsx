import React from "react";
import { Card, Metric, Text, Flex, ProgressBar, Grid } from "@tremor/react";

import DashboardCard from "./components/DashboardCard";
import { db } from "@/db";
import { cookies } from "next/headers";
import DrawerComponent from "../Drawer";

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
  const userCokie = cookies().get("uid")?.value;
  const dashboardCardData = await db.dashboardCard.findMany({
    where: {
      userUid: userCokie,
    },
  });

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
              <DrawerComponent buttonName="Kart Ekle">
                <div className="flex justify-center items-center">
                  <Text>Kart Ekle</Text>
                </div>
              </DrawerComponent>
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
