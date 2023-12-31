import DrawerComponent from "@/components/Drawer";
import EmployeesCards from "@/components/Employees/EmployessCard/EmployeesCards";
import EmployeesContainer from "@/components/Employees/EmployeesCotainer/EmployeesContainer";
import EmployeesDrawer from "@/components/Employees/EmployeesCotainer/EmployeesDrawer";
import {
  calculatePrevMonthEmployees,
  calculatePrevMonthPercents,
  getAllEmployees,
} from "@/db/queries/getAllEmployees";
import React from "react";

const Employees = async () => {
  const { response: employees, totalAmount } = await getAllEmployees();
  const { prevMountAmountEmployee, percentIncreaseEmployeeNumber } =
    calculatePrevMonthEmployees(employees);
  const { percentageIncrease, prevMountAmount } = calculatePrevMonthPercents(
    employees,
    totalAmount || 0
  );

  return (
    <div
      className="h-[90vh] p-1 box-border flex flex-col gap-2"
      key={"ff6c1237-ae95-441b-909f-d98a8b965748"}
    >
      <EmployeesCards
        totalAmount={totalAmount || 0}
        prevMountAmountEmployee={prevMountAmountEmployee}
        prevMountAmount={prevMountAmount}
        employees={employees}
        percentageIncrease={percentageIncrease}
        percentIncreaseEmployeeNumber={percentIncreaseEmployeeNumber}
      />
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
