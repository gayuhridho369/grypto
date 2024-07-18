"use client";
import { useState } from "react";
import { useTheme } from "next-themes";
import { RefreshCw } from "lucide-react";
import { PropagateLoader } from "react-spinners";
import { cn } from "@/lib/utils";
import useKrakenOrderAPi from "@/resources/use-kraken-order-api";
import { Coin } from "@/constants/coin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function OrderBook({ coinSelected }: { coinSelected: Coin }) {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [refresh, setRefresh] = useState(0);

  const primaryColor = isLight ? "#2563EB" : "#3A81F4";

  const { dataOrderAsksApi, dataOrderBidsApi, dataOrderApiLoading } =
    useKrakenOrderAPi({
      pair: coinSelected.pair,
      resultKey: coinSelected.result,
      refresh: refresh,
    });

  return (
    <Card>
      <CardHeader>
        <div className="grid gap-2">
          <CardTitle className="flex justify-between text-lg">
            Order Book
            <Button onClick={() => setRefresh((prev) => prev + 1)}>
              <RefreshCw
                className={cn(
                  "h-4 w-4",
                  dataOrderApiLoading ? "animate-spin" : ""
                )}
              />
            </Button>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="grid gap-2">
        <>
          <h2 className="text-red-500 font-bold">Asks</h2>
          <div className="h-[200px] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Price</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataOrderApiLoading ? (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <div className="h-[120px] flex items-center justify-center">
                        <PropagateLoader color={primaryColor} />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  dataOrderAsksApi.map((ask, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium text-red-500">
                        {Number(ask[0]).toFixed(2)}
                      </TableCell>
                      <TableCell>{ask[1]}</TableCell>
                      <TableCell className="text-right">
                        {(Number(ask[0]) * Number(ask[1])).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <h2 className="text-green-500 font-bold">Bids</h2>
          <div className="h-[200px] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Price</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataOrderApiLoading ? (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <div className="h-[120px] flex items-center justify-center">
                        <PropagateLoader color={primaryColor} />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  dataOrderBidsApi.map((ask, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium text-green-500">
                        {Number(ask[0]).toFixed(2)}
                      </TableCell>
                      <TableCell>{ask[1]}</TableCell>
                      <TableCell className="text-right">
                        {(Number(ask[0]) * Number(ask[1])).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </>
      </CardContent>
    </Card>
  );
}
