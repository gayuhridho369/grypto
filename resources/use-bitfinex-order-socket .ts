import { useRef, useState, useEffect } from "react";

const useBitfinexOrderSocket = ({ symbol }: { symbol: string }) => {
  const [orderDataSocket, setOrderDataSocket] = useState<number[][]>([]);
  const [loading, setLoading] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  const isArrayofArrays = (variable: unknown): variable is number[][] => {
    return Array.isArray(variable) && variable.every(Array.isArray);
  };

  let tempData: number[][] = [];

  const updateOrderBook = (update: number[]) => {
    const [price, count, amount] = update;

    if (count > 0) {
      const existingOrderIndex = tempData.findIndex(
        (order) => order[0] === price
      );

      if (existingOrderIndex !== -1) {
        tempData[existingOrderIndex] = [price, count, amount];
      } else {
        tempData.push([price, count, amount]);
      }
    } else if (price === 0) {
      tempData = tempData.filter((order) => order[0] !== price);
    }
  };

  useEffect(() => {
    setLoading(true);
    setOrderDataSocket([]);

    ws.current = new WebSocket("wss://api-pub.bitfinex.com/ws/2");

    ws.current.onopen = () => {
      ws.current?.send(
        JSON.stringify({
          event: "subscribe",
          channel: "book",
          symbol: `t${symbol}`,
        })
      );
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (Array.isArray(data[1])) {
        if (isArrayofArrays(data[1])) {
          const filteredData = data[1].filter((item) => item[1] !== 0);
          setOrderDataSocket(filteredData);
          tempData = filteredData;
          setLoading(false);
        } else {
          updateOrderBook(data[1]);
        }
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    const interval = setInterval(() => {
      setOrderDataSocket([...tempData]);
    }, 5000);

    return () => {
      ws.current?.close();
      clearInterval(interval);
    };
  }, [symbol]);

  return { orderDataSocket, orderDataSocketLoading: loading };
};

export default useBitfinexOrderSocket;
