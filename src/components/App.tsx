import React from "react";
import LoggedApp from "./LoggedApp";
import UnloggedApp from "./UnloggedApp";
import { useAuthContext } from "shered/dist/context/Auth/AuthContext";

const App: React.FC = () => {
  const { me } = useAuthContext();
  return me ? <LoggedApp /> : <UnloggedApp />;
};

export default App;
