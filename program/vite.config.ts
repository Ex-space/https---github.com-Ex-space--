import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // css: {
  //   preprocessorOptions: {
  //     less: {
  //       modifyVars: {
  //         hack: `true; @import (reference) "${path.resolve(
  //           "src/assets/css/base.less"
  //         )}";`,
  //       },
  //       javascriptEnabled: true,
  //     },
  //   },
  // },
});
