import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import Color from 'color';
import { functionRelevantElements, getDominantFontFace, getGenericFactor } from './utils';

// Run the detection logic
const dominantBackgroundColor = getGenericFactor('backgroundColor', functionRelevantElements(), color => color !== 'rgba(0, 0, 0, 0)' && color !== 'transparent');
const dominantBorderRadius = getGenericFactor('borderRadius', functionRelevantElements(), radius => radius !== '0px');
const dominantBorderColor = getGenericFactor('borderColor', functionRelevantElements(), color => color !== 'rgba(0, 0, 0, 0)' && color !== 'transparent');
const dominantFontWeight = getGenericFactor('fontWeight', functionRelevantElements(), weight => weight !== '400');
const dominantBoxShadow = getGenericFactor('boxShadow', functionRelevantElements(), color => color !== 'rgba(0, 0, 0, 0)' && color !== 'transparent');
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
    // background: {
    //   default: Color(dominantBackgroundColor).darken(0.25).lightness(35).toString() || '#ffffff',
    //   paper: dominantBackgroundColor || '#ffffff',
    // },
  },
  typography: {
    fontFamily: dominantFontFace || 'Arial',
    fontWeight: dominantFontWeight || 'bold',
    allVariants: {
      fontWeight: dominantFontWeight || 'bold',
    }
  },
  shape: {
    borderRadius: Math.min(parseInt(dominantBorderRadius.replace(/\D/g, ''), 10), 8),
  },
  spacing: dominantGap ? Math.min(parseInt(dominantGap.replace(/\D/g, ''), 10), 4) : 4,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: Math.min(parseInt(dominantBorderRadius.replace(/\D/g, ''), 10), 8),
          textTransform: 'none',
          borderColor: dominantBorderColor || '#000000',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: dominantBoxShadow || 'none',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontWeight: dominantFontWeight || 'bold',
        },
        variant: {
          caption: {
            fontWeight: dominantFontWeight || 'bold',
          },
        }
      },
    },
  },
});

console.log('dominantBorderRadius:', parseInt(dominantBorderRadius.replace(/\D/g, ''), 10));
console.log('dominantGap:', dominantGap, parseInt(dominantGap.replace(/\D/g, ''), 10));
console.log('theme:', theme);

export default theme;
