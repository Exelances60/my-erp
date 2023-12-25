"use client";
import React from "react";
import { Card, Divider, Flex, Grid, Text } from "@tremor/react";
import { Statistic } from "antd";
import { Employee } from "@prisma/client";
import { BadgeDelta } from "@tremor/react";

interface EmployeesCardsProps {
  totalAmount: number;
  prevMountAmount: number;
  employees: Employee[];
  prevMountAmountEmployee: number;
  percentageIncrease: string;
  percentIncreaseEmployeeNumber: string;
}

const EmployeesCards = ({
  totalAmount,
  prevMountAmount,
  prevMountAmountEmployee,
  employees,
  percentageIncrease,
  percentIncreaseEmployeeNumber,
}: EmployeesCardsProps) => {
  const haveMostPaidEmployee = [...employees]
    .sort((a, b) => b.salary - a.salary)
    .slice(0, 3);

  const oldEmployee = [...employees]
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
    .slice(0, 3);
  const renderPercentageIncrease = (payload: string) => {
    if (Number(payload) > 0) {
      return <BadgeDelta className="ml-2">{payload} %</BadgeDelta>;
    } else {
      return (
        <BadgeDelta className="ml-2" deltaType="decrease">
          {payload} %
        </BadgeDelta>
      );
    }
  };

  return (
    <>
      <Grid numItemsSm={2} numItemsLg={2} className="gap-6 mt-3">
        <Card className="w-full flex flex-col justify-center min-h-fit">
          <Flex alignItems="start">
            <Text>Toplam Çalışan Ücretleri</Text>
            {renderPercentageIncrease(percentageIncrease)}
          </Flex>
          <Flex
            justifyContent="start"
            alignItems="baseline"
            className="truncate space-x-3"
          >
            <Statistic value={totalAmount} suffix="TL" precision={2} />
            <Text className="truncate">from {prevMountAmount} </Text>
          </Flex>

          <Divider />
          <h1 className="text-xl">En Çok Maaş alan isimler</h1>
          {haveMostPaidEmployee.map((item) => (
            <div key={item.id} className="space-y-2 mt-2">
              <Flex className="gap-2">
                <Text>{item.name} </Text>
                <Text className="text-red-400">{`${item.salary} TL `}</Text>
              </Flex>
            </div>
          ))}
        </Card>

        <Card className="w-full flex flex-col items-center min-h-fit ">
          <Flex alignItems="start">
            <Text>Toplam Çalışan Sayısı</Text>
            {renderPercentageIncrease(percentIncreaseEmployeeNumber)}
          </Flex>
          <Flex
            justifyContent="start"
            alignItems="baseline"
            className="truncate space-x-3"
          >
            <Statistic value={employees.length} />
            <Text className="truncate">from {prevMountAmountEmployee} </Text>
          </Flex>
          <Divider />
          <Flex
            justifyContent="end"
            alignItems="baseline"
            className="truncate space-x-3"
          >
            <Text>En Eski Çalışanlar</Text>
          </Flex>

          {oldEmployee.map((item) => (
            <div key={item.id} className="space-y-2 mt-2">
              <Flex className="gap-2">
                <Text>{item.name} </Text>
                <Text className="text-red-400 text-lg">
                  {`${item.createdAt.toLocaleDateString()} `} Tarhinde İşe
                  Başladı
                </Text>
              </Flex>
            </div>
          ))}
        </Card>
      </Grid>
    </>
  );
};

export default EmployeesCards;
