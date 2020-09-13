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

export function isFull(slots) {
  return (
    slots.reduce((acc, current) => {
      return acc + current.filter((slot) => slot.player).length;
    }, 0) >= 11
  );
}

export function rowsWithPlayers(slots) {
  return slots.filter((row) => row.some((slot) => slot.player)).length;
}

export function rowHasPlayers(row) {
  return row.some((slot) => slot.player);
}

export const slots = createSlotStore();
