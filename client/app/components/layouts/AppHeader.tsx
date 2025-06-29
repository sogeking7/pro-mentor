import { NavLink } from "react-router";
import { useAuth } from "@/contexts/AuthContext";
import { LoginBtn } from "@/features/auth/Login/LoginBtn";
import { UserBtn } from "@/features/auth/UserBtn";
import { RegisterBtn } from "@/features/auth/Register/RegisterBtn";
import { Container } from "@/ui/Container";
import logo from "@/../public/logo2.png";

export default function AppHeader() {
  const { user } = useAuth();

  return (
    <header className="fixed top-0 z-50 h-16 w-full border-b bg-white">
      <Container className="flex h-full items-center justify-between">
        <NavLink to={"/"}>
          <img className={"h-[40px]"} alt="PROmentor" src={logo} />
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
