import React from "react";
import { Card, Metric, Text, Flex, ProgressBar, Grid } from "@tremor/react";

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
const DasboardContainer = () => {
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
          <div className="h-[60vh]"></div>
        </Card>
      </div>
    </>
  );
};

export default DasboardContainer;
