import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#121416",
        coal: "#1F2223",
        graphite: "#343839",
        steel: "#7A8285",
        zinc: "#C8CDD0",
        concrete: "#D8D5CE",
        plaster: "#F4F2EC",
        oak: "#A87545",
        rust: "#B8542D"
      },
      fontFamily: {
        sans: ["Inter", "Avenir Next", "Helvetica Neue", "Arial", "sans-serif"],
        display: ["Cormorant Garamond", "Optima", "Georgia", "serif"]
      },
      boxShadow: {
        architectural: "0 24px 70px rgba(18, 20, 22, 0.12)",
        "architectural-lg": "0 40px 100px rgba(18, 20, 22, 0.18)",
        "soft-line": "inset 0 1px 0 rgba(255,255,255,0.08)",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: {
        400: "400ms",
        600: "600ms",
        800: "800ms",
      },
      opacity: {
        "8": "0.08",
        "12": "0.12",
        "15": "0.15",
        "35": "0.35",
        "45": "0.45",
        "55": "0.55",
        "58": "0.58",
        "62": "0.62",
        "65": "0.65",
        "68": "0.68",
        "78": "0.78",
      }
    }
  },
  plugins: []
};

export default config;