import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
} from "sequelize-typescript";
import {Role} from "./Admin"

@Table
export class Teacher extends Model {
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
    defaultValue: "teacher"
  })
  role!: Role;
}

export default Teacher;
