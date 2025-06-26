import { AuthApi, Configuration, UsersApi } from "@/lib/open-api";

const config = new Configuration({
  basePath: "http://localhost:5173",
  baseOptions: {},
});

export const authApi = new AuthApi(config);
export const userApi = new UsersApi(config);
