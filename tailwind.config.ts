import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { royal: "#1d4ed8", navy: "#0b1b4d", aqua: "#7fe7ee" },
      fontFamily: { sans: ["Montserrat", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
export default config;
