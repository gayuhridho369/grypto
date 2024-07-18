import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import DownloadImg from "@/assets/download.webp";
import DownloadAppstore from "@/assets/appstore.png";
import DownloadGoogleplay from "@/assets/googleplay.png";

export default function DownloadApp() {
  return (
    <div id="installation">
      <div className="mt-[160px]">
        <h1 className="text-3xl font-bold mb-4">
          &quot;Simple Investment: Anytime and Anywhere&quot;
        </h1>
        <Card className="bg-primary/10">
          <CardContent className="relative min-h-[250px] flex flex-col justify-between p-8">
            <div className="w-1/2">
              <p className="text-md text-secondary-foreground/70">
                Let&apos;s go, download the Grypto App on iOS or Android and get
                vouchers/discounts for new members!
              </p>

              <p className="text-3xl font-bold mt-2 text-primary">
                Crypto investment starting from{" "}
                <span className="font-extrabold text-[42px] inline-block ml-2">
                  $10
                </span>
              </p>
            </div>
            <div className="flex gap-6 mt-12">
              <Image
                src={DownloadAppstore}
                alt="download"
                className="w-[200px] h-auto"
              />
              <Image
                src={DownloadGoogleplay}
                alt="download"
                className="w-[200px] h-auto"
              />
            </div>
            <Image
              src={DownloadImg}
              alt="download"
              className="h-[400px] w-auto absolute bottom-0 right-[100px]"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
