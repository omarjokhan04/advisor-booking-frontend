import { Outlet } from "react-router-dom";
import AdvisorSidebar from "../components/AdvisorSidebar";
import "../css/AdvisorLayout.css";

export default function AdvisorLayout() {
  return (
    <div className="advisor-layout">
      <AdvisorSidebar />
      <main className="advisor-content">
        <Outlet />
      </main>
    </div>
  );
}
