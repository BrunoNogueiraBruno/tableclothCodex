import baseApi from "."
import type { IUser } from "../utils/types";

export interface Form {
  identifier: string;
  password: string;
}

export async function login(form: Form): Promise<IUser[]> {
    return await baseApi.post("/auth/login", form)
}

export async function logut() {
    return await baseApi.post("/auth/logout")
}

export async function info() {
    return await baseApi.get("/auth/info")
}
