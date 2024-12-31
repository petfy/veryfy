import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TranslationProvider } from "@/contexts/TranslationContext";

// Pages
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import AdminLayout from "@/components/AdminLayout";
import AdminDashboard from "@/pages/AdminDashboard";
import StoreVerifications from "@/pages/StoreVerifications";
import ScamReports from "@/pages/ScamReports";
import ApprovedScamList from "@/pages/ApprovedScamList";
import AccountSettings from "@/pages/AccountSettings";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TranslationProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="verifications" element={<StoreVerifications />} />
              <Route path="reports" element={<ScamReports />} />
              <Route path="approved-scams" element={<ApprovedScamList />} />
              <Route path="account" element={<AccountSettings />} />
            </Route>
          </Routes>
          <Toaster />
        </Router>
      </TranslationProvider>
    </QueryClientProvider>
  );
}

export default App;