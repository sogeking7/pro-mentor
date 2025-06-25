import { ArrowLeft, ChevronLeft } from "lucide-react";
import { NavLink } from "react-router";

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
      className={
        "mb-4 flex w-max items-center gap-1 font-medium text-blue-500 hover:underline"
      }
    >
      <ArrowLeft size={14} />
      {label}
    </NavLink>
  );
}
