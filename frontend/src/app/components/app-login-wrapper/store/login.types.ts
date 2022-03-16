export type loginPayloadType = { username: string; password: string };

export interface AuthResponseData {
  auth: boolean;
  token: string;
  username: string;
  user_full_name: string;
  user_email: string;
  user_role: string;
  expires_in: number;
  redirect?: boolean;
}
