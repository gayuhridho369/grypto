import { useEffect, useMemo, useRef } from "react";
import { useTheme } from "next-themes";
import { ScaleLoader } from "react-spinners";
import useKrakenOhlcApi from "@/resources/use-kraken-ohlc-api";
import useKrakenOhlcSocket from "@/resources/use-kraken-ohlc-socket";
import { Coin } from "@/constants/coin";
import HighchartsReact from "highcharts-react-official";
import Highcharts, { RangeSelectorButtonsOptions } from "highcharts/highstock";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import HighchartsPrice from "highcharts/modules/price-indicator";

HighchartsExporting(Highcharts);
HighchartsAccessibility(Highcharts);
HighchartsPrice(Highcharts);

const FILTER_ZOOM: RangeSelectorButtonsOptions[] = [
  {
    type: "minute",
    count: 15,
    text: "15m",
  },
  {
    type: "minute",
    count: 30,
    text: "30m",
  },
  {
    type: "hour",
    count: 1,
    text: "1h",
  },
  {
    type: "hour",
    count: 2,
    text: "2h",
  },
  {
    type: "hour",
    count: 3,
    text: "3h",
  },
  {
    type: "all",
    count: 1,
    text: "All",
  },
];

export default function CandlestickChart({
  coinSelected,
}: {
  coinSelected: Coin;
}) {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const candlestickChartRef = useRef<HighchartsReact.RefObject>(null);

  const primaryColor = isLight ? "#2563EB" : "#3A81F4";
  const blackWhiteColor = isLight ? "#000000" : "#ffffff";
  const whiteBlackColor = isLight ? "#ffffff" : "#000000";
  const borderColor = isLight ? "rgb(30, 41, 59)" : "rgb(226, 232, 240)";
  const greenColor = "#16A34A";
  const redColor = "#DC2626";
  const buttonFilterColor = isLight ? "#E5E7EB" : "#1F2937";
  const buttonFilterHoverColor = isLight ? "#CBD5E1" : "#334155";

  const { dataOhlcApi, dataOhlcApiLoading } = useKrakenOhlcApi({
    pair: coinSelected.pair,
    resultKey: coinSelected.result,
  });

  const { ohlcDataSocket } = useKrakenOhlcSocket({
    symbol: coinSelected.symbol,
    skip: dataOhlcApiLoading,
  });

  useEffect(() => {
    candlestickChartRef.current?.chart.series[0].addPoint(ohlcDataSocket);
  }, [ohlcDataSocket, theme]);

  const options: Highcharts.Options = useMemo(() => {
    return {
      title: {
        text: coinSelected.name.toUpperCase() + " / USD",
        style: {
          color: primaryColor,
          fontSize: "24px",
          fontWeight: "bold",
        },
      },
      plotOptions: {
        candlestick: {
          lineColor: blackWhiteColor,
        },
      },
      xAxis: {
        overscroll: 500000,
        range: 10 * 200000,
        gridLineWidth: 0.1,
        gridLineColor: borderColor,
        lineColor: borderColor,
        labels: {
          style: {
            color: borderColor,
          },
        },
      },
      yAxis: {
        gridLineWidth: 0.1,
        gridLineColor: borderColor,
        labels: {
          style: {
            color: borderColor,
          },
        },
      },
      exporting: {
        enabled: false,
      },
      rangeSelector: {
        buttonTheme: {
          fill: buttonFilterColor,
          style: {
            color: blackWhiteColor,
          },
          states: {
            hover: {
              fill: buttonFilterHoverColor,
              style: {
                color: blackWhiteColor,
              },
            },
            select: {
              fill: primaryColor,
              style: {
                color: blackWhiteColor,
              },
            },
          },
        },
        buttons: FILTER_ZOOM,
        selected: 15,
        inputEnabled: false,
      },
      credits: {
        enabled: false,
      },
      navigator: {
        xAxis: {
          labels: {
            style: {
              color: blackWhiteColor,
              border: "none",
              textOutline: "none",
            },
          },
        },
        series: {
          color: primaryColor,
        },
      },
      chart: {
        backgroundColor: "transparent",
        height: "500px",
      },
      series: [
        {
          type: "candlestick",
          data: dataOhlcApi,
          color: redColor,
          upColor: greenColor,
          lastPrice: {
            enabled: true,
            color: primaryColor,
            label: {
              enabled: true,
              backgroundColor: primaryColor,
              style: {
                color: whiteBlackColor,
              },
            },
          },
        },
      ],
    };
  }, [dataOhlcApi, theme, coinSelected]);

  return (
    <>
      {dataOhlcApiLoading ? (
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
    </>
  );
}
