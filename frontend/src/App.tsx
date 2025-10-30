import { AuthProvider } from "./apps/users/context/AuthContext";
import LoginPage from "./apps/users/pages/LoginPage";
import RegisterPage from "./apps/users/pages/RegisterPage";

function App() {
  return (
    <AuthProvider>
      <div className="p-6">
        {/* Usa React Router si deseas navegación */}
        <LoginPage />
        {/* <RegisterPage /> */}
      </div>
    </AuthProvider>
  );
}

export default App;
