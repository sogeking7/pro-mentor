import { Outlet } from "react-router";

export default function PageCardLayout() {
  return (
    <div className="rounded-2xl bg-white px-4 py-6 md:px-6">
      <Outlet />
    </div>
  );
}
