/**
 * Play a button click sound without overlapping and manage background music.
 * @param {string} soundFile - The sound file to play.
 */
function playButtonSoundWithMusicPause(soundFile) {
  try {
    const audio = new Audio(soundFile); // Create audio element for the click sound
    const music = document.getElementById("background-music");

    if (music && !music.paused) {
      music.pause(); // Pause background music
    }

    audio.play().catch((error) => {
      console.error("Error playing button sound:", error);
    });

    // Resume background music after the click sound finishes
    audio.onended = () => {
      if (music && music.paused) {
        music.play().catch((error) => {
          console.error("Error resuming background music:", error);
        });
      }
    };
  } catch (error) {
    console.error("Error in button sound playback:", error);
  }
}

// Add sound effects to buttons
document.addEventListener("DOMContentLoaded", () => {
  try {
    const buttons = document.querySelectorAll("button"); // Select all buttons
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        playButtonSoundWithMusicPause("sounds/button-click.mp3"); // Play sound with music pause
      });
    });
  } catch (error) {
    console.error("Error adding button click sound effects:", error);
  }
});
