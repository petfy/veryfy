import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="flex items-center text-2xl font-bold mb-6">
              <Shield className="w-6 h-6 mr-2" />
              Veryfy
            </Link>
            <p className="text-gray-400">
              Building trust in e-commerce through verified store badges and fraud prevention.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-400 hover:text-white">Features</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">Pricing</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">Verification</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">Blacklist</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-400 hover:text-white">About</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">Contact</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">Blog</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Veryfy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};