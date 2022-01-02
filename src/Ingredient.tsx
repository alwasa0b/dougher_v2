import {
  TextField,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";

import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import useStore from "./store";
import { isNumberOrEmpty } from "./store/utils";
import { IngredientType } from "./store/types";

interface IngredientPros {
  id: string;
  showAdd: boolean;
}

export default function Ingredient({
  id,
  showAdd,
}: IngredientPros): JSX.Element {
  const edit = useStore((state) => state.recipe[id]);
  const setAmount = useStore((state) => state.setAmount);
  const setType = useStore((state) => state.setType);
  const addIngredient = useStore((state) => state.addIngredient);
  const deleteIngredient = useStore((state) => state.deleteIngredient(id));

  return (
    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
      <TextField
        label={`${edit.type} Amount`}
        fullWidth
        variant="outlined"
        onChange={({ target }) => {
          if (isNumberOrEmpty.test(target.value)) {
            const value = target.value ? Number(target.value) : undefined;

            setAmount(id, value);
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
                  setType(id, target.value as IngredientType)
                }
              >
                {Object.keys(IngredientType).map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </Select>
            </InputAdornment>
          ),
        }}
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
