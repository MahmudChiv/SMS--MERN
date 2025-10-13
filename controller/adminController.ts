import type { Request, Response } from "express";
import { Teacher } from "../models/SQL/Teacher";
import { Student } from "../models/SQL/Student";
import fs from "fs";
import csv from "csv-parser";
import generator from "generate-password";
import bcrypt from "bcrypt";
import { sendLoginEmail } from "../utils/emailService";

export const dashboard = async (req: Request, res: Response) => {
  try {
    const students = (await Student.findAll({})).map(
      (student) => student.firstName
    ).length;
    const teachers = (await Teacher.findAll({})).map(
      (teacher) => teacher.firstName
    ).length;

    res.status(200).json({ data: { students, teachers } });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard data" });
  }
};

export const inviteTeachers = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const results: any[] = [];

  fs.createReadStream("teachers.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      console.log("✅ Parsed Data:", results);
      try {
        for (const row of results) {
          const password = generator.generate({
            length: 12,
            numbers: true,
            symbols: true,
            uppercase: true,
            lowercase: true,
            strict: true, // ensures at least one of each selected type
          });
          const hashedPassword = await bcrypt.hash(password, 10);

          await Teacher.create({
            email: row.email,
            password: hashedPassword,
          }).catch((error) => {
            console.log("Error saving teacher:", error);
            return res.status(500).json({ message: "Error saving teacher to DB" });
          });
          // Send login invite email to the teacher
          await sendLoginEmail(row.email, password);
        }

        await Teacher.sync();
        fs.unlinkSync(req.file!.path);

        res.status(201).json({ message: "Invites sent successfully" });
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error sending invites" });
      }
    });
};

export const inviteStudents = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const results: any[] = [];

  fs.createReadStream("students.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      console.log("✅ Parsed Data:", results);
      try {
        for (const row of results) {
          const password = generator.generate({
            length: 12,
            numbers: true,
            symbols: true,
            uppercase: true,
            lowercase: true,
            strict: true, // ensures at least one of each selected type
          });
          const hashedPassword = await bcrypt.hash(password, 10);

          await Student.create({
            email: row.email,
            password: hashedPassword,
          }).catch((error) => {
            console.log("Error saving student:", error);
            return res.status(500).json({ message: "Error saving teacher to DB" });
          });
          // Send login invite email to the student
          await sendLoginEmail(row.email, password);
        }

        await Student.sync();
        fs.unlinkSync(req.file!.path);

        res.status(201).json({ message: "Invites sent successfully" });
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error sending invites" });
      }
    });
};
