import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";

export const MarketData = dynamic(
  () => import("@/components/main/market-data"),
  {
    ssr: false,
    loading: () => (
      <Skeleton className="h-[700px] w-full rounded-xl mt-[60px] md:mt-[120px]" />
    ),
  }
);
