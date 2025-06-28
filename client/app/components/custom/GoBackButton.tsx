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
      className={"mb-4 inline-block text-blue-600 hover:underline"}
    >
      ←{" " + label}
    </NavLink>
  );
}
