export default function bs_list(haystack: number[], needle: number): boolean {
  // we're assuming haystack is sorted here
  // if you're not sure, you can check it first with a little for-loop, but it adds O(n) time

  let lo = 0;
  let hi = haystack.length - 1;

  while (lo <= hi) {
    // const mid = Math.floor((lo + hi) / 2); // this causes issues in JS for large numbers
    const mid = lo + Math.floor((hi - lo) / 2); // this makes sure you don't accidentally overflow

    if (haystack[mid] === needle) {
      return true;
    } else if (haystack[mid] < needle) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return false;
}
