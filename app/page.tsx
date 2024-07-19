import HeroBrand from "@/components/main/hero-brand";
import PopularCrypto from "@/components/main/popular-crypto";
import DownloadApp from "@/components/main/download-app";
import { MarketData } from "@/components/main/market-data-lazy";
import TestimonialUser from "@/components/main/testimonial-user";

export default function Page() {
  return (
    <>
      <HeroBrand />
      <PopularCrypto />
      <DownloadApp />
      <MarketData />
      <TestimonialUser />
    </>
  );
}
