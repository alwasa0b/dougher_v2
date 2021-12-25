export const isNumberOrEmpty = /^(?:[1-9]\d*)$|^$/;

export function generateUUID(): string {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
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

export interface UserIngredient {
  name: string;
  ingredients: IngredientDictionary;
}

export enum IngredientType {
  Water = "Water",
  Flour = "Flour",
  Starter = "Starter",
  Salt = "Salt",
  Sugar = "Sugar",
  Misc = "Misc",
}

export const initialIngredientState: Ingredient = {
  id: generateUUID(),
  new: true,
  type: IngredientType.Flour,
  amount: 0,
};

const initialState: IngredientDictionary = {
  [initialIngredientState.id]: { ...initialIngredientState, new: false },
};

export const initialUserIngredient: UserIngredient[] = [
  { name: "Default", ingredients: initialState },
];

export default initialState;
