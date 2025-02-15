import { BASE_URL } from "../config";

export const SOCRATIC_TUTOR = BASE_URL + "socratic-tutor/api/socratic_tutor";
export const START_SESSION = BASE_URL + "socratic-tutor/start-session";
export const SUBMIT_ANSWER = BASE_URL + "socratic-tutor/submit-answer";
export const AGENT_CHAT = BASE_URL + "socratic-tutor/v2/chat";

export const UPLOAD_DOCUMENTS = BASE_URL + "cag/upload";
export const DOCUMENT_STATUS = BASE_URL + "cag/document-status";
export const ASK_QUESTION = BASE_URL + "cag/ask-question";

export const REGISTER_USER = BASE_URL + "auth/register";
export const GET_USERS = BASE_URL + "auth/users";
export const GET_USER_BY_EMAIL = BASE_URL + "auth/user/";

export const SAVE_CONVERSATIONS = BASE_URL + "conversations";
export const GET_CONVERSATIONS = BASE_URL + "conversations";
export const GET_SESSION_IDS_BY_EMAIL = BASE_URL + "conversations/";
export const GET_MESSAGES_BY_SESSION_ID = BASE_URL + "conversations/";
export const DELETE_CONVERSATION = BASE_URL + "conversations/";
export const UPDATE_CONVERSATION = BASE_URL + "conversations/";