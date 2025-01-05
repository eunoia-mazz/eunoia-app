/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      content: {
        UIVERSE: "UIVERSE",
      },
      animation: {
        "slide-right": "slide-right 1s forwards",
      },
      backdropBlur: {
        14: "14px",
      },
      boxShadow: {
        custom: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
      },
      colors: {
        "custom-blue": "rgba( 255, 255, 255, 0.1 )",
        // background: "hsl(var(--background))",
        // foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        // primary: {
        //   DEFAULT: "hsl(var(--primary))",
        //   foreground: "hsl(var(--primary-foreground))",
        // },
        // secondary: {
        //   DEFAULT: "hsl(var(--secondary))",
        //   foreground: "hsl(var(--secondary-foreground))",
        // },
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
        // ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      backgroundImage: {
        "custom-gradient":
          "`linear-gradient(90deg, rgba(1,10,78,1) 0%, rgba(22,42,184,1) 50%, rgba(0,10,92,1) 100%);`",
      },
      keyframes: {
        "slide-right": {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(300px)",
          },
        },
        rot: {
          "0%": {
            transform: "rotateX(-15deg) translateY(0px)",
          },
          "50%": {
            transform: "rotateX(-15deg) translateY(-10px)",
          },
          "100%": {
            transform: "rotateX(-15deg) translateY(0px)",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar"), require("tailwindcss-animate")],
};
