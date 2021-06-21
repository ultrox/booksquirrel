import React from "react";
import { useAuth } from "@bs/context/auth";

function PrimaryLayout() {
  const { user } = useAuth();

  return <pre>{JSON.stringify(user, false, 2)}</pre>;
}

export default PrimaryLayout;
