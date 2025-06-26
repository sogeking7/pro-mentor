import { AuthApi, Configuration, UsersApi } from "@/lib/open-api";

const config = new Configuration({
  basePath: window.location.origin,
  baseOptions: {},
});

export const authApi = new AuthApi(config);
export const userApi = new UsersApi(config);
