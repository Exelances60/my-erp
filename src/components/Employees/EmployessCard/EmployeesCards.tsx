"use client";
import React, { useState } from "react";
import { Card, Divider, Flex, Grid, Text } from "@tremor/react";
import { Button, Statistic } from "antd";
import { Employee } from "@prisma/client";
import { selectNavSider, useNavSiderStore } from "@/store/useNavSider";
import { selectFilterDate, useEmployeesStore } from "@/store/useEmployees";
import {
  renderEmployeeChange,
  renderPercentageIncrease,
} from "@/hooks/Employees/RenderEmployeeChange";

interface EmployeesCardsProps {
  totalAmount: number;
  prevMountAmount: number;
  employees: Employee[];
  prevMountAmountEmployee: number;
  percentageIncrease: string;
  percentIncreaseEmployeeNumber: string;
}

const EmployeesCards = ({
  prevMountAmount,
  prevMountAmountEmployee,
  employees,
  percentageIncrease,
  percentIncreaseEmployeeNumber,
}: EmployeesCardsProps) => {
  const [changeEmployeeMode, setChangeEmployeeMode] = useState(false);
  const navSider = useNavSiderStore(selectNavSider);
  const filterDate = useEmployeesStore(selectFilterDate);

  const haveMostPaidEmployee = [...employees]
    .sort((a, b) => b.salary - a.salary)
    .slice(0, 3);

  const oldEmployee = [...employees]
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
    .slice(0, 3);

  const newEmployee = [...employees]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 3);

  const employeesFilter = employees
    .filter((employee) => {
      if (filterDate.from && filterDate.to) {
        return (
          new Date(employee.createdAt) >= filterDate.from &&
          new Date(employee.createdAt) <= filterDate.to
        );
      } else {
        return employee;
      }
    })
    .reduce((acc, curr) => {
      return acc + curr.salary;
    }, 0);

  return (
    <>
      {!navSider ? (
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
              <Statistic value={employeesFilter} suffix="TL" precision={2} />
              <Text className="truncate">from {prevMountAmount} </Text>
            </Flex>

            <Divider />
            <h1 className="text-xl">En çok maaş alan isimler</h1>
            {haveMostPaidEmployee.map((item) => (
              <div key={item.id} className="space-y-2 mt-2">
                <Flex className="gap-2">
                  <Text>{item.name} </Text>
                  <Text className="text-red-400">{`${item.salary} TL `}</Text>
                </Flex>
              </div>
            ))}
          </Card>

          <Card className="w-full flex flex-col   min-h-fit ">
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
            <Flex className="truncate space-x-3">
              {changeEmployeeMode ? (
                <Text className="truncate">En Eski Çalışanlar</Text>
              ) : (
                <Text className="truncate">En Yeni Çalışanlar</Text>
              )}
              <Button
                size="small"
                onClick={() => setChangeEmployeeMode(!changeEmployeeMode)}
              >
                Degiştir
              </Button>
            </Flex>
            {renderEmployeeChange(changeEmployeeMode, oldEmployee, newEmployee)}
          </Card>
        </Grid>
      ) : null}
    </>
  );
};

export default EmployeesCards;
