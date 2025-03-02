import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // colors: {
      //   button: "#F6F7F9",
      //   navy: "#003159",
      //   orangeRed: "#CC3700",
      //   secondary: "#B6CDDF",
      //   redish: "#FF3B30",
      //   bluish: "#0D99FF",
      //   "bluish-light": "#EFF6FF",
      //   muted: "#595959",
      //   text: "#324054",
      // },
      screens: {
        "custom-sm": "500px", // smaller screen
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        header: "hsl(var(--header))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          700: "hsl(var(--primary-700))",
          500: "hsl(var(--primary-500))",
          300: "hsl(var(--primary-300))",
          100: "hsl(var(--primary-100))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        grey: {
          DEFAULT: "hsl(var(--grey))",
        },
        teritary: {
          DEFAULT: "hsl(var(--teritary))",
          foreground: "hsl(var(--teritary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "Roboto", "system-ui", "sans-serif"],
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        mono: ["Courier New", "monospace"],
        palanquin: ["Palanquin", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      zIndex: {
        "4": "4",
        "8": "8",
        "12": "12",
        "16": "16",
        "20": "20",
        "24": "24",
        "28": "28",
        "32": "32",
        "36": "36",
        "40": "40",
        "44": "44",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

export default config;
