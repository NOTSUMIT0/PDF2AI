import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  FileText,
  History,
  FolderOpen,
  Settings,
  Info,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        PDF2AI
      </div>

      <nav>
        <NavLink to="/">
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/convert">
          <FileText size={18} />
          <span>Convert</span>
        </NavLink>

        <NavLink to="/recent-files">
          <History size={18} />
          <span>Recent Files</span>
        </NavLink>

        <NavLink to="/exports">
          <FolderOpen size={18} />
          <span>Exports</span>
        </NavLink>

        <NavLink to="/settings">
          <Settings size={18} />
          <span>Settings</span>
        </NavLink>

        <NavLink to="/about">
          <Info size={18} />
          <span>About</span>
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;