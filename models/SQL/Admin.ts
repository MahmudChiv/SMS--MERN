import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
} from "sequelize-typescript";

export enum Role {
  Admin = "admin",
  Teacher = "teacher",
  Student = "student"
}

@Table
export class Admin extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column ({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName!: string;

  @Column ({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName!: string;

  @Column ({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column ({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column ({
    type: DataType.ENUM(...Object.values(Role)),
    defaultValue: "admin"
  })
  role!: Role;
}

export default Admin;