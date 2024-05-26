import React, { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import MyThemeProvider from "./theme/theme";
import { UserContextProvider } from "./context/UserContextProvider";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <MyThemeProvider>
      <UserContextProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </UserContextProvider>
    </MyThemeProvider>
  );
}

export default App;
