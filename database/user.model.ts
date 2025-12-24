import { model, models, Schema, Document } from "mongoose";

export interface IUser {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  address: string;
  language: string;
  nationality: string;
  emergencyContact: string;
  religion?: string;
  hn?: number;
  role?: string;
  password?: string;
}

export interface IUserDoc extends IUser, Document {}

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    emergencyContact: {
      type: String,
      required: true,
    },
    religion: {
      type: String,
      default: "",
    },
    hn: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      enum: ["patient", "admin"],
      default: "patient",
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = models?.User || model<IUser>("User", userSchema);

export default User;
