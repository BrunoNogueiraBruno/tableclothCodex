import type { MutationFunction } from "@tanstack/react-query";
import baseApi from ".";
import type { ICategory, TNewUserForm } from "../utils/types";

export async function listCategories() {
    const res = await baseApi.get("/categories")
    return res.data
}

export const createCategory: MutationFunction<ICategory,TNewUserForm> = async (body) => {
  return await baseApi.post("/categories", body);
}

export const editCategory: MutationFunction<ICategory,ICategory> = async ({name, id}) => {
  const res = await baseApi.put(`/categories/${id}`, {name})
  return res.data
}

export const deleteCategory: MutationFunction<ICategory,{id:number}> = async ({id}) => {
  const res = await baseApi.delete(`/categories/${id}`)
  return res.data
}