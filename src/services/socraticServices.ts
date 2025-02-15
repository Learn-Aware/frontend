/* eslint-disable @typescript-eslint/no-explicit-any */
import { METHODS } from "./restClient";
import { client } from "./restClient";
import { AGENT_CHAT } from "./urls";

export const agentChat = async (body: any) => {
  // Ensure user_request is present
  if (!body.user_request || typeof body.user_request !== "string") {
    throw new Error("user_request is required and should be a text string.");
  }

  const formData = new FormData();
  formData.append("user_request", body.user_request);
  formData.append("session_id", body.session_id);

  // If an image is provided, append it to the form data
  if (body.image) {
    formData.append("image", body.image);
  }

  const response = await client.API(METHODS.POST, AGENT_CHAT, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
