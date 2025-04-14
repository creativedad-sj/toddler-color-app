let drawingColor = 'black'; // Default drawing color
let drawing = false; // Tracks if the user is actively drawing
const drawingAudio = new Audio("sounds/drawing.mp3"); // Load drawing sound

/**
 * Set the current drawing color.
 * @param {string} color - The selected color.
 */
function setDrawingColor(color) {
  try {
    drawingColor = color;
    playButtonSound("sounds/crayon-select.mp3"); // Play a sound on color selection
  } catch (error) {
    console.error("Error setting drawing color:", error);
  }
}

/**
 * Reset the free drawing canvas to its initial blank state.
 */
function resetDrawingCanvas() {
  try {
    const canvas = document.getElementById('free-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear everything
    initializeCanvasBackground(); // Redraw the background and border
  } catch (error) {
    console.error("Error resetting drawing canvas:", error);
  }
}

/**
 * Save the free drawing canvas as a PNG image.
 */
function saveDrawingCanvas() {
  try {
    const canvas = document.getElementById('free-canvas');
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL(); // Get canvas data as URL
    link.click();
  } catch (error) {
    console.error("Error saving drawing canvas:", error);
  }
}

/**
 * Draw the initial white background and border for the free drawing canvas.
 */
function initializeCanvasBackground() {
  try {
    const canvas = document.getElementById('free-canvas');
    const ctx = canvas.getContext('2d');

    // Draw a white background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw a border around the canvas
    ctx.lineWidth = 10; // Border thickness
    ctx.strokeStyle = 'black'; // Border color
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  } catch (error) {
    console.error("Error initializing canvas background:", error);
  }
}

/**
 * Navigate back to the selection page.
 */
function changeSelection() {
  try {
    window.location.href = "select.html"; // Redirect to the selection page
  } catch (error) {
    console.error("Error navigating to selection page:", error);
  }
}

// Initialize the free drawing canvas
document.addEventListener("DOMContentLoaded", function () {
  try {
    const canvas = document.getElementById('free-canvas');
    const ctx = canvas.getContext('2d');
    initializeCanvasBackground(); // Set up the background and border

    canvas.addEventListener('mousedown', (e) => {
      drawing = true; // Begin drawing
      ctx.beginPath(); // Start a new path
      ctx.moveTo(e.offsetX, e.offsetY); // Move to the starting point
      playDrawingSound(); // Start playing drawing sound
    });

    canvas.addEventListener('mousemove', (e) => {
      if (drawing) {
        ctx.lineTo(e.offsetX, e.offsetY); // Draw a line to the current position
        ctx.strokeStyle = drawingColor; // Apply the selected color
        ctx.lineWidth = 5; // Brush size
        ctx.lineCap = 'round'; // Smooth brush strokes
        ctx.stroke(); // Apply the stroke
      }
    });

    canvas.addEventListener('mouseup', () => stopDrawing());
    canvas.addEventListener('mouseout', () => stopDrawing());
  } catch (error) {
    console.error("Error initializing free drawing canvas:", error);
  }
});

/**
 * Play the drawing sound.
 */
function playDrawingSound() {
  try {
    drawingAudio.loop = true; // Enable looping
    drawingAudio.play(); // Play sound
  } catch (error) {
    console.error("Error playing drawing sound:", error);
  }
}

/**
 * Stop the drawing process and sound.
 */
function stopDrawing() {
  try {
    drawing = false; // Stop drawing
    drawingAudio.pause(); // Pause the sound
    drawingAudio.currentTime = 0; // Reset sound to the beginning
  } catch (error) {
    console.error("Error stopping drawing process:", error);
  }
}
