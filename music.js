/**
 * Toggle background music mute/unmute.
 */
function toggleMusic() {
  try {
    const music = document.getElementById("background-music");
    const button = document.getElementById("music-toggle");

    if (!music || !button) {
      console.error("Music element or button not found! Please check your HTML IDs.");
      return;
    }

    if (music.muted) {
      music.muted = false; // Unmute
      button.innerText = "Mute Music"; // Update button text
      console.log("Background music unmuted.");
    } else {
      music.muted = true; // Mute
      button.innerText = "Unmute Music"; // Update button text
      console.log("Background music muted.");
    }
  } catch (error) {
    console.error("Error toggling music:", error);
  }
}

// Automatically start playback after user interaction (if autoplay fails)
document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("background-music");
  const button = document.getElementById("music-toggle");

  // Ensure music element exists
  if (!music || !button) {
    console.error("Music element or button not found during initialization!");
    return;
  }

  // Set button text based on music's initial mute state
  button.innerText = music.muted ? "Unmute Music" : "Mute Music";

  // Start playback after the first user interaction
  document.body.addEventListener("click", () => {
    if (music.paused) {
      music.play().catch((error) => {
        console.error("Music playback failed:", error);
      });
    }
  }, { once: true }); // Trigger only once
});
