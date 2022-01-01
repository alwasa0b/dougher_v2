import { Ingredient, IngredientDictionary, IngredientType } from "./types";
import { generateUUID } from "./utils";

export const initialIngredientState = (): Ingredient => ({
  id: generateUUID(),
  new: true,
  type: IngredientType.Water,
  amount: 0,
});

export const initialState = (): IngredientDictionary => {
  const init = initialIngredientState();
  init.new = false;
  return { [init.id]: init };
};
