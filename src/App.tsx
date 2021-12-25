import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import {
  Box,
  createTheme,
  CssBaseline,
  MenuItem,
  Select,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import initialState, {
  IngredientDictionary,
  initialUserIngredient,
} from "./initialState";
import IngredientList from "./IngredientList";
import Dough from "./Dough";

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
  const [ingredients, setIngredient] = useState(initState[0].ingredients);

  const [ingredientList, setIngredientList] = useState(initState);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          "& > :not(style)": { m: 1, display: "flex", maxWidth: "450px" },
        }}
      >
        <Stack direction={"row"} spacing={2}>
          <Typography variant="h6" component="h6">
            Dough Calculator
          </Typography>
          <Select
            variant="standard"
            value={selected}
            label="Age"
            onChange={({ target }) => {
              setSelected(Number(target.value));
              setIngredient(initState[Number(target.value)].ingredients);
            }}
          >
            {ingredientList.map((i, index) => (
              <MenuItem value={index}>{i.name}</MenuItem>
            ))}
          </Select>
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
