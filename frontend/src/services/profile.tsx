import baseApi from ".";
import type { IProfile, IProfileRes } from "../utils/types";

export async function listProfile(): Promise<IProfileRes> {
  const response = await baseApi.get<IProfileRes>("/profile")
  return response.data as IProfileRes
}

export async function setProfile(payload: IProfile) {
  const response = await baseApi.post("/profile", {...payload, contact: JSON.stringify(payload.contact)})
  return response.data
}