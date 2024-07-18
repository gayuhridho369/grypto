import Image from "next/image";
import { Button } from "@/components/ui/button";
import Crypto from "@/assets/crypto-trading.png";

export default function HeroBrand() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex justify-center flex-col gap-4">
        <h1 className="text-[32px] lg:text-[48px] leading-tight font-extrabold">
          The Foremost Cryptocurrency Platform
        </h1>
        <p className="text-sm md:text-md:text-secondary-foreground/70">
          The leading platform for seamless, secure cryptocurrency trading and
          management. Experience innovative tools, real-time data, and
          unparalleled support in the dynamic world of digital assets
        </p>
        <Button size={"lg"} className="w-max">
          Explore Grypto
        </Button>
      </div>

      <div className="w-full h-full flex items-center justify-center">
        <Image src={Crypto} alt="crypto" className="h-auto w-[500px]" />
      </div>
    </div>
  );
}
