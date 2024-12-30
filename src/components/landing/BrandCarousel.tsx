import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";

const brands = [
  { name: "Amazon", logo: "/placeholder.svg" },
  { name: "Shopify", logo: "/placeholder.svg" },
  { name: "WooCommerce", logo: "/placeholder.svg" },
  { name: "Magento", logo: "/placeholder.svg" },
  { name: "BigCommerce", logo: "/placeholder.svg" },
  { name: "PrestaShop", logo: "/placeholder.svg" },
];

export const BrandCarousel = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-center mb-12 text-gray-600">
          Trusted by Leading E-commerce Platforms
        </h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {brands.map((brand, index) => (
              <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                <Card className="p-6">
                  <div className="aspect-square relative">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="object-contain w-full h-full opacity-50 hover:opacity-100 transition-opacity"
                    />
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};