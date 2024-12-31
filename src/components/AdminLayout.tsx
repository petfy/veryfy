import { useEffect, useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LayoutDashboard, ShieldCheck, AlertOctagon, LogOut, Menu, Flag, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LanguageSelector } from "./LanguageSelector";
import { useTranslation } from "@/contexts/TranslationContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const { toast } = useToast();
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  // Add handleSignOut function
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Sign Out Error",
          description: error.message
        });
      } else {
        toast({
          title: "Signed Out",
          description: "You have been successfully signed out"
        });
        navigate("/login");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign Out Error",
        description: "An unexpected error occurred"
      });
    }
  };

  useEffect(() => {
    // Set menu closed by default on mobile
    if (isMobile) {
      setIsMenuOpen(false);
    }
  }, [isMobile]);

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

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const menuItems = [
    { icon: LayoutDashboard, label: "dashboard", path: "/admin" },
    { icon: ShieldCheck, label: "storeVerifications", path: "/admin/verifications" },
    { icon: AlertOctagon, label: "scamReports", path: "/admin/reports" },
    { icon: Flag, label: "approvedScams", path: "/admin/approved-scams" },
    { icon: User, label: "accountSettings", path: "/admin/account" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div
          className={cn(
            "bg-primary text-white transition-all duration-300",
            isMenuOpen ? "w-64" : "w-16",
            "fixed h-full z-20"
          )}
        >
          <div className="p-4 flex justify-between items-center">
            {isMenuOpen && <h1 className="text-xl font-bold">{t("verifyLink")}</h1>}
            {!isMobile && <LanguageSelector />}
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white"
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
          </div>

          <nav className="mt-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center px-4 py-3 text-white hover:bg-primary/80"
              >
                <item.icon className={cn("w-5 h-5", !isMenuOpen && "mx-auto")} />
                {isMenuOpen && <span className="ml-3">{t(item.label)}</span>}
              </Link>
            ))}
          </nav>

          <div className={cn(
            "absolute bottom-0 w-full p-4",
            isMenuOpen ? "w-64" : "w-16"
          )}>
            {isMobile && <LanguageSelector className="mb-4" />}
            <button
              onClick={handleSignOut}
              className="flex items-center px-4 py-3 text-white hover:bg-primary/80 w-full"
            >
              <LogOut className={cn("w-5 h-5", !isMenuOpen && "mx-auto")} />
              {isMenuOpen && <span className="ml-3">{t("signOut")}</span>}
            </button>
          </div>
        </div>

        {/* Main content */}
        <div 
          className={cn(
            "flex-1 overflow-auto transition-all duration-300",
            isMenuOpen ? "ml-64" : "ml-16"
          )}
        >
          <div className="p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}