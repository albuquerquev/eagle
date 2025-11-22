"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: string;
  lastUpdated: string;
}

export default function Home() {
  const [stock, setStock] = useState("");
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!stock.trim()) {
      setError("Please enter a stock symbol");
      return;
    }

    setLoading(true);
    setError(null);
    setStockData(null);

    try {
      const response = await fetch(`/api/stock?symbol=${encodeURIComponent(stock)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch stock data");
      }

      setStockData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch stock data");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex flex-col gap-4 w-full max-w-md px-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="stock" className="text-sm font-medium">
            Stock
          </label>
          <Input
            id="stock"
            type="text"
            placeholder="Enter stock symbol"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search Stock"}
        </Button>

        {/* Display stock price */}
        {stockData && (
          <div className="mt-4 p-4 border rounded-lg bg-card">
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-bold">{stockData.symbol}</h3>
                <span className={`text-sm ${stockData.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stockData.change >= 0 ? '+' : ''}{stockData.change.toFixed(2)} ({stockData.changePercent})
                </span>
              </div>
              <div className="text-3xl font-bold">${stockData.price.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">
                Last updated: {stockData.lastUpdated}
              </div>
            </div>
          </div>
        )}

        {/* Display error */}
        {error && (
          <div className="mt-4 p-4 border border-red-300 rounded-lg bg-red-50 text-red-800">
            {error}
          </div>
        )}

        {/* Display loading state */}
        {loading && (
          <div className="mt-4 p-4 border rounded-lg bg-card text-center">
            <div className="animate-pulse">Loading stock data...</div>
          </div>
        )}
      </main>
    </div>
  );
}
