import { METHODS } from "./restClient";
import { client } from "./restClient";
import {
  UPLOAD_DOCUMENTS,
  DOCUMENT_STATUS,
  ASK_QUESTION,
} from "./urls";


export const uploadFilesToServer = async (files: FileList | null) => {
  if (!files) return;
  const formData = new FormData();
  Array.from(files).forEach((file) => formData.append("files", file));
  const response = await client.API(METHODS.POST, UPLOAD_DOCUMENTS, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export const fetchDocumentStatus = async () => {
  const response = await client.API(METHODS.GET, DOCUMENT_STATUS ,{});
  return response.data;
}

export const askQuestionFromDocument = async (question: string, language: string) => {
  if (!question) return;
  const response = await client.API(METHODS.POST, ASK_QUESTION, {
    language,
    question,
  });
  return response.data;
}

