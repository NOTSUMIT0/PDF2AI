import Sidebar from "../components/navigation/Sidebar";
import Topbar from "../components/navigation/Topbar";

function AppLayout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-section">
        <Topbar />

        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AppLayout;