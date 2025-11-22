"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [stock, setStock] = useState("");

  const handleSearch = () => {
    console.log("Searching for stock:", stock);
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
          />
        </div>
        <Button onClick={handleSearch}>Search Stock</Button>
      </main>
    </div>
  );
}
