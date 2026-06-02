import { z } from "zod";

export const loginSchema = z.object({
    email: z.email("invalid email address"),
    password: z.string().min(6, "password must be at least 6 characters long"),
})

export type LoginSchemaType = z.infer< typeof loginSchema>;


export const registerSchema = z.object({
    fullName: z
      .string()
      .min(3, "Name is required"),

    email: z.email("Invalid email address"),

    password: z
      .string()
      .min(
        8,
        "Password must be at least 8 characters"
      ),

    confirmPassword: z.string(),
  })
  .refine(
    (data) =>
      data.password ===
      data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export type RegisterSchemaType = z.infer< typeof registerSchema>;