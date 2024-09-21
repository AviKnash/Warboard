export function calculateWPM(score: number, time: number) {
  const wpm = (score / time) * 60;

  return wpm;
}
