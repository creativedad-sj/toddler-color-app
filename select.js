/**
 * Save the selected item and navigate to the coloring canvas page.
 * @param {string} type - The type of the selected item (e.g., "letter", "number", "shape").
 * @param {string} value - The value of the selected item (e.g., "A", "circle").
 */
function selectCharacter(type, value) {
  const item = { type: type, value: value }; // Create an object to store the selection
  try {
    localStorage.setItem('selectedItem', JSON.stringify(item)); // Save selection to localStorage
    window.location.href = 'canvas.html'; // Redirect to the coloring canvas page
  } catch (error) {
    console.error("Failed to save selected item:", error);
  }
}

/**
 * Save the selected shape and navigate to the coloring canvas page.
 * @param {string} shape - The shape type ("triangle", "rectangle", "square").
 */
function selectShape(shape) {
  const item = { type: "shape", value: shape };
  localStorage.setItem("selectedItem", JSON.stringify(item));
  window.location.href = "canvas.html"; // Redirect to canvas page
}


/**
 * Navigate to the free drawing page.
 */
function startFreeDrawing() {
  try {
    localStorage.setItem('selectedItem', JSON.stringify({ type: 'freeDrawing' })); // Indicate free drawing mode
    window.location.href = 'freeDrawing.html'; // Redirect to the free drawing canvas page
  } catch (error) {
    console.error("Failed to initiate free drawing:", error);
  }
}

/**
 * Set the selected color and play a sound.
 * @param {string} color - The selected color.
 */
function setColor(color) {
  try {
    selectedColor = color; // Update the color globally
    playButtonSound("sounds/crayon-select.mp3"); // Play a sound when selecting color
  } catch (error) {
    console.error("Failed to set color:", error);
  }
}
