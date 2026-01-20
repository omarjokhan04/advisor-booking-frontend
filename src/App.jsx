import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <AppRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  );
}
