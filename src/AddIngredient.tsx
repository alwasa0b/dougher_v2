import TextField from "@mui/material/TextField";

import {
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";

import { Ingredient, IngredientType, isNumberOrEmpty } from "./initialState";

import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";

interface IngredientPros {
  ingredient: Ingredient;
  onSave: (ingredient: Ingredient) => void;
  onCancel: () => void;
}

export default function AddIngredient({
  ingredient,
  onSave,
  onCancel,
}: IngredientPros): JSX.Element {
  const [edit, setEdit] = useState<Ingredient>(ingredient);

  return (
    <Stack direction="row" spacing={2} sx={{ m: 2 }}>
      <TextField
        label={`${edit.type} Amount`}
        fullWidth
        variant="outlined"
        onChange={({ target }) => {
          if (isNumberOrEmpty.test(target.value)) {
            const value = target.value ? Number(target.value) : undefined;

            setEdit({
              ...edit,
              amount: value,
            });
          }
        }}
        value={edit.amount || ""}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Select
                variant="standard"
                value={edit.type}
                label="Age"
                onChange={({ target }) =>
                  setEdit({
                    ...edit,
                    type: target.value as IngredientType,
                  })
                }
              >
                <MenuItem value={IngredientType.Water}>Water</MenuItem>
                <MenuItem value={IngredientType.Flour}>Flour</MenuItem>
                <MenuItem value={IngredientType.Starter}>Starter</MenuItem>
                <MenuItem value={IngredientType.Salt}>Salt</MenuItem>
                <MenuItem value={IngredientType.Sugar}>Sugar</MenuItem>
                <MenuItem value={IngredientType.Misc}>Misc.</MenuItem>
              </Select>
            </InputAdornment>
          ),
        }}
      />

      <IconButton
        size="medium"
        onClick={() => {
          onSave(edit);
        }}
      >
        <SaveIcon />
      </IconButton>
      <IconButton size="medium" onClick={onCancel}>
        <CancelIcon />
      </IconButton>
    </Stack>
  );
}
