import { useState } from "react";

import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

import {
  Box,
  createTheme,
  CssBaseline,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";

import { initialUserIngredient } from "./initialState";

import IngredientList from "./IngredientList";
import Dough from "./Dough";
import CheckIcon from "@mui/icons-material/Check";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontSize: 18,
  },
});

const initState = initialUserIngredient();

function App() {
  const [selected, setSelected] = useState(0);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");


  const [ingredientList, setIngredientList] = useState(initState);

  const [ingredients, setIngredient] = useState(
    ingredientList[selected].ingredients
  );


  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          "& > :not(style)": { m: 1, display: "flex", maxWidth: "450px" },
        }}
      >
        <Typography variant="h6" component="h6">
          Dough Calculator
        </Typography>
        <Stack direction={"row"} spacing={2}>
          {selected === 0 && saving && (
            <TextField onChange={({ target }) => setName(target.value)} />
          )}
          {(selected !== 0 || !saving) && (
            <Select
              fullWidth
              variant="standard"
              value={selected}
              label="Age"
              onChange={({ target }) => {
                setName(ingredientList[Number(target.value)].name);
                setSelected(Number(target.value));
                setIngredient(ingredientList[Number(target.value)].ingredients);
              }}
            >
              {ingredientList.map((i, index) => (
                <MenuItem key={i.name} value={index}>
                  {i.name}
                </MenuItem>
              ))}
            </Select>
          )}
          {saving && (
            <IconButton
              size="medium"
              onClick={() => {
                setSaving(false);
                const newIndex = ingredientList.length;
                
                setIngredientList(
                  selected !== 0
                    ? ingredientList.map((g, i) =>
                        i === selected ? { ...g, ingredients } : g
                      )
                    : [...ingredientList, { name, ingredients }]
                );

                if(selected === 0){
                  setSelected(newIndex)
                }
              }}
            >
              <CheckIcon />
            </IconButton>
          )}
          {!saving && (
            <IconButton
              size="medium"
              onClick={() => {
                setSaving(true);
              }}
            >
              <SaveIcon />
            </IconButton>
          )}

          <IconButton
            size="medium"
            onClick={() => {
              setSaving(false);
              setIngredient(ingredientList[selected].ingredients);
            }}
          >
            <CancelIcon />
          </IconButton>
        </Stack>
        <IngredientList
          ingredients={ingredients}
          setIngredient={setIngredient}
        />
        <Dough ingredients={ingredients} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
