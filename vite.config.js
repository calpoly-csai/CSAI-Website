import { sveltekit } from '@sveltejs/kit/vite';
import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';

/** @type {import('vite').UserConfig} */
const config = {
    preprocess: preprocess(),
    plugins: [sveltekit()],
    adapter: adapter()
};

export default config;
