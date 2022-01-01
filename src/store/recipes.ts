import { GetState } from "zustand";
import { initialState } from "./init";
import { IngredientType, MyState, UserRecipe } from "./types";
import { generateUUID } from "./utils";

export const initialUserRecipes = (): UserRecipe[] => {
  const id1 = generateUUID();
  const id2 = generateUUID();
  const id3 = generateUUID();
  const id4 = generateUUID();

  return [
    { name: "Create New", recipe: initialState() },
    {
      name: "Sourdough",
      recipe: {
        [id1]: {
          id: id1,
          new: false,
          type: IngredientType.Starter,
          amount: 600,
        },
        [id2]: {
          id: id2,
          new: false,
          type: IngredientType.Water,
          amount: 300,
        },
        [id3]: {
          id: id3,
          new: false,
          type: IngredientType.Flour,
          amount: 365,
        },
        [id4]: {
          id: id4,
          new: false,
          type: IngredientType.Salt,
          amount: 13,
        },
      },
    },
  ];
};

export const createRecipes = (
  set: (fn: (partial: MyState) => void) => void,
  get: GetState<MyState>
) => ({
  recipes: initialUserRecipes(),
  save: () => {
    set((prev: MyState) => {
      const state = get();
      const recipe = state.recipe;

      if (state.index === 0) {
        const name = state.name;

        const index = prev.recipes.push({ name, recipe });
        prev.index = index - 1;
      } else {
        prev.recipes[state.index].recipe = recipe;
      }
    });
  },
  delete: () => {
    set((prev: MyState) => {});
  },
});
