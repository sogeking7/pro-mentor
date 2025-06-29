import { Container } from "@/ui/Container";
import logo from "@/../public/logo2.png";
import { NavLink } from "react-router";

export default function AppFooter() {
  return (
    <footer className="border-t bg-white text-gray-600">
      <Container className="flex flex-col items-center space-y-4 py-8 text-center">
        <NavLink to={"/"}>
          <img className={"w-[110px]"} alt="PROmentor" src={logo} />
        </NavLink>
        <p className="text-sm">
          Заманауи білім беру әдістемелері мен инновациялық тәсілдер
        </p>
        <p className="text-sm">
          Мұғалімдердің кәсіби дамуы мен сапалы білім беруге арналған платформа
        </p>
        <p className="text-xs text-gray-400">
          © 2025 PRO-mentor. Барлық құқықтар қорғалған.
        </p>
      </Container>
    </footer>
  );
}
