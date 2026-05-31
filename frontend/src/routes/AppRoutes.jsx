import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Convert from "../pages/Convert";
import RecentFiles from "../pages/RecentFiles";
import Exports from "../pages/Exports";
import Settings from "../pages/Settings";
import About from "../pages/About";

import AppLayout from "../layouts/AppLayout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/convert" element={<Convert />} />

          <Route path="/recent-files" element={<RecentFiles />} />

          <Route path="/exports" element={<Exports />} />

          <Route path="/settings" element={<Settings />} />

          <Route path="/about" element={<About />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default AppRoutes;