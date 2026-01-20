import { Outlet } from "react-router-dom";
import StudentNavbar from "../components/StudentNavbar";

export default function StudentLayout() {
  return (
    <>
      <StudentNavbar />
      <Outlet />
    </>
  );
}
