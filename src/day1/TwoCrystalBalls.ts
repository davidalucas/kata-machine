export default function two_crystal_balls(breaks: boolean[]): number {
  // this algorithm is about finding the highest floor that a ball can be dropped from without breaking
  // the catch is that we've got 2 balls to work with; if we only had 1, we'd have to do a linear search

  // so, if linear search is O(n), we need some way to do better than that... how about O(n^1/2) or O(sqrt(n))?

  const jump = Math.floor(Math.sqrt(breaks.length));
  let floor = 0;

  // this loop is O(sqrt(n))
  for (; floor < breaks.length; floor += jump) {
    if (breaks[floor]) {
      break; // when we break, we've found a floor where the ball breaks
    }
  }

  // why is it a bad idea to see if we're on the top floor and return early here?

  // jump back to the last floor we know is safe
  floor -= jump;

  // now, we have to linearly search from the last floor we know is safe
  // this loop is O(sqrt(n))
  for (let i = floor; i < floor + jump; i++) {
    if (breaks[i]) {
      return i;
    }
  }

  return -1;
}
