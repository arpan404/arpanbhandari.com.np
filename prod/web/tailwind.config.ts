import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
   darkMode: ['class'],
   content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   theme: {
      extend: {
         fontFamily: {
            sans: [
               'Inter',
               'ui-sans-serif',
               'system-ui',
               'sans-serif',
               'Apple Color Emoji',
               'Segoe UI Emoji',
               'Segoe UI Symbol',
               'Noto Color Emoji',
            ],
            helvetica: ['Helvetica', 'sans-serif'],
            'helvetica-light': ['Helvetica Light', 'Helvetica', 'sans-serif'],
            'helvetica-compressed': [
               'Helvetica Compressed',
               'Helvetica',
               'sans-serif',
            ],
            'helvetica-rounded': [
               'Helvetica Rounded',
               'Helvetica',
               'sans-serif',
            ],
         },
         borderRadius: {
            lg: 'var(--radius)',
            md: 'calc(var(--radius) - 2px)',
            sm: 'calc(var(--radius) - 4px)',
         },
         colors: {
            background: 'hsl(var(--background))',
            foreground: 'hsl(var(--foreground))',
            card: {
               DEFAULT: 'hsl(var(--card))',
               foreground: 'hsl(var(--card-foreground))',
            },
            popover: {
               DEFAULT: 'hsl(var(--popover))',
               foreground: 'hsl(var(--popover-foreground))',
            },
            primary: {
               DEFAULT: 'hsl(var(--primary))',
               foreground: 'hsl(var(--primary-foreground))',
            },
            secondary: {
               DEFAULT: 'hsl(var(--secondary))',
               foreground: 'hsl(var(--secondary-foreground))',
            },
            muted: {
               DEFAULT: 'hsl(var(--muted))',
               foreground: 'hsl(var(--muted-foreground))',
            },
            accent: {
               DEFAULT: 'hsl(var(--accent))',
               foreground: 'hsl(var(--accent-foreground))',
            },
            destructive: {
               DEFAULT: 'hsl(var(--destructive))',
               foreground: 'hsl(var(--destructive-foreground))',
            },
            border: 'hsl(var(--border))',
            input: 'hsl(var(--input))',
            ring: 'hsl(var(--ring))',
            chart: {
               '1': 'hsl(var(--chart-1))',
               '2': 'hsl(var(--chart-2))',
               '3': 'hsl(var(--chart-3))',
               '4': 'hsl(var(--chart-4))',
               '5': 'hsl(var(--chart-5))',
            },
         },
         cursor: {
            default: 'url(/cursors/default.png), default',
            pointer: 'url(/cursors/pointer.png), pointer',
         },
      },
   },
   plugins: [
      require('tailwindcss-animate'),
      require('tailwind-scrollbar-hide'),
      plugin(function ({ addUtilities }) {
         addUtilities({
            /* Custom scrollbar styles */
            '.custom_scroll': {
               'scrollbar-width': 'thin', // For Firefox
               'scrollbar-color': '#ff8e00 inherit', // For Firefox
            },
            '.custom_scroll::-webkit-scrollbar': {
               width: '5px',
            },
            '.custom_scroll::-webkit-scrollbar-track': {
               'background-color': 'inherit',
            },
            '.custom_scroll::-webkit-scrollbar-thumb': {
               'background-color': '#ff8e00',
               'border-radius': '200px',
            },
            '.custom_scroll::-webkit-scrollbar-thumb:hover': {
               'background-color': '#ff5003',
            },
         });
      }),
   ],
} satisfies Config;
