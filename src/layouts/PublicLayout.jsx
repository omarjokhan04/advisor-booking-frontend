import { Outlet } from "react-router-dom";
import AppNavbar from "../components/AppNavbar";

export default function PublicLayout() {
  return (
    <>
      <AppNavbar />
      <Outlet />
    </>
  );
}
