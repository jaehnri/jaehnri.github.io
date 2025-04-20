let currentTrackData = null;
let progressBarInterval;
let fetchTimeout; // To prevent rapid refetches

function fetchNowPlaying() {
  // Clear any pending timeout to avoid redundant fetches
  clearTimeout(fetchTimeout);

  fetch('https://website-backend-925461270715.southamerica-east1.run.app/now-playing')
    .then(response => response.json())
    .then(data => {
      const wasPlaying = currentTrackData && currentTrackData.is_playing;
      currentTrackData = data;
      updateProgressBar(); // Initial update after fetching

      // Clear any existing interval and start a new one for visual updates
      clearInterval(progressBarInterval);
      if (currentTrackData && currentTrackData.is_playing) {
        progressBarInterval = setInterval(incrementProgressBar, 500); // Update every 0.5 seconds
      } else {
        const progressBarDiv = document.getElementById('progress-bar');
        const songInfoDiv = document.getElementById('song-info');
      }
    })
    .catch(error => {
      console.error('Error fetching now playing data:', error);
      clearInterval(progressBarInterval); // Stop updates on error
    });
}

function updateProgressBar() {
  const explanationDiv = document.getElementById('explanation');
  const progressBarDiv = document.getElementById('progress-bar');
  const songInfoDiv = document.getElementById('song-info');

  if (currentTrackData) {
    const progress = currentTrackData.progress_ms;
    const duration = currentTrackData.song_duration_ms;
    const artist = currentTrackData.artist;
    const song = currentTrackData.song;

    const progressBarLength = 100;
    const playedRatio = progress / duration;
    const playedChars = Math.round(playedRatio * progressBarLength);
    const remainingChars = progressBarLength - playedChars;
    const progressBar = '='.repeat(playedChars) + '-'.repeat(remainingChars);

    if (currentTrackData.is_playing) {
      explanationDiv.textContent = 'Now playing:'
    } else {
      explanationDiv.textContent = 'Last played:'
    }

    progressBarDiv.textContent = `[${progressBar}]`;
    songInfoDiv.textContent = `${artist} - ${song}`;
  } else {
    explanationDiv.textContent = '';
    progressBarDiv.textContent = '';
    songInfoDiv.textContent = '';
  }
}

function incrementProgressBar() {
  if (currentTrackData && currentTrackData.is_playing) {
    currentTrackData.progress_ms += 500; // Increment by 0.5 second (500 ms)
    updateProgressBar();
    if (currentTrackData.progress_ms >= currentTrackData.song_duration_ms) {
      // Song has likely ended, immediately call the server
      clearInterval(progressBarInterval);
      // Add a small delay to avoid potential rapid-fire requests if the backend is slow to update
      fetchTimeout = setTimeout(fetchNowPlaying, 500);
    }
  }
}

// Fetch the data initially
fetchNowPlaying();

// Fetch the data every 30 seconds as a fallback/regular update
setInterval(fetchNowPlaying, 30000);
