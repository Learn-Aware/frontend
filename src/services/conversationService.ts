import { IConversationRequest } from "@/app/student/chat/page";
import { METHODS } from "./restClient";
import { client } from "./restClient";
import {
  GET_CONVERSATIONS,
  GET_SESSION_IDS_BY_EMAIL,
  GET_MESSAGES_BY_SESSION_ID,
  DELETE_CONVERSATION,
  SAVE_CONVERSATIONS,
  UPDATE_CONVERSATION,
} from "./urls";

export const getConversations = async () => {
  const response = await client.API(METHODS.GET, GET_CONVERSATIONS, {});
  return response.data;
};

export const getSessionIdsByEmail = async (email: string) => {
  const response = await client.API(
    METHODS.GET,
    GET_SESSION_IDS_BY_EMAIL + email,
    {}
  );
  return response.data;
};

export const getMessagesBySessionId = async (
  email: string,
  sessionId: string
) => {
  const response = await client.API(
    METHODS.GET,
    GET_MESSAGES_BY_SESSION_ID + email + "/" + sessionId,
    {}
  );
  return response.data;
};

export const deleteConversation = async (email: string, sessionId: string) => {
  const response = await client.API(
    METHODS.DELETE,
    DELETE_CONVERSATION + email + "/" + sessionId,
    {}
  );
  return response.data;
};

export const saveConversations = async (body: IConversationRequest) => {
  const response = await client.API(METHODS.POST, SAVE_CONVERSATIONS, body);
  return response.data;
};

export const updateConversation = async (
  email: string,
  sessionId: string,
  conversations: IConversationRequest
) => {
  const response = await client.API(
    METHODS.PUT,
    UPDATE_CONVERSATION + email + "/" + sessionId,
    conversations
  );
  return response.data;
};
