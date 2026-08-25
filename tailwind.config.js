/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F6F5F1",
        paperDark: "#EDEBE3",
        ink: "#1B2430",
        inkSoft: "#4A5568",
        teal: {
          DEFAULT: "#0E6E5C",
          dark: "#0A5346",
          light: "#E4F1EE"
        },
        amber: {
          DEFAULT: "#B5722A",
          light: "#F6E9DA"
        },
        brick: {
          DEFAULT: "#A23B3B",
          light: "#F5E4E4"
        },
        line: "#D8D5CC"
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "ui-monospace", "monospace"]
      },
      borderRadius: {
        card: "14px"
      }
    }
  },
  plugins: []
};
