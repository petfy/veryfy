import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import StoreVerifications from "./pages/StoreVerifications";
import ScamReports from "./pages/ScamReports";
import AccountSettings from "./pages/AccountSettings";
import ApprovedScamList from "./pages/ApprovedScamList";
import Verification from "./pages/Verification";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/verifications" element={<StoreVerifications />} />
        <Route path="/admin/scam-reports" element={<ScamReports />} />
        <Route path="/admin/settings" element={<AccountSettings />} />
        <Route path="/scam-reports" element={<ApprovedScamList />} />
        <Route path="/verification/:registrationNumber" element={<Verification />} />
      </Routes>
    </Router>
  );
}

export default App;