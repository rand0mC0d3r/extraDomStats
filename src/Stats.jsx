
import { ThemeProvider } from '@mui/material/styles';
import { IndustrialProvider, PlacementPosition } from 'mui-industrial';
import ReactDOM from "react-dom/client";
import ComponentContent from './ComponentContent';
import ComponentContentNg from './ComponentContentNg';
import './googleMaps.css';
import theme from './theme';
import { extensionIdentifier } from './utils';

// // Create a wrapper div
// const wrapper = document.createElement("div");
// wrapper.style.position = "relative";
// wrapper.style.width = "100%";
// wrapper.style.height = "100%";
// wrapper.style.overflow = "hidden";
// wrapper.id = `${extensionIdentifier}-wrapper`;

// // Move all existing body content into the wrapper
// while (document.body.firstChild) {
//   wrapper.appendChild(document.body.firstChild);
// }

// // Append the wrapper to the body
// document.body.appendChild(wrapper);

// Create the root div
const root = document.createElement("div");
root.style.top = "0";
root.style.left = "0";
root.style.right = "0";
root.style.bottom = "0";
root.style.zIndex = "2147483647";
// root.style.pointerEvents = "none";
root.style.position = "fixed";
root.id = extensionIdentifier;

// Append the root to the wrapper
document.body.appendChild(root);


const stylesheet = document.createElement("link");
stylesheet.rel = "stylesheet";
stylesheet.href = chrome.runtime.getURL("googleMaps.css");

document.body.appendChild(stylesheet);

ReactDOM.createRoot(root).render(<ThemeProvider theme={theme}>
  <IndustrialProvider
    position={PlacementPosition.BOTTOM}
    size="medium"
    hasBorder={true}
    fullWidth={true}
    style={{ height: '40px', pointerEvents: 'auto' }}
    slim={true}
    variant='outlined'
  >
    {/* <ComponentContent /> */}
    <ComponentContentNg />
  </IndustrialProvider>
</ThemeProvider>);
