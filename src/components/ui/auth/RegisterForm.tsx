"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema, RegisterSchemaType } from "@/schemas/auth-schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/authSlice";

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,

    onSuccess: (user) => {
      dispatch(setUser(user));
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/home");
    },

    onError: (error) => {
      console.error(error);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (values: RegisterSchemaType) => {
    mutate({
      fullName: values.fullName,
      email: values.email,
      password: values.password,
    });
  };

  return (
    <div className="rounded-2xl border-none bg-background p-8 shadow-sm">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          Create account
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Create your account to start booking rides.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium">Full Name</label>

          <Input
            className="h-11"
            placeholder="John Doe"
            {...register("fullName")}
          />

          {errors.fullName && (
            <p className="text-xs text-destructive">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>

          <Input
            className="h-11"
            placeholder="john@example.com"
            {...register("email")}
          />

          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Password</label>

          <Input
            className="h-11"
            type="password"
            placeholder="••••••••"
            {...register("password")}
          />

          {errors.password && (
            <p className="text-xs text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Confirm Password</label>

          <Input
            className="h-11"
            type="password"
            placeholder="••••••••"
            {...register("confirmPassword")}
          />

          {errors.confirmPassword && (
            <p className="text-xs text-destructive">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button type="submit" className="h-11 w-full" disabled={isPending}>
          {isPending ? "Creating Account..." : "Create Account"}
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>

        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">or</span>
        </div>
      </div>

      <Button variant="outline" className="h-11 w-full">
        Continue with Google
      </Button>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?
        <Link
          href="/login"
          className="ml-1 font-medium text-foreground hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
