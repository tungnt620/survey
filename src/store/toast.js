import { signal } from "@preact/signals";

export const toastStore = signal({
  message: "",
  type: "",
});
