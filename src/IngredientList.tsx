import TextField from "@mui/material/TextField";
import { InputAdornment, MenuItem, Select } from "@mui/material";
import initialState, {
  Ingredient,
  IngredientDictionary,
  IngredientType,
} from "./initialState";
import IngredientComponent from "./Ingredient";
import { useState } from "react";
import { Box } from "@mui/system";

export default function IngredientList(): JSX.Element {
  const [ingredients, setIngredient] = useState(initialState);

  const handleChange = (name: string) => (ingredient: Ingredient) => {
    setIngredient({ ...ingredients, [name]: ingredient });
  };

  return (
    <div>
      {Object.keys(ingredients).map((element: string) => (
        <IngredientComponent
          key={element}
          ingredient={ingredients[element]}
          onChange={handleChange(element)}
          edit={false}
        />
      ))}
    </div>
  );
}
