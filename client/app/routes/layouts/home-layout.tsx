import AppHeader from "@/components/layouts/AppHeader";
import { Container } from "@/ui/Container";
import { Outlet } from "react-router";
import AppFooter from "@/components/layouts/AppFooter";

export default function HomeLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-16">
      <AppHeader />
      <Container className="min-h-[calc(100vh-64px)] w-full py-6">
        <Outlet />
      </Container>
      <AppFooter />
    </div>
  );
}
