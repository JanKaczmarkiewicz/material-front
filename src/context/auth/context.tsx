import createContext from "../util";

export type User = {
  username: string;
};

export type AuthAPI = {
  isAuthenticated: false;
  login: (name: string, email: string) => void;
  getUserData: () => void;
  user: User | null;
};

const [useAuthContext, AuthProvider] = createContext<AuthAPI>();

export default useAuthContext;
export { AuthProvider };
