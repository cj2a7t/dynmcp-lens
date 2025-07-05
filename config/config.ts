import routes from '../src/routes';
import { defineConfig } from "umi";

export default defineConfig({
    routes: routes,
    npmClient: 'pnpm',
    plugins: [
        'umi-natur',
    ],
    natur: {
        useImmer: true
    },
    mfsu: false,
});
