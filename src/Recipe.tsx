import { Stack } from "@mui/material";
import AddIngredient from "./AddIngredient";
import useStore from "./store";
import { Ingredient } from "./store/types";

export default function Recipe(): JSX.Element {
  const recipe = useStore((state) =>
    Object.keys(state.recipe).map((o) => state.recipe[o])
  );

  return (
    <Stack direction={"column"}>
      {recipe.map((element: Ingredient, index: number) => (
        <AddIngredient
          showAdd={index === recipe.length - 1}
          key={element.id}
          id={element.id}
        />
      ))}
    </Stack>
  );
}
