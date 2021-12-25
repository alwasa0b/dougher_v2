import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import {
  Box,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import initialState, { IngredientDictionary } from "./initialState";
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


function App() {
  const [ingredients, setIngredient] = useState(initialState);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          "& > :not(style)": { m: 1, display: "flex", maxWidth: "450px" },
        }}
      >
        <Typography variant="h5" component="h5">
          Dough Calculator
        </Typography>
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
