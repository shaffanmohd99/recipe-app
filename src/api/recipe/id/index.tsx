import axios from "@/lib/axios";
import { AxiosResponse } from "axios";

interface RecipeResponse {
  id: number;
  title: string;
  servings: string;
  readyInMinutes: string;
  image: string;
  dishTypes: string[];
  extendedIngredients: Ingredient[];
  analyzedInstructions: Instruction[];
  summary: string;
}
interface Ingredient {
  id: number;
  original: string;
}
interface Instruction {
  steps: Step[];
}
interface Step {
  number: number;
  step: string;
}

export const getOneRecipe = async (
  id: number | string
): Promise<RecipeResponse> => {
  const response: AxiosResponse<RecipeResponse> =
    await axios.get<RecipeResponse>(`/recipe/${id}`);
  return response.data;
};
