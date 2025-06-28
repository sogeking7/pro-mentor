import { AuthApi, Configuration, HabitsApi, UsersApi } from "@/lib/open-api";

const config = new Configuration({
  basePath: import.meta.env.VITE_BASE_PATH,
  baseOptions: {
    withCredentials: true,
  },
});

export const authApi = new AuthApi(config);
export const userApi = new UsersApi(config);
export const habitApi = new HabitsApi(config);
