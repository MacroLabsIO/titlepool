import React from "react";
import NavigationContainer from "./route";
import "./App.css";
import "./StyleOverrides.css";
import { Context } from "./context/WalletAdaptex.tsx";
import { AuthProvider } from "./context/AuthProvider";

const App = React.memo(() => {
    return (
        <Context>
            <AuthProvider>
                <NavigationContainer />
            </AuthProvider>
        </Context>
    );
});

export default App;
