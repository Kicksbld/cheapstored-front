import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      "4xl": [
        "400px",
        {
          fontWeight: "400",
        },
      ],
      "3xl": [
        "48px",
        {
          fontWeight: "400",
        },
      ],
      "2xl": [
        "40px",
        {
          lineHeight: "50px",
          fontWeight: "200",
        },
      ],
      xl: [
        "20px",
        {
        },
      ],
      base: [
        "16px",
        {
        },
      ],
      sm: [
        "14px",
        {
        },
      ],
      xs: [
        "12px",
        {
        },
      ],
      tag: [
        "17.5px",
        {
          fontWeight: "600",
        },
      ],
    },
    extend: {
      colors: {
        white: "#fff",
        black: "#000",
        red: "#B71129",
        green: "#036D41",
        blue: "#3BA2F9",
        cloud: "#F4F4F4",
        light: "#FCFCFC",
        grey: "#424242",
        primary: "#1D1D1F",
        secondary: "#AF7302",
        tercery: "#52525B",
        brown: "#6D4701",
        beige: "#F3EFE6",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        Cooper: ['"Cooper"'],
      },
    },
  },
  plugins: [],
} satisfies Config;
