import React from "react";
import NavigationContainer from "./route";
import "./App.css";
import { Context } from "./context/WalletAdaptex.tsx";
import UserProvider from "./context/UserProvider";

const App = React.memo(() => {
  return (
    <Context>
      <UserProvider>
        <NavigationContainer />
      </UserProvider>
    </Context>
  );
});

export default App;
