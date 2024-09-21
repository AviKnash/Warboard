import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { GameParamsProvider } from "./context/GameContext.tsx";
import { WarbyProvider } from "./context/WarbyContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <GameParamsProvider>
        <WarbyProvider>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <App />
          </ThemeProvider>
        </WarbyProvider>
      </GameParamsProvider>
    </AuthProvider>
  </BrowserRouter>
);
