export type IUser = {
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  role: "user";
  username: string;
}

export type IAuthDataResponse = {
  authenticated: boolean,
  user: IUser
}