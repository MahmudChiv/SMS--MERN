import { Admin } from "../../../models/SQL/Admin";
import { Teacher } from "../../../models/SQL/Teacher";
import { Student } from "../../../models/SQL/Student";

declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      role: "admin" | "teacher" | "student";
    }
  }
}
