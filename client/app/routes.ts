import {
  index,
  layout,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  layout("routes/layouts/home-layout.tsx", [
    index("routes/home.tsx"),
    layout("routes/layouts/page-card-layout.tsx", [
      route("me", "routes/me.tsx"),
      route("teachers", "routes/teachers.tsx"),
      route("students", "routes/students.tsx"),
      route("personality", "routes/personality.tsx"),
      route("diagnostics", "routes/diagnostics.tsx"),
    ]),
  ]),
  route("lifehacks", "routes/lifehacks/lifehacks.tsx"),
] satisfies RouteConfig;
