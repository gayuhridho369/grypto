import HeroBrand from "@/components/main/hero-brand";
import PopularCrypto from "@/components/main/popular-crypto";
import MarketData from "@/components/main/market-data";
import DownloadApp from "@/components/main/download-app";
import TestimonialUser from "@/components/main/testimonial-user";

export default function Page() {
  return (
    <main className="flex flex-1 flex-col gap-[96px] px-20 py-16">
      <HeroBrand />
      <PopularCrypto />
      <DownloadApp />
      <MarketData />
      <TestimonialUser />
    </main>
  );
}
