import create, { GetState, SetState, StoreApi } from "zustand";
import { createRecipe } from "./recipe";
import { createRecipes } from "./recipes";
import { createSelected } from "./select";
import { MyState } from "./types";
import { produce } from "immer";
import { persist } from "zustand/middleware";

function immer(
  config: (
    set: (fn: (partial: MyState) => void) => void,
    get: GetState<MyState>,
    api: StoreApi<MyState>
  ) => MyState
) {
  return (
    set: SetState<MyState>,
    get: GetState<MyState>,
    api: StoreApi<MyState>
  ) => config((fn: any) => set(produce(fn)), get, api);
}

const useStore = create<MyState>(
  persist(
    immer((set, get) => ({
      ...createSelected(set, get),
      ...createRecipe(set, get),
      ...createRecipes(set, get),
    })),
    {
      name: "recipes-storage", // name of item in the storage (must be unique)
    }
  )
);

export default useStore;
