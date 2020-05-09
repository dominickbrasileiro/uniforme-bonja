function formatTime(ms) {
  const totalMinutes = Math.floor(ms / 1000 / 60);
  const totalSeconds = Math.floor((ms / 1000) % 60);

  const minutes = totalMinutes.toString().length < 2 ? `0${totalMinutes}` : totalMinutes;
  const seconds = totalSeconds.toString().length < 2 ? `0${totalSeconds}` : totalSeconds;

  return `${minutes}:${seconds}`;
}

export default formatTime;
