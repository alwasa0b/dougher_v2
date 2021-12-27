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

import {
  IngredientDictionary,
  initialUserIngredient,
  UserIngredient,
} from "./initialState";

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

const stored =
  (window.localStorage.getItem("dougher") &&
    JSON.parse(window.localStorage.getItem("dougher") || "")) ||
  initState;

const selectedStored =
  (window.localStorage.getItem("selected") &&
    JSON.parse(window.localStorage.getItem("selected") || "")) ||
  0;

const useSetStorage = (): any => {
  const [ingredientList, setIngredientList] = useState(stored);

  const setStorage = (value: UserIngredient[]) => {
    window.localStorage.setItem("dougher", JSON.stringify(value));
    setIngredientList(value);
  };
  return [ingredientList, setStorage];
};


const useSetSelected = (): any => {
  const [selected, setSelected] = useState(selectedStored);


  const setStorage = (value: number) => {
    window.localStorage.setItem("selected", JSON.stringify(value));
    setSelected(value);
  };

  return [selected, setStorage];
};

function App() {
  const [selected, setSelected] = useSetSelected();

  const [ingredientList, setIngredientList] = useSetStorage();

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
        <DoughSelector
          selected={selected}
          setSelected={setSelected}
          setIngredient={setIngredient}
          ingredientList={ingredientList}
          setIngredientList={setIngredientList}
          ingredients={ingredients}
        />
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

interface MainProps {
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  setIngredient: React.Dispatch<React.SetStateAction<IngredientDictionary>>;
  ingredientList: UserIngredient[];
  setIngredientList: React.Dispatch<React.SetStateAction<UserIngredient[]>>;
  ingredients: IngredientDictionary;
}

interface MainPropsWithRender extends MainProps {
  renderSelector: () => JSX.Element;
}

const DoughSelector = ({
  selected,
  setSelected,
  setIngredient,
  ingredientList,
  setIngredientList,
  ingredients,
}: MainProps): JSX.Element => {
  const newLocal = () => (
    <Select
      fullWidth
      variant="standard"
      value={selected}
      label="Age"
      onChange={({ target }) => {
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
  );
  return selected !== 0 ? (
    <OldDoughSelector
      renderSelector={newLocal}
      setIngredientList={setIngredientList}
      ingredientList={ingredientList}
      ingredients={ingredients}
      selected={selected}
      setSelected={setSelected}
      setIngredient={setIngredient}
    />
  ) : (
    <NewDoughSelector
      selected={selected}
      renderSelector={() => (
        <Select
          fullWidth
          variant="standard"
          value={selected}
          label="Age"
          onChange={({ target }) => {
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
      ingredientList={ingredientList}
      setIngredientList={setIngredientList}
      ingredients={ingredients}
      setSelected={setSelected}
      setIngredient={setIngredient}
    />
  );
};

const OldDoughSelector = ({
  renderSelector,
  setIngredientList,
  ingredientList,
  ingredients,
  selected,
  setIngredient,
}: MainPropsWithRender): JSX.Element => {
  return (
    <Stack direction={"row"} spacing={2}>
      {renderSelector()}
      <Box>
        <Stack direction={"row"} sx={{ mt: 1 }}>
          <IconButton
            size="small"
            onClick={() => {
              setIngredientList(
                ingredientList.map((g, i) =>
                  i === selected ? { ...g, ingredients } : g
                )
              );
            }}
          >
            <SaveIcon />
          </IconButton>

          <IconButton
            size="small"
            onClick={() => {
              setIngredient(ingredientList[selected].ingredients);
            }}
          >
            <CancelIcon />
          </IconButton>
        </Stack>
      </Box>
    </Stack>
  );
};

const NewDoughSelector = ({
  renderSelector,
  ingredientList,
  setIngredientList,
  ingredients,
  setSelected,
  setIngredient,
}: MainPropsWithRender): JSX.Element => {
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");

  return (
    <Stack direction={"row"} spacing={2} sx={{ mb: 20 }}>
      {saving && (
        <TextField
          onChange={({ target }) => setName(target.value)}
          focused={true}
        />
      )}
      {!saving && renderSelector()}
      <Box>
        <Stack direction={"row"} sx={{ mt: 1 }}>
          {saving && (
            <IconButton
              size="small"
              onClick={() => {
                setSaving(false);
                const newIndex = ingredientList.length;

                setIngredientList([...ingredientList, { name, ingredients }]);

                setSelected(newIndex);
              }}
            >
              <CheckIcon />
            </IconButton>
          )}
          {!saving && (
            <IconButton
              size="small"
              onClick={() => {
                setSaving(true);
              }}
            >
              <SaveIcon />
            </IconButton>
          )}

          <IconButton
            size="small"
            onClick={() => {
              setSaving(false);
              setIngredient(ingredientList[0].ingredients);
            }}
          >
            <CancelIcon />
          </IconButton>
        </Stack>
      </Box>
    </Stack>
  );
};
