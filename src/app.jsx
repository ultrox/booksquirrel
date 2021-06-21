import React from "react";
import FullPageSpinner from "@components/FullPageSpinner";
import Login from "@components/Login";

import PrimaryLayout from "./primary-layout";
import { useAuth } from "./context/auth";

function App() {
  const { authenticated } = useAuth();
  if (authenticated === null) {
    return <FullPageSpinner />;
  }

  return authenticated ? <PrimaryLayout /> : <Unauthenticated />;
}

function Unauthenticated() {
  return <Login />;
}
export default App;
