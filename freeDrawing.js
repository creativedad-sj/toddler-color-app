let selectedColor = 'black'; // Default drawing color
let drawing = false; // Tracks if the user is actively drawing
let ctx, canvas; // Canvas context
let actionStack = []; // Stores previous drawings for undo functionality
const drawingAudio = new Audio("sounds/drawing.mp3"); // Load drawing sound

/**
 * Set the current drawing color.
 * @param {string} color - The selected color.
 */
function setColor(color) {
  try {
    selectedColor = color;
    console.log("Selected color:", selectedColor); // Debugging log
    playButtonSound("sounds/crayon-select.mp3"); // Play selection sound
  } catch (error) {
    console.error("Error setting color:", error);
  }
}

/**
 * Reset the free drawing canvas to its initial blank state.
 */
function resetDrawingCanvas() {
  try {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear everything
    initializeCanvasBackground(); // Redraw background and border
    actionStack = []; // Reset undo stack
  } catch (error) {
    console.error("Error resetting drawing canvas:", error);
  }
}

/**
 * Save the free drawing canvas as a PNG image.
 */
function saveDrawingCanvas() {
  try {
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL(); // Get canvas data as URL
    link.click();
  } catch (error) {
    console.error("Error saving drawing canvas:", error);
  }
}

/**
 * Undo the last drawing action.
 */
function undoDrawing() {
  try {
    if (actionStack.length > 0) {
      actionStack.pop(); // Remove last action
      redrawCanvas(); // Restore previous state
    } else {
      alert("No more actions to undo!");
    }
  } catch (error) {
    console.error("Error undoing drawing:", error);
  }
}

/**
 * Redraw the canvas based on stored actions.
 */
function redrawCanvas() {
  initializeCanvasBackground(); // Clear canvas
  actionStack.forEach(action => ctx.putImageData(action, 0, 0)); // Restore previous states
}

/**
 * Draw the initial white background and border for the free drawing canvas.
 */
function initializeCanvasBackground() {
  try {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 10;
    ctx.strokeStyle = 'black';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  } catch (error) {
    console.error("Error initializing canvas background:", error);
  }
}

/**
 * Stop the drawing process and sound.
 */
function stopDrawing() {
  try {
    drawing = false; // Stop drawing
    ctx.closePath(); // Close the path properly
    drawingAudio.pause(); // Stop sound
    drawingAudio.currentTime = 0;

    // Store the canvas state for undo
    actionStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  } catch (error) {
    console.error("Error stopping drawing process:", error);
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
 * Initialize the free drawing canvas.
 */
document.addEventListener("DOMContentLoaded", function () {
  canvas = document.getElementById("free-canvas");
  ctx = canvas.getContext("2d");
  initializeCanvasBackground(); // Set up the background and border

  function startDrawing(e) {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX || e.touches[0].clientX - canvas.offsetLeft, e.offsetY || e.touches[0].clientY - canvas.offsetTop);
    drawingAudio.play(); // Play sound only when drawing begins
  }

  function draw(e) {
    if (!drawing) return;
    ctx.lineTo(e.offsetX || e.touches[0].clientX - canvas.offsetLeft, e.offsetY || e.touches[0].clientY - canvas.offsetTop);
    ctx.strokeStyle = selectedColor; // Apply selected color
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.stroke();
  }

  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseout", stopDrawing);

  // Touch support for mobile
  canvas.addEventListener("touchstart", startDrawing);
  canvas.addEventListener("touchmove", draw);
  canvas.addEventListener("touchend", stopDrawing);
});
