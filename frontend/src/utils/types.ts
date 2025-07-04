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

export type IProfileContact = {
  platform: string,
  name: string,
  url: string,
  id:string,
}

export type IProfile = {
  contact: IProfileContact[]
}

export type IProfileRes = {
  contact: string,
  id:number,
  user_id:number
}

export type ICategory = {
  name: string,
  id: number,
}

export type ICategoryPayload = {
  name: string,
}

export type IRecipe = {
  title: string,
  ingredients: string,
  instructions: string,
  category: number,
  user_id: number,
  id: number,
}

export type IRecipePayload = {
  title: string,
  ingredients: string,
  instructions: string,
  category: number,
  user_id: number,
}