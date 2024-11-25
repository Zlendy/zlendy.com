// TODO: Emojis store

import { writable } from 'svelte/store';

export const fediverseEmojis = writable<Record<string, string>>({});
