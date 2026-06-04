import { api } from "@/lib/axios";

export type RegisterPayload = {
  fullName: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export const registerUser = async ( data: RegisterPayload) => {
  const users = await api.get("/users");

  const existingUser = users.data.find(
    (user: RegisterPayload) =>
      user.email === data.email
  );

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const response = await api.post(
    "/users",
    data
  );

  return response.data;
};;


export const loginUser = async (data: LoginPayload) => {
  const response = await api.get("/users");

  const user = response.data.find(
    (u: { email: string; password: string }) => u.email === data.email && u.password === data.password
  );
  if (!user) {
    throw new Error("Invalid credentials");
  }

  return user;
};