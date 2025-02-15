"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Card, CardContent } from "@/src/components/ui/card";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/src/components/ui/select";
import {
  askQuestionFromDocument,
  uploadFilesToServer,
} from "@/src/services/cagServices";
import { ScrollArea } from "@/src/components/ui/scroll-area";

const DocumentAI = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [isChatAgentLoading, setIsChatAgentLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [responses, setResponses] = useState<
    { question: string; response: string }[]
  >([]);
  const [language, setLanguage] = useState("en");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(event.target.files);
  };

  const uploadFiles = async () => {
    if (!files) return;
    setLoading(true);
    try {
      await uploadFilesToServer(files);
    } catch (error) {
      console.error("Upload error", error);
    } finally {
      setLoading(false);
    }
  };

  const askQuestion = async () => {
    if (!question) return;
    setIsChatAgentLoading(true);
    try {
      const res = await askQuestionFromDocument(question, language);
      setResponses((prev) => [...prev, { question, response: res?.response }]);
      setQuestion("");
    } catch (error) {
      console.error("Error asking question", error);
    } finally {
      setIsChatAgentLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      {/* File Upload Section */}
      <Card className="mb-4">
        <CardContent className="p-4 space-y-4">
          <Label>Upload Documents</Label>
          <div className="flex items-center space-x-4">
            <Input
              type="file"
              multiple
              accept="application/pdf"
              onChange={handleFileChange}
            />
            <Button onClick={uploadFiles} disabled={loading}>
              {loading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <div className="flex flex-col flex-grow bg-white rounded-lg shadow-lg p-4">
        <ScrollArea className="flex-grow overflow-y-auto space-y-4 p-2">
          {responses.map((entry, index) => (
            <div key={index} className="bg-gray-200 p-3 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>You:</strong> {entry.question}
              </p>
              <p className="text-sm text-gray-900">
                <strong>AI:</strong> {entry.response}
              </p>
            </div>
          ))}
        </ScrollArea>

        {/* Input Section */}
        <div className="border-t pt-4 mt-2 flex items-center space-x-2">
          <Select
            value={language}
            onValueChange={(value) => setLanguage(value)}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
            </SelectContent>
          </Select>
          <Textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question..."
            className="flex-grow"
          />
          <Button onClick={askQuestion} disabled={isChatAgentLoading}>
            {isChatAgentLoading ? "Thinking..." : "Send"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentAI;
