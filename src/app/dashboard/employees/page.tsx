import DrawerComponent from "@/components/Drawer";
import EmployeesContainer from "@/components/Employees/EmployeesContainer";
import EmployeesDrawer from "@/components/Employees/EmployeesDrawer";
import { getAllEmployees } from "@/db/queries/getAllEmployees";
import { Card, Grid } from "@tremor/react";
import { Statistic } from "antd";
import React from "react";

const Employees = async () => {
  const { response: employees, totalAmount } = await getAllEmployees();

  return (
    <div
      className="h-[90vh] p-5 box-border flex flex-col gap-2"
      key={"428b4f9d-1c8b-4cb5-941f-642ed37a40ab"}
    >
      <Grid numItemsSm={3} numItemsLg={3} className="gap-6 mt-3">
        <Card className="w-full flex min-h-fit">
          <div className="flex flex-col items-center justify-center">
            <Statistic
              title="Toplam Çalışan Gideri"
              value={totalAmount}
              suffix="TL"
              valueStyle={{ color: "#3f8600" }}
              precision={2}
            />
            <p>Toplam Çalışan Gideri</p>
          </div>
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
        <Card className="w-full flex min-h-fit "></Card>
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
