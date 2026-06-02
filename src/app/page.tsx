import ProtectedRoutes from "@/components/ui/auth/ProtectedRoutes";

export default function Home() {
  return (
    <ProtectedRoutes>
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold">hello from home page </h1>
    </main>
    </ProtectedRoutes>
  );
}
