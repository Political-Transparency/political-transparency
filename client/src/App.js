import { useMemo } from "react";
import { themeSettings } from "./theme";
import { ThemeProvider } from "@emotion/react";
import Layout from "./scenes/layout";
import { useSelector } from "react-redux";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Home from "scenes/home";
import Votes from "scenes/votes";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app" dir="rtl">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/votes" element={<Votes />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
