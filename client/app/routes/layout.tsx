import AppHeader from "@/components/layouts/AppHeader";
import { Container } from "@/ui/Container";
import { Outlet } from "react-router";

export default function HomeLayout() {
  return (
    <div className="min-h-screen pt-16">
      <AppHeader />
      <Container className="h-full w-full py-6">
        <Outlet />
      </Container>
    </div>
  );
}
