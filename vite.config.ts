import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import md from "./plugins/vite-plugin-md"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), vueJsx(), md()],
});
