import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

import { getDominantFontFace, getGenericFactor } from './utils';

// Run the detection logic
const relevantElements = document.querySelectorAll(':not(#crx-root):not(#crx-root *)');
const dominantBackgroundColor = getGenericFactor('backgroundColor', relevantElements, color => color !== 'rgba(0, 0, 0, 0)' && color !== 'transparent');
const dominantBorderRadius = getGenericFactor('borderRadius', relevantElements, radius => radius !== '0px');
const dominantBorderColor = getGenericFactor('borderColor', relevantElements, color => color !== 'rgba(0, 0, 0, 0)' && color !== 'transparent');
const dominantFontFace = getDominantFontFace();
const dominantGap = getGenericFactor('gap', relevantElements, gap => gap !== '0px' && gap !== 'normal');

// Create a theme instance.
const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: dominantBackgroundColor || '#ffffff',
    },
  },
  typography: {
    fontFamily: dominantFontFace || 'Arial',
  },
  shape: {
    borderRadius: dominantBorderRadius ? parseInt(dominantBorderRadius.replace(/\D/g, ''), 10) : 4,
  },
  spacing: dominantGap ? parseInt(dominantGap.replace(/\D/g, ''), 10) : 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderColor: dominantBorderColor || '#000000',
        },
      },
    },
  },
});

console.log('dominantBorderRadius:', parseInt(dominantBorderRadius.replace(/\D/g, ''), 10));
console.log('dominantGap:', dominantGap, parseInt(dominantGap.replace(/\D/g, ''), 10));
console.log('theme:', theme);

export default theme;
