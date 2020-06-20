import { createContext } from "../util";
import { Me_me } from "../../generated/Me";

type LoginCredensials = { email: string; password: string };

export type AuthAPI = {
  login: (loginCredensials: LoginCredensials) => void;
  me: Me_me | null;
  logout: () => void;
};

const { useContext: useAuthContext, Provider } = createContext<AuthAPI>();

export { useAuthContext, Provider };
