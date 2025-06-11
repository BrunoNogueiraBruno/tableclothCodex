import baseApi from ".";
import type { IProfile } from "../utils/types";

export async function listProfile() {
  return await baseApi.get("/profile")
}

export async function setProfile(payload: IProfile) {
  return await baseApi.post("/profile", {...payload, contact: JSON.stringify(payload.contact)})
}