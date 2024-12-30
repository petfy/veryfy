import { Shield, Users, AlertTriangle, Search } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Shield,
    title: "Store Verification",
    description: "Get your store verified and display trust badges to build customer confidence.",
  },
  {
    icon: Users,
    title: "Customer Protection",
    description: "Protect your customers with verified business information and secure transactions.",
  },
  {
    icon: AlertTriangle,
    title: "Fraud Prevention",
    description: "Access to customer blacklist and fraud prevention tools to protect your business.",
  },
  {
    icon: Search,
    title: "WHOIS Lookup",
    description: "Verify domain ownership and business authenticity with our WHOIS lookup tool.",
  },
];

export const Features = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Features</h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Everything you need to protect your business and customers
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-6">
                <div className="mb-4">
                  <Icon className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};