export function convertRatingToLevelRange(rating) {
  return {
    min: ((rating - 0.25) / 5) * 15,
    max: ((rating + 0.25) / 5) * 15,
  };
}
