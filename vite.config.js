import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';


// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@mui/styled-engine': path.resolve(
                // eslint-disable-next-line no-undef
                __dirname,
                './node_modules/@mui/styled-engine-sc'
            )
        }
    }
});
