import dynamic from "next/dynamic";
import HeroBrand from "@/components/main/hero-brand";
import PopularCrypto from "@/components/main/popular-crypto";
import DownloadApp from "@/components/main/download-app";
import TestimonialUser from "@/components/main/testimonial-user";

const MarketData = dynamic(() => import("@/components/main/market-data"), {
  ssr: false,
});

export default function Page() {
  return (
    <main className="flex flex-1 flex-col gap-[64px] md:gap-[96px] px-4 md:px-20 py-8 md:py-16">
      <HeroBrand />
      <PopularCrypto />
      <DownloadApp />
      <MarketData />
      <TestimonialUser />
    </main>
  );
}
