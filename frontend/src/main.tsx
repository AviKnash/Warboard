import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { GameProvider } from "./context/GameContext.tsx";
import { SocketProvider } from "./context/SocketContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      {/* <SocketProvider> */}
        {/* <GameProvider> */}
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <App />
          </ThemeProvider>
        {/* </GameProvider> */}
      {/* </SocketProvider> */}
    </AuthProvider>
  </BrowserRouter>
);
