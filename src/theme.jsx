import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

import { functionRelevantElements, getDominantFontFace, getGenericFactor } from './utils';

// Run the detection logic
const dominantBackgroundColor = getGenericFactor('backgroundColor', functionRelevantElements(), color => color !== 'rgba(0, 0, 0, 0)' && color !== 'transparent');
const dominantBorderRadius = getGenericFactor('borderRadius', functionRelevantElements(), radius => radius !== '0px');
const dominantBorderColor = getGenericFactor('borderColor', functionRelevantElements(), color => color !== 'rgba(0, 0, 0, 0)' && color !== 'transparent');
const dominantFontFace = getDominantFontFace();
const dominantGap = getGenericFactor('gap', functionRelevantElements(), gap => gap !== '0px' && gap !== 'normal');

const determinePrimaryColor = getGenericFactor('color', functionRelevantElements(), color => color !== 'rgba(0, 0, 0, 0)' && color !== 'transparent');

// Create a theme instance.
const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: determinePrimaryColor || '#1976d2',
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
    borderRadius: Math.min(parseInt(dominantBorderRadius.replace(/\D/g, ''), 10), 8),
  },
  spacing: dominantGap ? Math.min(parseInt(dominantGap.replace(/\D/g, ''), 10), 4) : 4,
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
