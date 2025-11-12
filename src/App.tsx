import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RequireAuth from "./components/features/RequireAuth";
import { Loading } from "./components/ui/loading/Loading";

// Lazy-loaded components
const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const DashboardLayout = lazy(
  () => import("./components/features/DashboardLayout")
);
const Report = lazy(() => import("./pages/dashboard/report/Report"));

const App: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          {/* when authed and you hit /mis_dashboard/, go to /mis_dashboard/dashboard */}
          {/* <Route index element={<Navigate to="/dashboard" replace />} /> */}

          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<Home />} />
            <Route path="report" element={<Report />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default App;
