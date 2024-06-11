import { derived, writable, type Writable } from 'svelte/store';
import euros from "./data/groups.json";
import knockout from "./data/knockout.json"

type Toast = {
	id: number;
	message: string;
}

export const eurosGroups = writable(euros);
export const knockouts = writable(knockout);
export const thirdChosen = writable(0);

export const toasts: Writable<Toast[]> = writable([]);
export const finished = derived(
	knockouts,
	($knockouts) => $knockouts.find((game) => game.game === 1)?.winner,
);

export const addToast = (message: string) => {
	const id = Math.floor(Math.random() * 10000);

	toasts.update((all) => [{ id, message }, ...all]);
	setTimeout(() => dismissToast(id), 3000);
};

export const dismissToast = (id: number) => {
	toasts.update((all) => all.filter((t) => t.id !== id));
};
