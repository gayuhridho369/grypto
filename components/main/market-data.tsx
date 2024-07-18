"use client";

import { useState } from "react";
import Image from "next/image";
import { COIN_LIST } from "@/constants/coin";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CandlestickChart from "./candlestick-chart";
import OrderBook from "./order-book";

export default function MarketData() {
  const [coinSelected, setCoinSelected] = useState(COIN_LIST[0]);

  const handleSelectCoin = (code: string) => {
    const selected = COIN_LIST.filter((item) => item.code === code)[0];
    setCoinSelected(selected);
  };

  return (
    <div id="market-data">
      <Card className="xl:col-span-2 h-max mt-[120px]">
        <CardHeader className="flex flex-row gap-36 items-center justify-between">
          <div className="grid gap-2">
            <CardTitle className="text-3xl font-bold">
              Market Data of Cryptocurrency
            </CardTitle>
            <CardDescription className="text-md text-secondary-foreground/70">
              Discover real-time cryptocurrency market data, including price
              updates, trading volumes, and detailed analysis for informed
              investment decisions.
            </CardDescription>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size={"lg"}
                variant="outline"
                className="flex gap-2 font-bold"
              >
                <Image
                  src={coinSelected.icon}
                  alt={coinSelected.name}
                  className="h-6 w-6"
                />
                {coinSelected.name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {COIN_LIST.map((item) => (
                <DropdownMenuItem
                  key={item.code}
                  className="flex gap-2"
                  onClick={() => handleSelectCoin(item.code)}
                >
                  <Image src={item.icon} alt={item.name} className="h-4 w-4" />
                  {item.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>

        <CardContent className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <CandlestickChart coinSelected={coinSelected} />
          </div>
          <div>
            <OrderBook coinSelected={coinSelected} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
