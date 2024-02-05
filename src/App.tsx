import React from "react";
import Router from "next/router";
import { useEffect } from "react";

const App: React.FC = () => {

  useEffect(() => {
    Router.push("/");
  });

  return null;
};

export default App;
