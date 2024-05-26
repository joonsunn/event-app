import React from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import Router from "./routes";
import MyThemeProvider from "./theme/theme";
import { UserContextProvider } from "./context/UserContextProvider";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <MyThemeProvider>
      <UserContextProvider>
        <HashRouter>
          <Router />
        </HashRouter>
      </UserContextProvider>
    </MyThemeProvider>
  );
}

export default App;
