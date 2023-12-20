import DrawerComponent from "@/components/Drawer";
import EmployeesContainer from "@/components/Employees/EmployeesContainer";
import EmployeesDrawer from "@/components/Employees/EmployeesDrawer";
import React from "react";

const Employees = () => {
  return (
    <div
      className="h-[90vh] p-5 box-border"
      key={"428b4f9d-1c8b-4cb5-941f-642ed37a40ab"}
    >
      <div className="w-full flex justify-end">
        <DrawerComponent
          buttonName="Çalışan Ekle"
          title="Çalışan Ekle"
          width={720}
        >
          <EmployeesDrawer />
        </DrawerComponent>
      </div>
      <EmployeesContainer />
    </div>
  );
};

export default Employees;
