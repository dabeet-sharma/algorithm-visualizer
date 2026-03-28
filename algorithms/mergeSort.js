// Brings in the renderBars function
import { renderBars } from "../visualizer/renderBars.js";

// Sleep returns new promise creating a delay
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// async for await
export async function mergeSort(array, container, speed) {
  // Copying array using spread operator to avoid mutating orignal input
  const arr = [...array];

  // Merges two sorted halves back into the original array
  async function merge(left, mid, right) {
    // Splits the current section into left and right temporary arrays
    const leftPart = arr.slice(left, mid + 1);
    const rightPart = arr.slice(mid + 1, right + 1);

    let i = 0;
    let j = 0;
    let k = left;

    // compares both halves and places the smaller value back into arr
    while (i < leftPart.length && j < rightPart.length) {
      // draws currently active bars in orange and waits
      renderBars(arr, container, [left + i, mid + 1 + j], [], []);
      await sleep(speed);

      if (leftPart[i] <= rightPart[j]) {
        arr[k] = leftPart[i];
        i++;
      } else {
        arr[k] = rightPart[j];
        j++;
      }

      // draws merged bar in red and waits
      renderBars(arr, container, [], [k], []);
      await sleep(speed);
      k++;
    }

    // copies any remaining values from the left half
    while (i < leftPart.length) {
      arr[k] = leftPart[i];

      // draws merged bar in red and waits
      renderBars(arr, container, [], [k], []);
      await sleep(speed);
      i++;
      k++;
    }

    // copies any remaining values from the right half
    while (j < rightPart.length) {
      arr[k] = rightPart[j];

      // draws merged bar in red and waits
      renderBars(arr, container, [], [k], []);
      await sleep(speed);
      j++;
      k++;
    }
  }

  // Recursively splits array until each section has one element
  async function mergeSortHelper(left, right) {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    await mergeSortHelper(left, mid);
    await mergeSortHelper(mid + 1, right);
    await merge(left, mid, right);
  }

  // Starts merge sort on the full array
  await mergeSortHelper(0, arr.length - 1);

  const sortedIndices = [];

  // Marks all bars as sorted once the full merge is complete
  for (let i = 0; i < arr.length; i++) {
    sortedIndices.push(i);
  }

  // Redraws bars with all sorted bars highlighted green
  renderBars(arr, container, [], [], sortedIndices);

  // Returns the fully sorted array
  return arr;
}
