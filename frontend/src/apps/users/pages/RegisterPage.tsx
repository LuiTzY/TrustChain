import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-semibold mb-4">Crear cuenta</h1>
      <RegisterForm />
    </div>
  );
}
