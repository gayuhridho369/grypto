import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BitcoinIcon from "@/assets/bitcoin.png";
import EthereumIcon from "@/assets/ethereum.png";
import TetherIcon from "@/assets/tether.png";
import RippleIcon from "@/assets/ripple.png";

export default function PopularCrypto() {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-md md:text-lg font-medium">
            Bitcoin
          </CardTitle>
          <Image
            src={BitcoinIcon}
            className="w-8 md:w-12 h-8 md:h-12"
            alt="Bitcoin"
          />
        </CardHeader>
        <CardContent>
          <div className="text-lg md:text-2xl font-bold">$45,231.89</div>
          <p className="text-sm md:tex-md text-green-500 font-bold">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-md md:text-lg font-medium">
            Ethereum
          </CardTitle>
          <Image
            src={EthereumIcon}
            className="w-8 md:w-12 h-8 md:h-12"
            alt="Ethereum"
          />
        </CardHeader>
        <CardContent>
          <div className="text-lg md:text-2xl font-bold">$1,231.89</div>
          <p className="text-sm md:tex-md text-red-500 font-bold">
            -12.1% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-md md:text-lg font-medium">
            Tether
          </CardTitle>
          <Image
            src={TetherIcon}
            className="w-8 md:w-12 h-8 md:h-12"
            alt="Tether"
          />
        </CardHeader>
        <CardContent>
          <div className="text-lg md:text-2xl font-bold">$0,231.89</div>
          <p className="text-sm md:tex-md text-green-500 font-bold">
            +30.1% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-md md:text-lg font-medium">
            Ripple
          </CardTitle>
          <Image
            src={RippleIcon}
            className="w-8 md:w-12 h-8 md:h-12"
            alt="Ripple"
          />
        </CardHeader>
        <CardContent>
          <div className="text-lg md:text-2xl font-bold">$0,231.89</div>
          <p className="text-sm md:tex-md text-green-500 font-bold">
            +14.1% from last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
