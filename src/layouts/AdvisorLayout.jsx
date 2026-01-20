import AdvisorSidebar from "../components/AdvisorSidebar";

export default function AdvisorLayout({ children }) {
  return (
    <div className="d-flex" style={{ background: "#f6fbff" }}>
      <AdvisorSidebar />
      <div style={{ flex: 1, padding: 24 }}>{children}</div>
    </div>
  );
}
