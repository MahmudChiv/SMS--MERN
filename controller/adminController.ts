import type { Request, Response } from "express";
import { Teacher } from "../models/SQL/Teacher";
import { Student } from "../models/SQL/Student";
import fs from "fs";
import csv from "csv-parser";

export const dashboard = async (req: Request, res: Response) => {
  try {
    const students = (await Student.findAll({})).map(
      (student) => student.firstName
    ).length;
    const teachers = (await Teacher.findAll({})).map(
      (teacher) => teacher.firstName
    ).length;

    res.status(200).json({data: {students, teachers}});
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard data" });
  }
};

export const inviteStudents = async (req: Request, res: Response) => {
  const results: string[] = [];

  fs.createReadStream("students.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      console.log("✅ Parsed Data:", results);
    });
}

