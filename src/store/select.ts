import { GetState } from "zustand";
import { MyState } from "./types";

export const createSelected = (
  set: (fn: (partial: MyState) => void) => void,
  get: GetState<MyState>
) => ({
  index: 0,
  select: (index: number) => {
    set((prev) => {
      prev.index = index;
      prev.recipe = get().recipes[index].recipe;
    });
  },
  cancel: () => {
    set((prev) => {
      prev.recipe = get().recipes[get().index].recipe;
    });
  },
});
