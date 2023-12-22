import { Employee } from "@prisma/client";
import { create } from "zustand";

interface EmployeesStateProps {
  employees: Employee[];
  setEmployees: (employees: Employee[]) => void;
}

export const useEmployeesStore = create<EmployeesStateProps>((set) => ({
  employees: [],
  setEmployees: (employees) => set({ employees }),
}));

export const selectEmployees = (state: EmployeesStateProps) => state.employees;
export const selectSetEmployees = (state: EmployeesStateProps) =>
  state.setEmployees;
