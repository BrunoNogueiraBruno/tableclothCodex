import baseApi from "."
import type { IUser } from "../utils/types";

export interface Form {
  identifier: string;
  password: string;
}

export async function login(form: Form): Promise<IUser[]> {
    return await baseApi.post("/login", form)
}