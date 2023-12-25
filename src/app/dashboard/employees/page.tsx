import DrawerComponent from "@/components/Drawer";
import EmployeesContainer from "@/components/Employees/EmployeesContainer";
import EmployeesDrawer from "@/components/Employees/EmployeesDrawer";
import {
  calculatePrevMonthPercents,
  getAllEmployees,
} from "@/db/queries/getAllEmployees";
import { BadgeDelta, Card, Flex, Grid, Text } from "@tremor/react";
import { Statistic } from "antd";

import React from "react";

const Employees = async () => {
  const { response: employees, totalAmount } = await getAllEmployees();
  const { percentageIncrease, prevMountAmount } = calculatePrevMonthPercents(
    employees,
    totalAmount || 0
  );

  const renderPercentageIncrease = () => {
    if (Number(percentageIncrease) > 0) {
      return <BadgeDelta className="ml-2">{percentageIncrease} %</BadgeDelta>;
    } else {
      return (
        <BadgeDelta className="ml-2" deltaType="decrease">
          {percentageIncrease} %
        </BadgeDelta>
      );
    }
  };

  return (
    <div
      className="h-[90vh] p-5 box-border flex flex-col gap-2"
      key={"428b4f9d-1c8b-4cb5-941f-642ed37a40ab"}
    >
      <Grid numItemsSm={2} numItemsLg={2} className="gap-6 mt-3">
        <Card className="w-full flex flex-col items-center justify-center min-h-fit">
          <Flex alignItems="start">
            <Text>Toplam Çalışan Sayısı</Text>
            {renderPercentageIncrease()}
          </Flex>
          <Flex
            justifyContent="start"
            alignItems="baseline"
            className="truncate space-x-3"
          >
            <Statistic value={totalAmount} suffix="TL" precision={2} />
            <Text className="truncate">from {prevMountAmount} </Text>
          </Flex>
        </Card>

        <Card className="w-full flex min-h-fit ">
          <div className="flex flex-col items-center justify-center">
            <Statistic
              title="Toplam Çalışan Sayısı"
              value={employees.length}
              suffix="Kişi"
            />
            <p>Toplam Çalışan Sayısı</p>
          </div>
        </Card>
      </Grid>

      <div className="w-full flex justify-end">
        <DrawerComponent
          buttonName="Çalışan Ekle"
          title="Çalışan Ekle"
          width={720}
        >
          <EmployeesDrawer />
        </DrawerComponent>
      </div>
      <EmployeesContainer employees={employees} />
    </div>
  );
};

export default Employees;
