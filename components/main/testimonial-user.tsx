import Image from "next/image";
import { TESTIMONIAL } from "@/constants/testimonial";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function TestimonialUser() {
  return (
    <div id="testimonial">
      <div className="mt-[60px] md:mt-[120px]">
        <div className="flex justify-center w-full mb-6">
          <h2 className="text-xl md:text-4xl font-bold">
            &quot;Testimonial of Users&quot;
          </h2>
        </div>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-16">
            {TESTIMONIAL.map((item, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/3 pl-16"
              >
                <div className="p-1">
                  <Card className="h-max">
                    <CardContent className="relative flex flex-col aspect-square items-end justify-between gap-6 md:gap-12 p-6">
                      <Image
                        src={item.photo}
                        className="h-[200px] md:h-[250px] w-full absolute top-0 left-0 object-cover rounded-tr-xl rounded-tl-xl"
                        alt={item.name}
                      />
                      <div className="h-[180px] md:h-[220px] w-full"></div>

                      <div className="flex flex-col items-center justify-start">
                        <h3 className="font-bold text-xl md:text-xl">
                          {item.name}
                        </h3>
                        <h4 className="text-primary text-xs md:text-sm font-medium">
                          {item.position}
                        </h4>
                        <p className="text-xs md:text-sm text-muted-foreground text-center mt-4">
                          &quot;{item.testimonial}&quot;
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
