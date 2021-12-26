import initialState, {
  generateUUID,
  Ingredient,
  IngredientDictionary,
  initialIngredientState,
} from "./initialState";

import IngredientComponent from "./Ingredient";
import { useState } from "react";
import { Stack } from "@mui/material";
import AddIngredient from "./AddIngredient";

interface props {
  ingredients: IngredientDictionary;
  setIngredient: React.Dispatch<React.SetStateAction<IngredientDictionary>>;
}

export default function IngredientList({
  ingredients,
  setIngredient,
}: props): JSX.Element {
  const handleChange = (id: string) => (ingredient: Ingredient) => {
    setIngredient({ ...ingredients, [id]: ingredient });
  };

  return (
    <Stack direction={"column"} spacing={2}>
      {Object.keys(ingredients).map((element: string, index: number) =>
        ingredients[element].new ? (
          <AddIngredient
            key={element}
            ingredient={ingredients[element]}
            onSave={(ingredient) => {
              setIngredient({
                ...ingredients,
                [ingredient.id]: { ...ingredient, new: false },
              });
            }}
            onCancel={() =>
              setIngredient((state) => {
                const newState = { ...state };
                delete newState[element];
                return newState;
              })
            }
          />
        ) : (
          <IngredientComponent
            showAdd={index === Object.keys(ingredients).length - 1}
            key={element}
            ingredient={ingredients[element]}
            onChange={handleChange(element)}
            addIngredient={() => {
              const newIngredient = initialIngredientState;
              newIngredient.id = generateUUID();

              setIngredient({
                ...ingredients,
                [newIngredient.id]: newIngredient,
              });
            }}
            deleteIngredient={() => {
              const newIngredient = initialIngredientState;
              newIngredient.id = generateUUID();

              setIngredient((state) => {
                const newState = { ...state };
                delete newState[element];
                return newState;
              });
            }}
          />
        )
      )}
    </Stack>
  );
}
