import baseApi from ".";
import type { IUser } from "../utils/types";

export interface SetUserRolePayload {
  userId: number;
  role: "admin" | "user";
}

export async function listUsers(): Promise<IUser[]> {
    return await baseApi.get("/users")
}

export async function setUserRole({userId,role}: SetUserRolePayload): Promise<IUser> {
    return await baseApi.put(`/set-role?id=${userId}`, {role})
}

export async function createUser(body: IUser): Promise<IUser> {
    return await baseApi.post("/user", body)
}