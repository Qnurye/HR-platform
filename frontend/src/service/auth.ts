import {post} from "@/service/api";
import {User} from "@/service/schema/user";

export interface SignInResponse {
  token: string;
  expires_at: string;
}

export const signIn = async (username: string, password: string): Promise<SignInResponse> => {
  return await post<SignInResponse>('/auth/login', {username, password} as never);
};

export const signOut = async (): Promise<void> => {
  return await post<void>('/auth/logout', {} as never);
}

export const getCurrentUser = async (): Promise<User> => {
  return await post<User>('/auth/me', {} as never);
}
