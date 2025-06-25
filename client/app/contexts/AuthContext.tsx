import { createContext, useContext, useEffect, useState } from "react";
import { type UserOut } from "@/lib/open-api";
import { userApi } from "@/lib/services";
import { useNavigate } from "react-router";

export interface AuthContext {
  user: UserOut | null;
  setUser: (u: UserOut | null) => void;
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
}

type UseAuth<T = UserOut | null> = () => {
  user: T;
  isLoading: boolean;
  updateUser: (user: UserOut) => void;
  login: (user: UserOut) => void;
  logout: () => void;
};

export const ContextAuth = createContext<AuthContext | undefined>(undefined);

export const useAuth: UseAuth = () => {
  const context = useContext(ContextAuth);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { user, setUser, isLoading } = context;

  function logout() {
    setUser(null);
  }

  function login(user: UserOut) {
    setUser(user);
  }

  const updateUser = (user: UserOut) => setUser(user);

  return { user, isLoading, login, logout, updateUser };
};

export const ProviderAuth = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserOut | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMe();
  }, []);

  const fetchMe = async () => {
    try {
      const { data } = await userApi.readCurrentUser();
      setUser(data);
    } catch (e) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-4 border-gray-100"></div>
      </div>
    );
  }

  return (
    <ContextAuth.Provider
      value={{
        user,
        setUser,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </ContextAuth.Provider>
  );
};
