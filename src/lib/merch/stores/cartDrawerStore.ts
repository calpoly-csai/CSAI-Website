// manages the opening and closing of drawer
import { writable } from 'svelte/store';

export const isDrawerOpen = writable(false);

export function toggleDrawer() {
    isDrawerOpen.update(n => !n);
}

export function openDrawer() {
    isDrawerOpen.set(true);
}

export function closeDrawer() {
    isDrawerOpen.set(false);
}
