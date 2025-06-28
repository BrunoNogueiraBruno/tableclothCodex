import type { MutationFunction } from "@tanstack/react-query";
import baseApi from ".";
import type { IRecipe, IRecipePayload } from "../utils/types";

export async function listRecipes() {
    const res = await baseApi.get("/recipe")
    return res.data
}

export const createRecipe: MutationFunction<IRecipe,IRecipePayload> = async (body) => {
  return await baseApi.post("/recipe", body);
}

export const editRecipe: MutationFunction<IRecipe,IRecipe> = async ({title, ingredients, instructions, category, id}) => {
  const res = await baseApi.put(`/recipe/${id}`, {title, ingredients, instructions, category})
  return res.data
}

export const deleteRecipe: MutationFunction<IRecipe,{id:number}> = async ({id}) => {
  const res = await baseApi.delete(`/recipe/${id}`)
  return res.data
}