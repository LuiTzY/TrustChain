import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-semibold mb-4">Iniciar sesión</h1>
      <LoginForm />
    </div>
  );
}
