/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'mobile': '480px',
      'tablet': '768px',
      'desktop': '1024px',
      'large-desktop': '1440px',
    },
    extend: {
      colors: {
        primary: {
          // Light Mode Colors (Professional & Techy)
          50: '#f0f4f8',    // Very light blue-gray background
          100: '#d9e2ec',   // Light blue-gray
          200: '#bcccdc',   // Soft blue-gray
          300: '#9fb3c8',   // Muted blue
          400: '#7b97b0',   // Steel blue
          500: '#627d98',   // Slate blue
          600: '#486581',   // Dark slate blue
          700: '#334e68',   // Deep slate
          800: '#243b53',   // Very dark slate
          900: '#102a43',   // Almost black slate
        },
        // Additional light mode colors for a professional look
        background: {
          light: '#ffffff',     // Clean white
          subtle: '#f8fafc',    // Very light blue-gray
        },
        text: {
          primary: '#1a202c',   // Dark charcoal for readability
          secondary: '#4a5568', // Slightly lighter charcoal
          muted: '#718096',     // Gray for less important text
        },
        accent: {
          blue: '#3182ce',      // Professional blue
          green: '#38a169',     // Soft green for positive actions
          gray: '#4a5568',      // Professional gray
        }
      },
      fontSize: {
        'mobile-sm': '0.75rem',
        'mobile-base': '0.875rem',
        'mobile-lg': '1rem',
        'desktop-sm': '0.875rem',
        'desktop-base': '1rem',
        'desktop-lg': '1.25rem',
      },
      spacing: {
        'mobile-gutter': '1rem',
        'desktop-gutter': '2rem',
      },
      keyframes: {
        'route-progress': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        progress: {
          '0%': { width: '0%' },
          '100%': { width: '100%' }
        }
      },
      animation: {
        'route-progress': 'route-progress 0.5s ease-in-out',
        progress: 'progress 1s ease-out'
      },
      typography: (theme) => ({
        light: {
          css: {
            color: theme('colors.text.primary'),
            a: {
              color: theme('colors.primary.600'),
              '&:hover': {
                color: theme('colors.primary.700'),
              },
            },
            h1: { color: theme('colors.text.primary') },
            h2: { color: theme('colors.text.primary') },
            h3: { color: theme('colors.text.secondary') },
            strong: { color: theme('colors.text.primary') },
          },
        },
        DEFAULT: {
          css: {
            color: theme('colors.text.primary'),
            a: {
              color: theme('colors.primary.600'),
              '&:hover': {
                color: theme('colors.primary.700'),
              },
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.100'),
            a: {
              color: theme('colors.primary.400'),
              '&:hover': {
                color: theme('colors.primary.300'),
              },
            },
            h1: {
              color: theme('colors.gray.100'),
            },
            h2: {
              color: theme('colors.gray.100'),
            },
            h3: {
              color: theme('colors.gray.100'),
            },
            h4: {
              color: theme('colors.gray.100'),
            },
            code: {
              color: theme('colors.gray.100'),
            },
            blockquote: {
              color: theme('colors.gray.100'),
            },
            strong: {
              color: theme('colors.gray.100'),
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      typography: ['dark']
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
};
