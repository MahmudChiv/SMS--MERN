import { Sequelize } from "sequelize-typescript";
import {Admin} from "../models/SQL/Admin"
import {Teacher} from "../models/SQL/Teacher"
import {Student} from "../models/SQL/Student"
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(process.env.DB_URI!, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  models: [Admin, Teacher, Student],
});

export default sequelize;
