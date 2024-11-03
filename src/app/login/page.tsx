import { LoginForm } from "@/components/login-form";
import { login } from "./actions";

export default function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <LoginForm />
    </div>
  );
}
