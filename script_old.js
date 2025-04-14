// Global variables
let selectedColor = 'black'; // Default color
let drawing = false; // Tracks if the user is drawing (for free drawing)
let actionStack = []; // Tracks actions for undo functionality (coloring canvas)

/**
 * Set the color for coloring/drawing.
 * @param {string} color - The selected color.
 */
function setColor(color) {
  selectedColor = color; // Update the color globally
}

/**
 * Apply color to the clicked SVG element (coloring canvas).
 * @param {HTMLElement} element - The SVG element to color.
 */
function applyColor(element) {
  const prevColor = element.getAttribute("fill"); // Get the current color
  if (prevColor !== selectedColor) {
    actionStack.push({ el: element, prev: prevColor }); // Save the action for undo
    element.setAttribute("fill", selectedColor); // Apply the new color
  }
}

/**
 * Undo the last coloring action (coloring canvas).
 */
function undoAction() {
  if (actionStack.length > 0) {
    const lastAction = actionStack.pop(); // Get the last action
    lastAction.el.setAttribute("fill", lastAction.prev); // Restore the previous color
  } else {
    alert("No more actions to undo!"); // Notify if undo stack is empty
  }
}

/**
 * Reset the coloring canvas to its initial state.
 */
function resetCanvas() {
  const svg = document.getElementById("letter-canvas");
  const storedItem = localStorage.getItem("selectedItem"); // Get the selected item
  let item = storedItem ? JSON.parse(storedItem) : { type: "letter", value: "A" }; // Default to 'A' if no item is found
  actionStack = []; // Clear the undo stack

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
}

/**
 * Save the coloring canvas as an SVG image.
 */
function saveCanvas() {
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
}

/**
 * Navigate back to the selection page.
 */
function changeSelection() {
  window.location.href = "select.html";
}

/**
 * Initialize the coloring canvas with the selected item.
 */
document.addEventListener("DOMContentLoaded", function () {
  const svg = document.getElementById("letter-canvas");
  const storedItem = localStorage.getItem("selectedItem"); // Retrieve the selected item
  let item = storedItem ? JSON.parse(storedItem) : { type: "letter", value: "A" }; // Default to 'A' if no item is found

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

  // Set the initial SVG content
  svg.innerHTML = `<rect id="canvas-border" x="0" y="0" width="600" height="600" fill="none" stroke="black" stroke-width="10" />
                   <rect id="background" width="100%" height="100%" fill="white" onclick="applyColor(this)" />` + content;
});

/* Free Drawing Canvas Functions */

/**
 * Draw the initial white background and border for the free drawing canvas.
 */
function initializeCanvasBackground() {
  const canvas = document.getElementById('free-canvas');
  const ctx = canvas.getContext('2d');

  // Draw a white background
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw a border around the canvas
  ctx.lineWidth = 10; // Border thickness
  ctx.strokeStyle = 'black'; // Border color
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

/**
 * Reset the free drawing canvas to its initial blank state.
 */
function resetDrawingCanvas() {
  const canvas = document.getElementById('free-canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear everything
  initializeCanvasBackground(); // Redraw the background and border
}

/**
 * Save the free drawing canvas as a PNG image.
 */
function saveDrawingCanvas() {
  const canvas = document.getElementById('free-canvas');
  const link = document.createElement('a');
  link.download = 'drawing.png';
  link.href = canvas.toDataURL(); // Get canvas data as URL
  link.click(); // Trigger the download
}

// Initialize the free drawing canvas
document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById('free-canvas');
  const ctx = canvas.getContext('2d');
  initializeCanvasBackground(); // Set up the background and border

  canvas.addEventListener('mousedown', (e) => {
    drawing = true; // Begin drawing
    ctx.beginPath(); // Start a new path
    ctx.moveTo(e.offsetX, e.offsetY); // Move to the starting point
  });

  canvas.addEventListener('mousemove', (e) => {
    if (drawing) {
      ctx.lineTo(e.offsetX, e.offsetY); // Draw a line to the current position
      ctx.strokeStyle = selectedColor; // Apply the selected color
      ctx.lineWidth = 5; // Brush size
      ctx.lineCap = 'round'; // Smooth brush strokes
      ctx.stroke(); // Apply the stroke
    }
  });

  canvas.addEventListener('mouseup', () => {
    drawing = false; // Stop drawing
    ctx.closePath(); // Close the path
  });

  canvas.addEventListener('mouseout', () => {
    drawing = false; // Stop drawing
    ctx.closePath(); // Close the path
  });
});
