import { writable } from "svelte/store";

export const activeDrag = writable(false);

function createSlotStore() {
  const slots = new Array(6).fill(null).map(() =>
    new Array(5).fill({
      player: null,
      hover: false,
    })
  );
  const { subscribe, set } = writable(slots);

  return {
    subscribe,
    updateSlot(i, j, data) {
      slots[i][j] = { ...slots[i][j], ...data };
      set(slots);
    },
  };
}

export const slots = createSlotStore();
