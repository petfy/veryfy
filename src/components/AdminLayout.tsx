import { useEffect, useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LayoutDashboard, ShieldCheck, AlertOctagon, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LanguageSelector } from "./LanguageSelector";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        toast({
          variant: "destructive",
          title: "Session expired",
          description: "Please log in again",
        });
        navigate("/login");
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        toast({
          variant: "destructive",
          title: "Session expired",
          description: "Please log in again",
        });
        navigate("/login");
      }
    });

    // Cleanup subscription
    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-primary text-white">
          <div className="p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Verify.link Admin</h1>
            <LanguageSelector />
          </div>
          <nav className="mt-8">
            <Link
              to="/admin"
              className="flex items-center px-4 py-3 text-white hover:bg-primary/80"
            >
              <LayoutDashboard className="mr-3" />
              Dashboard
            </Link>
            <Link
              to="/admin/verifications"
              className="flex items-center px-4 py-3 text-white hover:bg-primary/80"
            >
              <ShieldCheck className="mr-3" />
              Store Verifications
            </Link>
            <Link
              to="/admin/reports"
              className="flex items-center px-4 py-3 text-white hover:bg-primary/80"
            >
              <AlertOctagon className="mr-3" />
              Scam Reports
            </Link>
          </nav>
          <div className="absolute bottom-0 w-64 p-4">
            <button
              onClick={handleSignOut}
              className="flex items-center px-4 py-3 text-white hover:bg-primary/80 w-full"
            >
              <LogOut className="mr-3" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}