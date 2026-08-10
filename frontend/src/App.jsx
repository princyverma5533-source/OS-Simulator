import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import PageContainer from "./components/layout/PageContainer";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="app">
      <Navbar onMenuClick={() => setIsSidebarOpen((isOpen) => !isOpen)} />

      <div className="main-layout">
        <Sidebar isOpen={isSidebarOpen} />
        <PageContainer>
          <AppRoutes />
        </PageContainer>
      </div>
    </div>
  );
}

export default App;
