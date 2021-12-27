import TextField from "@mui/material/TextField";

import {
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";

import { Ingredient, IngredientType, isNumberOrEmpty } from "./initialState";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
import { Box } from "@mui/system";

interface IngredientPros {
  ingredient: Ingredient;
  showAdd: boolean;
  onChange: (ingredient: Ingredient) => void;
  addIngredient: () => void;
  deleteIngredient: () => void;
}

export default function IngredientComponent({
  ingredient,
  onChange,
  showAdd,
  addIngredient,
  deleteIngredient,
}: IngredientPros): JSX.Element {
  return (
    <Stack direction={"row"} sx={{ mb: 2 }}>
      <TextField
        fullWidth
        label={ingredient.type}
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
      <Box sx={{ ml: 2, mt: 1 }}>
        <IconButton
          size="small"
          onClick={showAdd ? addIngredient : deleteIngredient}
        >
          {showAdd ? <AddIcon /> : <DeleteIcon />}
        </IconButton>
      </Box>
    </Stack>
  );
}
