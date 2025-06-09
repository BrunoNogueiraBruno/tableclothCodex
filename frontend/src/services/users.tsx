import type { MutationFunction } from "@tanstack/react-query";
import baseApi from ".";
import type { IUser, TNewUserForm } from "../utils/types";

export interface SetUserRolePayload {
  userId: number;
  role: "admin" | "user";
}

export async function listUsers() {
    return await baseApi.get("/users")
}

export async function setUserRole({userId,role}: SetUserRolePayload): Promise<IUser> {
    return await baseApi.put(`/users/set-role?id=${userId}`, {role})
}

export const createUser: MutationFunction<IUser,TNewUserForm> = async (body) => {
  return await baseApi.post("/users", body);
};

export async function deleteUser(userId: number) {
    return await baseApi.delete(`/users?id=${userId}`)
}

export async function deleteOwnUser() {
    return await baseApi.delete(`/users/me`)
}