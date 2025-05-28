import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div>
      <Outlet /> {/* Renders nested route element */}
    </div>
  );
}
