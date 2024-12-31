import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "@/contexts/TranslationContext";
import type { TranslationKey } from "@/contexts/TranslationContext";

const stories = [
  {
    name: "Sarah Johnson",
    role: "E-commerce Owner" as TranslationKey,
    company: "Fashion Boutique",
    image: "/placeholder.svg",
    quoteKey: "customerStory1" as TranslationKey,
  },
  {
    name: "Michael Chen",
    role: "CEO" as TranslationKey,
    company: "Tech Gadgets Store",
    image: "/placeholder.svg",
    quoteKey: "customerStory2" as TranslationKey,
  },
  {
    name: "Emma Davis",
    role: "Operations Manager" as TranslationKey,
    company: "Home Decor Shop",
    image: "/placeholder.svg",
    quoteKey: "customerStory3" as TranslationKey,
  },
];

export const CustomerStories = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">{t("customerStories")}</h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          {t("customerStoriesSubtitle")}
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {stories.map((story, index) => (
            <Card key={index} className="p-6">
              <blockquote className="text-gray-600 mb-6">{t(story.quoteKey)}</blockquote>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={story.image} alt={story.name} />
                  <AvatarFallback>{story.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{story.name}</div>
                  <div className="text-sm text-gray-500">
                    {t(story.role)} {t("at")} {story.company}
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