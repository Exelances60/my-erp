import React from "react";
import { Card, Metric, Text, Flex, ProgressBar } from "@tremor/react";
import { categories } from "@/mock/mockData";
import { calculatePercent } from "@/utils/calculatePercent";
import { getAllEmployees } from "@/db/queries/getAllEmployees";

const DashboardShortCurtCard = async () => {
  const { response } = await getAllEmployees();
  return (
    <>
      {categories.map((item) => {
        const value = calculatePercent(item.target, item.metric);
        return (
          <Card key={item.title}>
            <Text>{item.title}</Text>
            <Metric>{item.metric}</Metric>
            <Flex className="mt-4">
              <Text className="truncate">{`${value}% (${item.metric})`}</Text>
              <Text>{item.target}</Text>
            </Flex>

            <ProgressBar value={Number(value)} className="mt-2" />
          </Card>
        );
      })}
      <Card>
        <Text>Toplam Çalışan Sayısı</Text>
        <Metric>{response.length}</Metric>
        <Flex className="mt-4">
          <Text className="truncate">4</Text>
          <Text></Text>
        </Flex>

        <ProgressBar value={100} className="mt-2" />
      </Card>
    </>
  );
};

export default DashboardShortCurtCard;
