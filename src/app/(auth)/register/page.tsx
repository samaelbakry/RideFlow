import RegisterForm from "@/components/ui/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </main>
  );
}