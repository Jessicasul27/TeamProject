import adapter from "@sveltejs/adapter-node";
// import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: { adapter: adapter() },
	// preprocess: vitePreprocess(),
	vitePlugin: {
		dynamicCompileOptions: ({ filename }) => (filename.includes("node_modules") ? undefined : { runes: true }),
	},
};

export default config;
