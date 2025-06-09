export type IUser = {
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  role: "user" | "admin";
  username: string;
}

export type IAuthDataResponse = {
  authenticated: boolean,
  user: IUser
}

export type TNewUserForm = {
  username: string,
  password: string,
  email: string,
  first_name: string,
  last_name: string,
  confirmPassword: string
}

export type NewUserFormErrors = Partial<TNewUserForm>