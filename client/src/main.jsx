import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import {
  createTheme,
  ThemeProvider,
 
} from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "black",
      white: "#fff",
      danger:"red"
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "black",
      contrastText: "#000",
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <StyledEngineProvider injectFirst> */}
        {/* <CssVarsProvider> */}
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        {/* </CssVarsProvider> */}
      {/* </StyledEngineProvider> */}
    </Provider>
  </React.StrictMode>
);
