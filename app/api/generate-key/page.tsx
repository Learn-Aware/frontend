"use client";

import React, { useState } from "react";
import { Card } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Key } from "lucide-react";

const GenerateKey = () => {
  const [apiKey, setApiKey] = useState("Your-API-Key-Will-Appear-Here");

  const generateApiKey = async () => {
    try {
      const response = await fetch("/api/generate-api-key", {
        method: "POST",
      });
      const data = await response.json();
      if (response.ok) {
        setApiKey(data.apiKey);
      } else {
        console.error("Error generating API key:", data.message);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="p-6 w-full max-w-md text-center shadow-lg rounded-2xl">
        <h2 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2">
          <Key size={20} /> Generate API Key
        </h2>
        <p className="mb-4 text-gray-600 break-all border p-2 rounded bg-gray-100">
          {apiKey}
        </p>
        <Button onClick={generateApiKey} className="w-full">
          Generate New API Key
        </Button>
      </Card>
    </div>
  );
};

export default GenerateKey;
