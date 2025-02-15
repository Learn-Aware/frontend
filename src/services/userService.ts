import { METHODS } from "./restClient";
import { client } from "./restClient";
import { REGISTER_USER, GET_USERS, GET_USER_BY_EMAIL } from "./urls";

export interface IRegisterRequest {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
}

export const registerUser = async (body: IRegisterRequest) => {
  const response = await client.API(METHODS.POST, REGISTER_USER, body);
  return response.data;
};

export const getUsers = async () => {
  const response = await client.API(METHODS.GET, GET_USERS,{});
  return response.data;
};

export const getUserByEmail = async (email: string) => {
  const response = await client.API(METHODS.GET, GET_USER_BY_EMAIL + email,{});
  return response.data;
};