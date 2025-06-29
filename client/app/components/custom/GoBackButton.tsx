import { NavLink } from "react-router";
import { ArrowLeft } from "lucide-react";

export default function GoBackButton({
  path = "/",
  label = "Басты бетке оралу",
}: {
  path?: string;
  label?: string;
}) {
  return (
    <NavLink
      to={path}
      className={"flex items-center gap-1 mb-4 text-blue-600 hover:underline"}
    >
      <ArrowLeft className={"size-4"} /> {label}
    </NavLink>
  );
}
