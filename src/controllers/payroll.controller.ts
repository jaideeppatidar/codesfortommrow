import { Request, Response } from "express";
import { Payroll } from "../models/payroll.model";
import { Employee, IEmployee } from "../models/employee.model";

const calculateTax = (grossSalary: number): number => {
  if (grossSalary <= 25000) return 0;
  else if (grossSalary <= 50000) return grossSalary * 0.05;
  else if (grossSalary <= 100000) return grossSalary * 0.1;
  else return grossSalary * 0.15;
};

const calculateNetSalary = ({
  basic,
  hra,
  allowances,
  workingDays,
  fullDays,
  halfDays,
  otherDeductions = 0,
}: {
  basic: number;
  hra: number;
  allowances: number;
  workingDays: number;
  fullDays: number;
  halfDays: number;
  otherDeductions?: number;
}) => {
  const grossSalary = basic + hra + allowances;
  const tax = calculateTax(grossSalary);
  const pf = basic * 0.12;

  const dailyWage = grossSalary / workingDays;
  const totalSalary = fullDays * dailyWage + halfDays * (dailyWage / 2);
  const netSalary = totalSalary - tax - pf - otherDeductions;

  return {
    grossSalary,
    tax,
    pf,
    totalSalary,
    netSalary,
  };
};

export const distributePayroll = async (req: Request, res: Response) => {
  try {
    const { month, workingDays } = req.body;

    if (!month || !workingDays) {
      return res.status(400).json({ message: "Month and workingDays are required" });
    }

    const employees: IEmployee[] = await Employee.find();

    const payrolls = employees.map((emp) => {
      const salary = calculateNetSalary({
        basic: emp.basicSalary,
        hra: emp.hra,
        allowances: emp.allowances,
        workingDays,
        fullDays: emp.attendance?.fullDays || 0,
        halfDays: emp.attendance?.halfDays || 0,
        otherDeductions: emp.otherDeductions || 0,
      });

      return {
        employee: emp._id,
        month,
        ...salary,
        distributedAt: new Date(),
      };
    });

    const saved = await Payroll.insertMany(payrolls);
    res.status(201).json({ message: "Payroll distributed successfully", data: saved });
  } catch (error) {
    console.error("Payroll Distribution Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPayrollHistory = async (req: Request, res: Response) => {
  try {
    const history = await Payroll.find().populate("employee");
    res.status(200).json(history);
  } catch (error) {
    console.error("getPayrollHistory Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
