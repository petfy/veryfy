import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle } from "lucide-react";

export const BlacklistSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="bg-primary rounded-2xl p-12 text-white text-center">
          <div className="flex justify-center mb-6">
            <AlertTriangle className="w-16 h-16" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Customer Blacklist Protection</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our network of verified stores and protect your business from known fraudulent customers. Share and access reports of suspicious activities.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Learn More
            </Button>
            <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-gray-100">
              Get Protected
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};