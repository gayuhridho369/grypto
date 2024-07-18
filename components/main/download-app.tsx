import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import DownloadImg from "@/assets/download.webp";
import DownloadAppstore from "@/assets/appstore.png";
import DownloadGoogleplay from "@/assets/googleplay.png";

export default function DownloadApp() {
  return (
    <div id="installation">
      <div className="mt-[60px] md:mt-[120px]">
        <h1 className="text-xl md:text-3xl font-bold mb-4">
          &quot;Simple Investment: Anytime and Anywhere&quot;
        </h1>
        <Card className="bg-primary/10">
          <CardContent className="relative min-h-[250px] flex flex-col justify-between p-6 md:p-8">
            <div className="w-full md:w-1/2">
              <p className="text-xs md:text-base text-secondary-foreground/70">
                Let&apos;s go, download the Grypto App on iOS or Android and get
                vouchers/discounts for new members!
              </p>

              <p className="text-xl md:text-3xl font-bold mt-2 text-primary">
                Crypto investment starting from{" "}
                <span className="font-extrabold text-2xl md:text-[42px] inline-block ml-2">
                  $10
                </span>
              </p>
            </div>
            <div className="flex  gap-2 md:gap-6 mt-[200px] md:mt-12 relative z-10">
              <Image
                src={DownloadAppstore}
                alt="download"
                className="w-[100px] md:w-[200px] h-auto"
              />
              <Image
                src={DownloadGoogleplay}
                alt="download"
                className="w-[100px] md:w-[200px] h-auto"
              />
            </div>
            <Image
              src={DownloadImg}
              alt="download"
              className="h-[250px] md:h-[300px] xl:h-[400px] w-auto absolute bottom-0 right-[50px] xl:right-[100px]"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
