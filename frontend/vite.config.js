import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    outDir: "../backend/dist/public",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "index.html"),
        login: path.resolve(__dirname, "login.html"),
        register: path.resolve(__dirname, "register.html"),
        user: path.resolve(__dirname, "user.html"),
        addPost: path.resolve(__dirname, "add-post.html"),
      },
      output: {
        entryFileNames: "[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
        chunkFileNames: "assets/[name]-[hash].js",
      },
    },
  },
});
