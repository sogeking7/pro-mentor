import { NavLink } from "react-router";
import { useAuth } from "@/contexts/AuthContext";
import { LoginBtn } from "@/features/auth/Login/LoginBtn";
import { UserBtn } from "@/features/auth/UserBtn";
import { RegisterBtn } from "@/features/auth/Register/RegisterBtn";
import { Container } from "@/ui/Container";

export default function AppHeader() {
  const { user } = useAuth();

  return (
    <header className="fixed top-0 z-50 h-16 w-full border-b bg-white">
      <Container className="flex h-full items-center justify-between">
        <NavLink to={"/"}>
          <h1 className="text-2xl font-bold text-blue-600">PROmentor</h1>
        </NavLink>
        <div className="flex gap-3">
          {user ? (
            <>
              <UserBtn />
            </>
          ) : (
            <>
              <LoginBtn />
              <RegisterBtn />
            </>
          )}
        </div>
      </Container>
    </header>
  );
}
