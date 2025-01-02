/* eslint-disable no-undef */
import React from "react";
import ReactDOM from "react-dom/client";
import ComponentContent from './ComponentContent';

const root = document.createElement("div");
root.style.top = "0";
root.style.left = "0";
root.style.right = "0";
root.style.bottom = "0";
root.style.zIndex = "2147483647";
// root.style.pointerEvents = "none";
root.style.position = "fixed";
root.id = "crx-root";

document.body.appendChild(root);

ReactDOM.createRoot(root).render(<ComponentContent />);
