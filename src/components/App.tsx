import React from "react";
import LoggedApp from "./LoggedApp";
import UnloggedApp from "./UnloggedApp";
import { useAuthContext } from "@koleda/common-context";

const App: React.FC = () => {
  const { me } = useAuthContext();
  return me ? <LoggedApp /> : <UnloggedApp />;
};

export default App;
