import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import CpuScheduling from "../pages/CpuScheduling";
import Deadlock from "../pages/Deadlock";
import DiskScheduling from "../pages/DiskScheduling";
import FileManagement from "../pages/FileManagement";
import MemoryAllocation from "../pages/MemoryAllocation";
import NotFound from "../pages/NotFound";
import PageReplacement from "../pages/PageReplacement";
import About from "../pages/About";
import Help from "../pages/Help";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/cpu-scheduling" element={<CpuScheduling />} />
      <Route path="/memory-management" element={<MemoryAllocation />} />
      <Route path="/page-replacement" element={<PageReplacement />} />
      <Route path="/disk-scheduling" element={<DiskScheduling />} />
      <Route path="/deadlock" element={<Deadlock />} />
      <Route path="/file-management" element={<FileManagement />} />
      <Route path="/about" element={<About />} />
      <Route path="/help" element={<Help />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
export default AppRoutes;
