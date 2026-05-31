import logo from "../../assets/logo.png";

import { NavLink } from "react-router-dom";

import {
  PanelLeftClose,
  PanelLeftOpen,
  LayoutDashboard,
  FileText,
  History,
  FolderOpen,
  Settings,
  Info,
} from "lucide-react";

import { useSidebar } from "../../contexts/SidebarContext";

function Sidebar() {
  const { collapsed, toggleSidebar } = useSidebar();

  return (
    <aside
        className={`sidebar ${
          collapsed ? "collapsed" : ""
        }`}
      >
      <div className="sidebar-header">
        <img
          src={logo}
          alt="PDF2AI"
          className="logo-image"
          title={collapsed ? "Open Sidebar" : "PDF2AI"}
          onClick={collapsed ? toggleSidebar : undefined}
        />

        {!collapsed && (
          <button
            className="collapse-btn"
            onClick={toggleSidebar}
            title="Collapse Sidebar"
          >
            <PanelLeftClose size={22} />
          </button>
        )}
      </div>

      <nav>
        <NavLink to="/" title={collapsed ? "Dashboard" : ""}>
          <LayoutDashboard size={18} />
          {!collapsed && ( <span>Dashboard</span> )}
        </NavLink>

        <NavLink to="/convert" title={collapsed ? "Convert" : ""}>
          <FileText size={18} />
          {!collapsed && ( <span>Convert</span> )}
        </NavLink>

        <NavLink to="/recent-files" title={collapsed ? "Recent Files" : ""}>
          <History size={18} />
          {!collapsed && ( <span>Recent Files</span> )}
        </NavLink>

        <NavLink to="/exports" title={collapsed ? "Exports" : ""}>
          <FolderOpen size={18} />
          {!collapsed && ( <span>Exports</span> )}
        </NavLink>

        <NavLink to="/settings" title={collapsed ? "Settings" : ""}>
          <Settings size={18} />
          {!collapsed && ( <span>Settings</span> )}
        </NavLink>

        <NavLink to="/about" title={collapsed ? "About" : ""}>
          <Info size={18} />
          {!collapsed && ( <span>About</span> )}
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;