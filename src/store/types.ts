export enum IngredientType {
  Water = "Water",
  Flour = "Flour",
  Starter = "Starter",
  Salt = "Salt",
  Sugar = "Sugar",
  Oil = "Oil",
  Misc = "Misc",
}

export interface Ingredient {
  id: string;
  new: boolean;
  amount?: number;
  type: IngredientType;
}

export interface IngredientDictionary {
  [Key: string]: Ingredient;
}

export interface UserRecipe {
  name: string;
  recipe: IngredientDictionary;
}

export interface SelectedStore {
  index: number;
  select: (index: number) => void;
  cancel: () => void;
}

export interface RecipesStore {
  recipes: UserRecipe[];
  save: () => void;
  delete: () => void;
}

export interface RecipeStore {
  recipe: IngredientDictionary;
  name: string;
  setAmount: (id: string, amount?: number) => void;
  setType: (id: string, type: IngredientType) => void;
  setName: (name: string) => void;
  addIngredient: () => void;
  deleteIngredient: (id: string) => () => void;
}

export type MyState = SelectedStore & RecipeStore & RecipesStore;
