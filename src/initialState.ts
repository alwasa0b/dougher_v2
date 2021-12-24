export interface Ingredient {
  name: string;
  amount?: number;
  type: IngredientType;
}

export interface IngredientDictionary {
  [Key: string]: Ingredient;
}

export enum IngredientType {
  Dry,
  Wet,
  Misc,
}

const initialState: IngredientDictionary = {
  flour: {
    name: "flour",
    type: IngredientType.Dry,
    amount: 600,
  },
};

export default initialState;
