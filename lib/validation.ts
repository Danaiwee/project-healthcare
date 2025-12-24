import { z } from "zod";

export const SignupSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last Name is required"),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  gender: z.string().min(1, "Gender is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.email().min(1, "Email is required"),
  address: z.string().min(10, "Address must contain at least 10 characters"),
  language: z.string().min(1, "Prefered language is required"),
  nationality: z.string().min(1, "Nationality is required"),
  emergencyContact: z.string().min(1, "Emergency contanct is required"),
  religion: z.string().optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

export const SignInSchema = z.object({
  email: z.email().min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

export const ProfilSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last Name is required"),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  gender: z.string().min(1, "Gender is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.email().min(1, "Email is required"),
  address: z.string().min(10, "Address must contain at least 10 characters"),
  language: z.string().min(1, "Prefered language is required"),
  nationality: z.string().min(1, "Nationality is required"),
  emergencyContact: z.string().min(1, "Emergency contact is required"),
  religion: z.string().optional(),
});

export const UpdateProfileSchema = ProfilSchema.extend({
  userId: z.string().min(1, "User id is required"),
});
