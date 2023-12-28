export default function bubble_sort(arr: number[]): void {
  // loop once for every element in the array
  // loop again, but this time, only for the unsorted elements
  // compare the current element with the next element, and swap if necessary

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const first = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = first;
      }
    }
  }
}
