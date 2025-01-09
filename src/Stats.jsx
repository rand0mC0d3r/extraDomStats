
import { ThemeProvider } from '@mui/material/styles';
import { IndustrialProvider, PlacementPosition } from 'mui-industrial';
import ReactDOM from "react-dom/client";
import ComponentContentNg from './ComponentContentNg';
import './googleMaps.css';
import theme from './theme';
import { extensionIdentifier } from './utils';

const heightOfBar = '36px';

// Create a wrapper div
const wrapper = document.createElement("div");
wrapper.style.position = "relative";
// wrapper.style.border = '5px solid yellow';
wrapper.style.flex = '1 1 auto';
// wrapper.style.padding = '10px';
// wrapper.style.margin = '10px';
wrapper.style.alignSelf = 'stretch';
wrapper.style.overflow = "scroll";
wrapper.id = `${extensionIdentifier}-wrapper`;

// Move all existing body content into the wrapper
while (document.body.firstChild) {
  wrapper.appendChild(document.body.firstChild);
}

// Append the wrapper to the body
document.body.appendChild(wrapper);

// Create the root div
const root = document.createElement("div");
root.style.flex = '1 1 auto';
root.style.height = heightOfBar;
root.style.minHeight = heightOfBar;
root.style.maxHeight = heightOfBar;
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
    style={{ height: heightOfBar, pointerEvents: 'auto' }}
    slim={true}
    variant='outlined'
  >
    <ComponentContentNg />
  </IndustrialProvider>
</ThemeProvider>);
