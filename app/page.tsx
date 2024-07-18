import HeroBrand from "@/components/main/hero-brand";
import PopularCrypto from "@/components/main/popular-crypto";
import DownloadApp from "@/components/main/download-app";
import TestimonialUser from "@/components/main/testimonial-user";
import dynamic from "next/dynamic";
const MarketData = dynamic(() => import("@/components/main/market-data"), {
  ssr: false,
});

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
