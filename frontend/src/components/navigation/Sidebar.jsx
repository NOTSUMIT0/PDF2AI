import logo from "../../assets/logo.png";

import { NavLink } from "react-router-dom";

import Tooltip from "../ui/Tooltip";

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
        <Tooltip text="Dashboard">
          <NavLink to="/" title={collapsed ? "Dashboard" : ""}>
            <LayoutDashboard size={18} />
            {!collapsed && ( <span>Dashboard</span> )}
          </NavLink>
        </Tooltip>

        <Tooltip text="Convert">        
          <NavLink to="/convert" title={collapsed ? "Convert" : ""}>
            <FileText size={18} />
            {!collapsed && ( <span>Convert</span> )}
          </NavLink>
        </Tooltip>

        <Tooltip text="Recent Files">    
          <NavLink to="/recent-files" title={collapsed ? "Recent Files" : ""}>
            <History size={18} />
            {!collapsed && ( <span>Recent Files</span> )}
          </NavLink>
        </Tooltip>

        <Tooltip text="Exports">  
          <NavLink to="/exports" title={collapsed ? "Exports" : ""}>
            <FolderOpen size={18} />
            {!collapsed && ( <span>Exports</span> )}
          </NavLink>
        </Tooltip>

        <Tooltip text="Settings">          
          <NavLink to="/settings" title={collapsed ? "Settings" : ""}>
            <Settings size={18} />
            {!collapsed && ( <span>Settings</span> )}
          </NavLink>
        </Tooltip>

        <Tooltip text="About">  
          <NavLink to="/about" title={collapsed ? "About" : ""}>
            <Info size={18} />
            {!collapsed && ( <span>About</span> )}
          </NavLink>
        </Tooltip>  
      </nav>
    </aside>
  );
}

export default Sidebar;