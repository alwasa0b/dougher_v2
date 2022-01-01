import { GetState } from "zustand";
import { initialIngredientState, initialState } from "./init";
import { IngredientType, MyState } from "./types";

export const createRecipe = (
  set: (fn: (partial: MyState) => void) => void,
  get: GetState<MyState>
) => ({
  recipe: initialState(),
  name: "",
  setAmount: (id: string, amount?: number) => {
    set((prev: MyState) => {
      prev.recipe[id].amount = amount;
    });
  },
  setType: (id: string, type: IngredientType) => {
    set((prev: MyState) => {
      prev.recipe[id].type = type;
    });
  },
  setName: (name: string) => {
    set((prev: MyState) => {
      prev.name = name;
    });
  },
  addIngredient: () => {
    set((prev: MyState) => {
      const init = initialIngredientState();
      prev.recipe[init.id] = init;
    });
  },
  deleteIngredient: (id: string) => () => {
    set((prev: MyState) => {
      delete prev.recipe[id];
    });
  },
});
