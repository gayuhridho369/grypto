"use client";

import { useRef } from "react";
import { ScaleLoader } from "react-spinners";
import { Coin } from "@/constants/coin";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import HighchartsPrice from "highcharts/modules/price-indicator";
import useHighchartsOption from "@/lib/use-highcharts-option";
import useBitfinexCandleSocket from "@/resources/use-bitfinex-candle-socket";

HighchartsExporting(Highcharts);
HighchartsAccessibility(Highcharts);
HighchartsPrice(Highcharts);

export default function CandlestickChart({
  coinSelected,
}: {
  coinSelected: Coin;
}) {
  const candlestickChartRef = useRef<HighchartsReact.RefObject>(null);
  const updateCandleData = (value: number[]) => {
    candlestickChartRef.current?.chart.series[0].addPoint(value);
  };

  const { candleData, candleDataLoading } = useBitfinexCandleSocket({
    symbol: coinSelected.symbol,
    updateCandleData,
  });

  const { options, primaryColor } = useHighchartsOption({
    coinSelected,
    candleData: candleData,
  });

  return (
    <div className="col-span-1 md:col-span-2">
      {candleDataLoading || candleData.length < 1 ? (
        <div className="h-[500px] w-full flex items-center justify-center">
          <ScaleLoader height={42} width={5} color={primaryColor} />
        </div>
      ) : (
        <HighchartsReact
          constructorType={"stockChart"}
          ref={candlestickChartRef}
          highcharts={Highcharts}
          options={options}
        />
      )}
    </div>
  );
}
