"use client";
import { LoginSchemaType, loginSchema } from "@/schemas/auth-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/authSlice";
import { toast } from "sonner";

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,

    onSuccess: (user) => {
      dispatch(setUser(user));
      localStorage.setItem("user", JSON.stringify(user));
      toast("Logged in successfully!");
      router.push("/");
    },

    onError: (error) => {
      toast(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (values: LoginSchemaType) => {
    mutate(values);
  };

  return (
    <>
      <Card className="border-none shadow-sm">
        <CardContent className="p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold tracking-tight">
              Welcome back
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to continue to your account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="h-11"
            />

            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}

            <Input
              type="password"
              className="h-11"
              placeholder="Password"
              {...register("password")}
            />

            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Signing In..." : "Login"}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">
              Don&apos;t have an account?
            </span>

            <Link href="/register" className="ml-1 font-medium hover:underline">
              Create one
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
