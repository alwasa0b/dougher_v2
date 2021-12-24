import TextField from "@mui/material/TextField";
import { InputAdornment, MenuItem, Select } from "@mui/material";
import { Ingredient, IngredientType } from "./initialState";

interface IngredientPros {
  ingredient: Ingredient;
  edit: boolean;
  onChange: (ingredient: Ingredient) => void;
}

const isNumberOrEmpty = /^(?:[1-9]\d*)$|^$/;

export default function IngredientComponent({
  ingredient,
  edit,
  onChange,
}: IngredientPros): JSX.Element {
  return edit ? (
    <TextField
      label="Name"
      fullWidth
      variant="outlined"
      onChange={({ target }) => {
        onChange({
          ...ingredient,
          name: target.value,
        });
      }}
      value={ingredient.name || ""}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Select
              variant="standard"
              value={ingredient.type}
              label="Age"
              onChange={({ target }) =>
                onChange({
                  ...ingredient,
                  type: target.value as IngredientType,
                })
              }
            >
              <MenuItem value={IngredientType.Dry}>Dry</MenuItem>
              <MenuItem value={IngredientType.Wet}>Wet</MenuItem>
              <MenuItem value={IngredientType.Misc}>Misc.</MenuItem>
            </Select>
          </InputAdornment>
        ),
      }}
    />
  ) : (
    <TextField
      fullWidth
      label={ingredient.name}
      variant="outlined"
      onChange={({ target }) => {
        if (isNumberOrEmpty.test(target.value)) {
          const value = target.value ? Number(target.value) : undefined;

          onChange({
            ...ingredient,
            amount: value,
          });
        }
      }}
      value={ingredient.amount || ""}
    />
  );
}
