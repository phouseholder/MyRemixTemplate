import { createTheme, DefaultMantineColor } from '@mantine/core';


// Check out the list of variables you can use to customize your app
// https://mantine.dev/styles/css-variables-list/

export const theme = createTheme({
fontFamily: "Roboto, sans-serif",
primaryColor: 'mainColor',
  colors: {
    mainColor:  [
      "#ff0000",
      '#eef3ff',
      '#dce4f5',
      '#b9c7e2',
      '#94a8d0',
      '#748dc1',
      '#5f7cb8',
      '#5474b4',
      '#44639f',
      '#39588f',
      '#2d4b81',
    ]
  },
  other: {
    '--mantine-breakpoint-xs': '36em',
    '--mantine-breakpoint-sm': '48em',
    '--mantine-breakpoint-md': '62em',
    '--mantine-breakpoint-lg': '75em',
    '--mantine-breakpoint-xl': '88em',
    '--mantine-spacing-xs': '0.625rem',
    '--mantine-spacing-sm': '0.75rem',
    '--mantine-spacing-md': '1rem',
    '--mantine-spacing-lg': '1.25rem',
    '--mantine-spacing-xl': '2rem',
    '--mantine-font-size-xs': '0.75rem',
    '--mantine-font-size-sm': '0.875rem',
    '--mantine-font-size-md': '1rem',
    '--mantine-font-size-lg': '1.125rem',
    '--mantine-font-size-xl': '1.25rem',
    '--mantine-line-height-xs': 1.4,
    '--mantine-line-height-sm': 1.45,
    '--mantine-line-height-md': 1.55,
    '--mantine-line-height-lg': 1.6,
    '--mantine-line-height-xl': 1.65,
    '--mantine-shadow-xs': '0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.1)',
    '--mantine-shadow-sm': '0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 0.625rem 0.9375rem -0.3125rem, rgba(0, 0, 0, 0.04) 0 0.4375rem 0.4375rem -0.3125rem',
    '--mantine-shadow-md': '0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 1.25rem 1.5625rem -0.3125rem, rgba(0, 0, 0, 0.04) 0 0.625rem 0.625rem -0.3125rem',
    '--mantine-shadow-lg': '0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 1.75rem 1.4375rem -0.4375rem, rgba(0, 0, 0, 0.04) 0 0.75rem 0.75rem -0.4375rem',
    '--mantine-shadow-xl': '0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 2.25rem 1.75rem -0.4375rem, rgba(0, 0, 0, 0.04) 0 1.0625rem 1.0625rem -0.4375rem',
    '--mantine-radius-xs': '0.125rem',
    '--mantine-radius-sm': '0.25rem',
    '--mantine-radius-md': '0.5rem',
    '--mantine-radius-lg': '1rem',
    '--mantine-radius-xl': '2rem',
    '--mantine-color-default-color': 'var(--mantine-color-black)'
  },
});

// You can continue to add custom colors here the you can add through variables
// You can also give them a light and dark variable through CSS Variables Resolver. See at the bottom of this link (https://mantine.dev/styles/css-variables/)
