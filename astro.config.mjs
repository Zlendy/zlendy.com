import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import icon from "astro-icon";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    icon(),
    vue(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
