import { Employee } from "@prisma/client";
import { DateRangePickerValue } from "@tremor/react";
import { create } from "zustand";

interface EmployeesStateProps {
  employees: Employee[];
  setEmployees: (employees: Employee[]) => void;
  filterDate: DateRangePickerValue;
  setFilterDate: (filterDate: DateRangePickerValue) => void;
}

export const useEmployeesStore = create<EmployeesStateProps>((set) => ({
  employees: [],
  setEmployees: (employees) => set({ employees }),
  filterDate: { from: undefined, to: undefined },
  setFilterDate: (filterDate) => set({ filterDate }),
}));

export const selectEmployees = (state: EmployeesStateProps) => state.employees;
export const selectSetEmployees = (state: EmployeesStateProps) =>
  state.setEmployees;
export const selectFilterDate = (state: EmployeesStateProps) =>
  state.filterDate;
export const selectSetFilterDate = (state: EmployeesStateProps) =>
  state.setFilterDate;
