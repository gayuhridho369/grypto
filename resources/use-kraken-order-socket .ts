import { KRAKEN_WEB_SOCKET } from "@/constants/web-socket";
import { useRef, useState, useEffect } from "react";

const KRAKEN_ORDER_CHANNEL = "book";

const useKrakenOrderSocket = ({
  symbol,
  skip,
}: {
  symbol: string;
  skip: boolean;
}) => {
  const [dataOrderAsksSocket, setDataOrderAsksSocket] = useState([]);
  const [dataOrderBidsSocket, setDataOrderBidsSocket] = useState([]);

  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (skip) return;

    ws.current = new WebSocket(KRAKEN_WEB_SOCKET);

    ws.current.onopen = () => {
      ws.current?.send(
        JSON.stringify({
          method: "subscribe",
          params: {
            channel: KRAKEN_ORDER_CHANNEL,
            symbol: [symbol],
          },
        })
      );
    };

    ws.current.onerror = (error) => {
      console.log({ error });
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.channel === KRAKEN_ORDER_CHANNEL && data.type === "update") {
        const asksData = data.data[0].asks.map(
          (item: { price: number; qty: number }) => [item.price, item.qty]
        );

        const bidsData = data.data[0].asks.map(
          (item: { price: number; qty: number }) => [item.price, item.qty]
        );

        setDataOrderAsksSocket(asksData);
        setDataOrderBidsSocket(bidsData);
      }
    };

    return () => {
      ws.current?.close();
    };
  }, [symbol]);

  return { dataOrderAsksSocket, dataOrderBidsSocket };
};

export default useKrakenOrderSocket;
