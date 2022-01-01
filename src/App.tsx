import {
  Box,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";

import Recipe from "./Recipe";
import Dough from "./Dough";
import DoughSelector from "./DoughSelector";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontSize: 18,
  },
});

function App() {
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
        <DoughSelector />
        <Recipe />
        <Dough />
      </Box>
    </ThemeProvider>
  );
}

export default App;
