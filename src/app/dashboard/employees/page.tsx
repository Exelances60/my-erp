import DrawerComponent from "@/components/Drawer";
import EmployeesContainer from "@/components/Employees/EmployeesContainer";
import EmployeesDrawer from "@/components/Employees/EmployeesDrawer";
import React from "react";

const Employees = () => {
  return (
    <div className="h-[90vh] p-5 box-border">
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
