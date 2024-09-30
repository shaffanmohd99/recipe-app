import axios from "@/lib/axios";
import { AxiosResponse } from "axios";

interface Recipe {
  id: number;
  title: string;
  servings: string;
  readyInMinutes: string;
  image: string;
  dishTypes: string[];
}

interface RecipeResponse {
  recipes: Recipe[];
}
interface RecipeSearchResponse {
  results: Recipe[];
}
export const getRandomRecipe = async (
  limit: number
): Promise<RecipeResponse> => {
  const response: AxiosResponse<RecipeResponse> =
    // await axios.get<RecipeResponse>(`/recipes/random?number=${limit}`);
    await axios.get<RecipeResponse>(`/recipe?limit=${limit}`);
  return response.data;
};
export const getSearchRecipe = async (
  search: string
): Promise<RecipeSearchResponse> => {
  const response: AxiosResponse<RecipeSearchResponse> =
    await axios.get<RecipeSearchResponse>(`/search-recipe?search=${search}`);
  return response.data;
};
