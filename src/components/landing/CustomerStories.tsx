import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const stories = [
  {
    name: "Sarah Johnson",
    role: "E-commerce Owner",
    company: "Fashion Boutique",
    image: "/placeholder.svg",
    quote: "Veryfy has helped us build trust with our customers and significantly reduced fraud attempts.",
  },
  {
    name: "Michael Chen",
    role: "CEO",
    company: "Tech Gadgets Store",
    image: "/placeholder.svg",
    quote: "The verification process was smooth, and our sales increased by 40% after getting verified.",
  },
  {
    name: "Emma Davis",
    role: "Operations Manager",
    company: "Home Decor Shop",
    image: "/placeholder.svg",
    quote: "The customer blacklist feature has saved us from numerous potential scams.",
  },
];

export const CustomerStories = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Customer Stories</h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          See how Veryfy has helped businesses build trust and prevent fraud
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {stories.map((story, index) => (
            <Card key={index} className="p-6">
              <blockquote className="text-gray-600 mb-6">{story.quote}</blockquote>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={story.image} alt={story.name} />
                  <AvatarFallback>{story.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{story.name}</div>
                  <div className="text-sm text-gray-500">
                    {story.role} at {story.company}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};