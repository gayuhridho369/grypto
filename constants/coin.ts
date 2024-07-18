import { StaticImageData } from "next/image";
import BitcoinIcon from "@/assets/bitcoin.png";
import EthereumIcon from "@/assets/ethereum.png";
import TetherIcon from "@/assets/tether.png";
import RippleIcon from "@/assets/ripple.png";
import CardanoIcon from "@/assets/cardano.png";
import SolanaIcon from "@/assets/solana.png";
import DogecoinIcon from "@/assets/dogecoin.png";
import PolkadotIcon from "@/assets/polkadot.png";
import PolygonIcon from "@/assets/polygon.png";
import LitecoinIcon from "@/assets/litecoin.png";

export interface Coin {
  code: string;
  symbol: string;
  pair: string;
  name: string;
  result: string;
  icon: StaticImageData;
}

export const COIN_LIST: Coin[] = [
  {
    code: "BTC",
    symbol: "BTCUSD",
    pair: "XBTUSD",
    name: "Bitcoin",
    result: "XXBTZUSD",
    icon: BitcoinIcon,
  },
  {
    code: "ETH",
    symbol: "ETHUSD",
    pair: "ETHUSD",
    name: "Ethereum",
    result: "XETHZUSD",
    icon: EthereumIcon,
  },
  {
    code: "USDT",
    symbol: "USTUSD",
    pair: "USDTUSD",
    name: "Tether",
    result: "USDTZUSD",
    icon: TetherIcon,
  },
  {
    code: "XRP",
    symbol: "XRPUSD",
    pair: "XRPUSD",
    name: "Ripple",
    result: "XXRPZUSD",
    icon: RippleIcon,
  },
  {
    code: "ADA",
    symbol: "ADAUSD",
    pair: "ADAUSD",
    name: "Cardano",
    result: "ADAUSD",
    icon: CardanoIcon,
  },
  {
    code: "SOL",
    symbol: "SOLUSD",
    pair: "SOLUSD",
    name: "Solana",
    result: "SOLUSD",
    icon: SolanaIcon,
  },
  {
    code: "DOGE",
    symbol: "DOGEUSD",
    pair: "DOGEUSD",
    name: "Dogecoin",
    result: "XDGUSD",
    icon: DogecoinIcon,
  },
  {
    code: "DOT",
    symbol: "DOTUSD",
    pair: "DOTUSD",
    name: "Polkadot",
    result: "DOTUSD",
    icon: PolkadotIcon,
  },
  {
    code: "MATIC",
    symbol: "MATICUSD",
    pair: "MATICUSD",
    name: "Polygon",
    result: "MATICUSD",
    icon: PolygonIcon,
  },
  {
    code: "LTC",
    symbol: "LTCUSD",
    pair: "LTCUSD",
    name: "Litecoin",
    result: "XLTCZUSD",
    icon: LitecoinIcon,
  },
];
