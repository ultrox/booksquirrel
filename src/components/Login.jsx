import React from "react";

import config from "@bs/app-config";

function Login() {
  const loginUrl = `${config.backendBaseURL}/login/google`;
  return <a href={loginUrl}>Login with Google</a>;
}

export default Login;
