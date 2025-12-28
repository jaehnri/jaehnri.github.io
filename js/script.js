let currentTrackData = null;
let progressBarInterval;
let fetchTimeout; // To prevent rapid refetches
const CACHE_KEY = 'spotify_track_data';

function saveToCache(data) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({
      data: data,
      timestamp: Date.now()
    }));
  } catch (e) {
    console.error('Error saving to cache:', e);
  }
}

function loadFromCache() {
  try {
    const cachedItem = sessionStorage.getItem(CACHE_KEY);
    if (cachedItem) {
      const { data, timestamp } = JSON.parse(cachedItem);
      if (data && data.is_playing) {
        // Estimate progress based on elapsed time
        const elapsed = Date.now() - timestamp;
        data.progress_ms = Math.min(data.progress_ms + elapsed, data.song_duration_ms);
      }
      return data;
    }
  } catch (e) {
    console.error('Error loading from cache:', e);
  }
  return null;
}

function fetchNowPlaying() {
  // Clear any pending timeout to avoid redundant fetches
  clearTimeout(fetchTimeout);

  fetch('https://website-backend-925461270715.us-central1.run.app/now-playing')
    .then(response => response.json())
    .then(data => {
      currentTrackData = data;
      saveToCache(currentTrackData); // Save to cache
      updateProgressBar(); // Initial update after fetching

      // Clear any existing interval and start a new one for visual updates
      clearInterval(progressBarInterval);
      if (currentTrackData && currentTrackData.is_playing) {
        progressBarInterval = setInterval(incrementProgressBar, 500); // Update every 0.5 seconds
      } else {
        // If not playing, ensure UI is up to date (updateProgressBar handles clearing or setting "Last played")
        updateProgressBar();
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
    // Handle division by zero or invalid data just in case
    const playedRatio = duration > 0 ? progress / duration : 0;
    const playedChars = Math.round(playedRatio * progressBarLength);

    // Clamp values to avoid negative repeat count or out of bounds
    const safePlayedChars = Math.max(0, Math.min(progressBarLength, playedChars));
    const safeRemainingChars = progressBarLength - safePlayedChars;

    const progressBar = '='.repeat(safePlayedChars) + '-'.repeat(safeRemainingChars);

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

// Try to load from cache first
const cachedData = loadFromCache();
if (cachedData) {
  currentTrackData = cachedData;
  updateProgressBar();
  if (currentTrackData.is_playing) {
     progressBarInterval = setInterval(incrementProgressBar, 500);
  }
}

// Fetch the data initially (this will update the cache and UI with fresh data)
fetchNowPlaying();

// Fetch the data every 30 seconds as a fallback/regular update
setInterval(fetchNowPlaying, 30000);
