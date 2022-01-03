import { writable } from 'svelte/store';

export const betaseries_token = writable(localStorage.getItem("betaseries_token"));