"use client";

import { useEffect } from "react";

// MUI Layer Override component to set custom CSS layer order
export default function MuiLayerOverride() {
  useEffect(() => {
    // Create a style element to determine the CSS layer order
    const styleElement = document.createElement("style");
    styleElement.setAttribute("id", "mui-layer-override");
    styleElement.setAttribute("data-priority", "high");

    // Define the CSS layer order
    styleElement.textContent = `
      @layer theme, base, mui, components, style, utilities;
      
      @layer mui {
        .mui-layer-override {
          --mui-layer-order-fixed: true;
        }
      }
    `;

    // Add the style element to the document head (at the beginning)
    const head = document.head;
    if (head.firstChild) {
      head.insertBefore(styleElement, head.firstChild);
    } else {
      head.appendChild(styleElement);
    }

    // Cleanup function
    return () => {
      const element = document.getElementById("mui-layer-override");
      if (element) {
        element.remove();
      }
    };
  }, []);

  return null;
}
