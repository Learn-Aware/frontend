"use client";

import React, { useState } from "react";
import { Card, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Key, BarChart, Trash, Eye, EyeOff } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { DialogCloseButton } from "@/src/components/ui/customDialog";

const DashboardPage = () => {
  const MAX_API_KEYS = 3;
  const [apiKeys, setApiKeys] = useState([
    {
      key: "sk-1234567890abcdef",
      generatedAt: "2025-02-11 10:00 AM",
      usage: 400,
    },
  ]);
  const [apiUsage, setApiUsage] = useState({ used: 750, limit: 1000 });
  const [showApiKeys, setShowApiKeys] = useState<boolean[]>(
    new Array(apiKeys.length).fill(false)
  );

  const [keyToRevoke, setKeyToRevoke] = useState<string | null>(null);
  const [keyIndexToRevoke, setKeyIndexToRevoke] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isShowKeyGeneratedModal, setIsShowKeyGeneratedModal] = useState(false);
  const [isApiKeyGenerating, setIsApiKeyGenerating] = useState(false);
  const [isLimitDialogOpen, setIsLimitDialogOpen] = useState(false);

  const handleGenerateKey = async () => {
    if (apiKeys.length >= MAX_API_KEYS) {
      setIsLimitDialogOpen(true);
      return;
    }

    setIsApiKeyGenerating(true);
    setTimeout(() => {
      setApiKeys([
        ...apiKeys,
        {
          key: "sk-abcdef1234567890",
          generatedAt: new Date().toLocaleString(),
          usage: 0,
        },
      ]);
      setShowApiKeys([...showApiKeys, false]);
      setIsShowKeyGeneratedModal(true);
      setIsApiKeyGenerating(false);
    }, 1000);
  };

  const confirmRevokeKey = (key: string, index: number) => {
    setKeyToRevoke(key);
    setKeyIndexToRevoke(index);
    setIsDialogOpen(true);
  };

  const handleRevokeKey = () => {
    if (keyToRevoke !== null && keyIndexToRevoke !== null) {
      setApiKeys(apiKeys.filter((_, i) => i !== keyIndexToRevoke));
      setShowApiKeys(showApiKeys.filter((_, i) => i !== keyIndexToRevoke));
    }
    setIsDialogOpen(false);
  };

  const toggleShowApiKey = (index: number) => {
    const updatedShowApiKeys = [...showApiKeys];
    updatedShowApiKeys[index] = !updatedShowApiKeys[index];
    setShowApiKeys(updatedShowApiKeys);
  };

  return (
    <Card className="flex flex-col items-center justify-start min-h-screen p-4 gap-1">
      <CardTitle className="mt-10">LAAI Developer Console</CardTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mt-5">
        <Card className="p-6 text-center shadow-lg rounded-2xl">
          <h2 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2">
            <BarChart size={20} /> API Usage
          </h2>
          <p className="text-lg">
            {apiUsage.used} / {apiUsage.limit} requests used
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${(apiUsage.used / apiUsage.limit) * 100}%` }}
            ></div>
          </div>
        </Card>
        <Card className="p-6 text-center shadow-lg rounded-2xl">
          <h2 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2">
            <Key size={20} />
            Free API Key Count
          </h2>
          {apiKeys.length === MAX_API_KEYS ? (
            <Button
              variant="default"
              className="bg-[hsl(var(--laai-blue))] hover:bg-[hsl(var(--laai-blue-dark))] text-white transition-colors"
            >
              Upgrade to Pro
            </Button>
          ) : (
            <p className="text-lg">
              You have {MAX_API_KEYS - apiKeys.length}{" "}
              {MAX_API_KEYS - apiKeys.length === 1 ? "key" : "keys"} left
            </p>
          )}
          <p className="text-sm text-gray-500 mt-2">
            Maximum {MAX_API_KEYS} keys per free user
          </p>
        </Card>
      </div>
      <Card className="p-6 text-center shadow-lg rounded-2xl w-full max-w-4xl mt-5">
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2">
            <Key size={20} /> API Keys Available
          </h2>
          <DialogCloseButton
            handleGenerateKey={handleGenerateKey}
            isApiKeyGenerating={isApiKeyGenerating}
            isShowKeyGeneratedModal={isShowKeyGeneratedModal}
            setIsShowKeyGeneratedModal={setIsShowKeyGeneratedModal}
          />
        </div>
        <ul className="space-y-2">
          {apiKeys.map((item, index) => (
            <li
              key={index}
              className="text-lg break-all flex flex-col md:flex-row md:items-center md:justify-between p-4 border rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span>
                  {showApiKeys[index] ? item.key : "•".repeat(item.key.length)}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleShowApiKey(index)}
                >
                  {showApiKeys[index] ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </Button>
              </div>
              <div className="text-sm text-gray-500 mt-2 md:mt-0">
                Generated: {item.generatedAt}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700">
                  Usage: {item.usage} requests
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => confirmRevokeKey(item.key, index)}
              >
                <Trash size={16} />
              </Button>
            </li>
          ))}
        </ul>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm API Key Revocation</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to revoke this API key?</p>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRevokeKey}>
              Revoke
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isLimitDialogOpen} onOpenChange={setIsLimitDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>API Key Limit Reached</DialogTitle>
          </DialogHeader>
          <p>
            You have already reached the maximum of {MAX_API_KEYS} API keys.
            Please revoke an existing key to generate a new one.
          </p>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setIsLimitDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default DashboardPage;
