import LoginForm from "@/components/ui/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  );
}