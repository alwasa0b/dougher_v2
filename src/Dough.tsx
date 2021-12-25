import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Ingredient,
  IngredientDictionary,
  IngredientType,
} from "./initialState";

interface props {
  ingredients: IngredientDictionary;
}

const calculate = (ingredientList: Ingredient[], type: IngredientType) =>
  ingredientList.reduce((p, n) => {
    if (n.type === type) {
      const amount = Number(n.amount);
      p += amount;
    }

    return p;
  }, 0);

const useCalculator = (ingredients: IngredientDictionary) => {
  const ingredientList = Object.keys(ingredients).map((f) => ingredients[f]);

  const starter = Number(
    (calculate(ingredientList, IngredientType.Starter) / 2).toFixed(2)
  );
  const water = calculate(ingredientList, IngredientType.Water) + starter;
  const flour = calculate(ingredientList, IngredientType.Flour) + starter;
  const sugar = calculate(ingredientList, IngredientType.Sugar);
  const salt = calculate(ingredientList, IngredientType.Salt);
  const hydrationValue = (water / flour) * 100;
  const hydration = hydrationValue ? hydrationValue.toFixed(2) : "";

  //{(((water / flour) * 100) || 0).toFixed(2)}

  return { hydration, water, flour, starter, sugar, salt };
};

export default function Dough({ ingredients }: props) {
  const { hydration, water, flour, salt, sugar } = useCalculator(ingredients);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography color="text.secondary" gutterBottom>
          Hydration: {hydration}%
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Water: {water || ""}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Flour: {flour || ""}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Salt: {salt}
          {Math.abs(salt - flour * 0.02) > 0.5
            ? ` Recommended: ${(flour * 0.02).toFixed(1)}`
            : ""}
        </Typography>
        {!!sugar && (
          <Typography color="text.secondary" gutterBottom>
            Sugar: {sugar}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
