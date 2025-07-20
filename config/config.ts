import { defineConfig } from "umi";
import routes from "../src/routes";

export default defineConfig({
    routes: routes,
    npmClient: "pnpm",
    plugins: ["umi-natur"],
    natur: {
        useImmer: true,
    },
    mfsu: false,
});
