import React from "react";
import { useAuthContext } from "../context/Auth/AuthContext";
import LoggedApp from "./LoggedApp";
import UnloggedApp from "./UnloggedApp";

const App: React.FC = () => {
  const { me } = useAuthContext();
  return me ? <LoggedApp /> : <UnloggedApp />;
};

export default App;
