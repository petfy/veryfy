import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TranslationProvider } from "@/contexts/TranslationContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import StoreVerifications from "./pages/StoreVerifications";
import ScamReports from "./pages/ScamReports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TranslationProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="verifications" element={<StoreVerifications />} />
              <Route path="reports" element={<ScamReports />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </TranslationProvider>
  </QueryClientProvider>
);

export default App;