import { Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/contexts/TranslationContext";

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear().toString();

  return (
    <footer className="bg-gray-900 text-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center text-xl md:text-2xl font-bold mb-4 md:mb-6">
              <Shield className="w-5 h-5 md:w-6 md:h-6 mr-2" />
              Veryfy
            </Link>
            <p className="text-sm md:text-base text-gray-400">
              {t("footerTagline")}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4">{t("product")}</h3>
            <ul className="space-y-1.5 md:space-y-2 text-sm md:text-base">
              <li><Link to="#" className="text-gray-400 hover:text-white">{t("features")}</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">{t("pricing")}</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">{t("verification")}</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">{t("blacklist")}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4">{t("company")}</h3>
            <ul className="space-y-1.5 md:space-y-2 text-sm md:text-base">
              <li><Link to="#" className="text-gray-400 hover:text-white">{t("about")}</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">{t("contact")}</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">{t("blog")}</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">{t("careers")}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4">{t("legal")}</h3>
            <ul className="space-y-1.5 md:space-y-2 text-sm md:text-base">
              <li><Link to="#" className="text-gray-400 hover:text-white">{t("privacyPolicy")}</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">{t("termsOfService")}</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">{t("cookiePolicy")}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-sm md:text-base text-gray-400">
          <p>{t("copyright", [currentYear])}</p>
        </div>
      </div>
    </footer>
  );
};