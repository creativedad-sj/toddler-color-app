let selectedColor = 'black'; // Default color
let actionStack = []; // Tracks actions for undo functionality

/**
 * Set the color for coloring.
 * @param {string} color - The selected color.
 */
function setColor(color) {
  try {
    selectedColor = color; // Update the color globally
    playButtonSound("sounds/crayon-select.mp3"); // Play a sound when selecting color
  } catch (error) {
    console.error("Error setting color:", error);
  }
}

/**
 * Apply color to the clicked SVG element.
 * @param {HTMLElement} element - The SVG element to color.
 */
function applyColor(element) {
  try {
    const prevColor = element.getAttribute("fill"); // Get the current color
    if (prevColor !== selectedColor) {
      actionStack.push({ el: element, prev: prevColor }); // Save the action for undo
      element.setAttribute("fill", selectedColor); // Apply the new color
    }
  } catch (error) {
    console.error("Error applying color:", error);
  }
}

/**
 * Undo the last coloring action.
 */
function undoAction() {
  try {
    if (actionStack.length > 0) {
      const lastAction = actionStack.pop(); // Get the last action
      lastAction.el.setAttribute("fill", lastAction.prev); // Restore the previous color
    } else {
      alert("No more actions to undo!");
    }
  } catch (error) {
    console.error("Error undoing action:", error);
  }
}

/**
 * Reset the coloring canvas to its initial state.
 */
function resetCanvas() {
  try {
    const svg = document.getElementById("letter-canvas");
    const storedItem = localStorage.getItem("selectedItem"); // Get the selected item
    const item = storedItem ? JSON.parse(storedItem) : { type: "letter", value: "A" }; // Default to 'A' if no item is found

    // Build the SVG content dynamically based on the selected item
    let content = "";
    if (item.type === "letter" || item.type === "number") {
      content = `<text x="50%" y="50%" font-size="500" fill="white" stroke="black"
                    stroke-width="3" text-anchor="middle" alignment-baseline="central"
                    onclick="applyColor(this)">${item.value}</text>`;
    } else if (item.type === "shape") {
      if (item.value === "circle") {
        content = `<circle cx="300" cy="300" r="200" fill="white" stroke="black" stroke-width="3" onclick="applyColor(this)" />`;
      } else if (item.value === "square") {
        content = `<rect x="100" y="100" width="400" height="400" fill="white" stroke="black" stroke-width="3" onclick="applyColor(this)" />`;
      } else if (item.value === "triangle") {
        content = `<polygon points="300,50 50,550 550,550" fill="white" stroke="black" stroke-width="3" onclick="applyColor(this)" />`;
      }
    }

    // Reset the canvas content with the background and selected item
    svg.innerHTML = `<rect id="canvas-border" x="0" y="0" width="600" height="600" fill="none" stroke="black" stroke-width="10" />
                     <rect id="background" width="100%" height="100%" fill="white" onclick="applyColor(this)" />` + content;
  } catch (error) {
    console.error("Error resetting canvas:", error);
  }
}

/**
 * Save the coloring canvas as an SVG image.
 */
function saveCanvas() {
  try {
    const svg = document.getElementById("letter-canvas");
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);

    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "coloring_image.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error saving canvas:", error);
  }
}

/**
 * Navigate back to the selection page.
 */
function changeSelection() {
  try {
    window.location.href = "select.html";
  } catch (error) {
    console.error("Error navigating to selection page:", error);
  }
}

/**
 * Initialize the coloring canvas with the selected item.
 */
document.addEventListener("DOMContentLoaded", function () {
  try {
    const svg = document.getElementById("letter-canvas");
    const storedItem = localStorage.getItem("selectedItem"); // Retrieve the selected item
    const item = storedItem ? JSON.parse(storedItem) : { type: "letter", value: "A" }; // Default to 'A' if no item is found

    // Build the SVG content dynamically based on the selected item
    let content = "";
    if (item.type === "letter" || item.type === "number") {
      content = `<text x="50%" y="50%" font-size="500" fill="white" stroke="black"
                  stroke-width="3" text-anchor="middle" alignment-baseline="central"
                  onclick="applyColor(this)">${item.value}</text>`;
    } else if (item.type === "shape") {
     if (item.value === "triangle") {
      content = `<polygon points="300,50 50,550 550,550" fill="white" stroke="black" stroke-width="3" onclick="applyColor(this)" />`;
    } else if (item.value === "rectangle") {
      content = `<rect x="100" y="200" width="400" height="250" fill="white" stroke="black" stroke-width="3" onclick="applyColor(this)" />`;
    } else if (item.value === "square") {
      content = `<rect x="100" y="100" width="400" height="400" fill="white" stroke="black" stroke-width="3" onclick="applyColor(this)" />`;
    }}

    // Set the initial SVG content
    svg.innerHTML = `<rect id="canvas-border" x="0" y="0" width="600" height="600" fill="none" stroke="black" stroke-width="10" />
                     <rect id="background" width="100%" height="100%" fill="white" onclick="applyColor(this)" />` + content;
  } catch (error) {
    console.error("Error initializing canvas:", error);
  }
});
