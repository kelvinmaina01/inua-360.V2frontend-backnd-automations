import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ContentProvider } from "./contexts/ContentContext";
import { AuthProvider } from "./contexts/AuthContext";

createRoot(document.getElementById("root")!).render(
  <ContentProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ContentProvider>
);
