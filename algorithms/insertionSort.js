// Brings in the renderBars function
import { renderBars } from "../visualizer/renderBars.js";

// Sleep returns new promise creating a delay
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// async for await
export async function insertionSort(array, container, speed) {
  // Copying array using spread operator to avoid mutating orignal input
  const arr = [...array];
  const sortedIndices = [0];

  // Draws first bar as sorted since a single element is already in order
  renderBars(arr, container, [], [], sortedIndices);

  // Core insertion sort
  for (let i = 1; i < arr.length; i++) {
    // Stores current value and starts comparing from the left side
    let key = arr[i];
    let j = i - 1;

    // draws currently active bar in orange and waits
    renderBars(arr, container, [i], [], sortedIndices);
    await sleep(speed);

    // shifts larger elements one position to the right
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];

      // draws bars in red while shifting and waits
      renderBars(arr, container, [j, j + 1], [j, j + 1], sortedIndices);
      await sleep(speed);
      j--;
    }

    // inserts the key into its correct sorted position
    arr[j + 1] = key;

    // Marks the current sorted portion from 0 to i
    for (let k = 0; k <= i; k++) {
      if (!sortedIndices.includes(k)) {
        sortedIndices.push(k);
      }
    }

    // Redraws bars after insertion with sorted bars highlighted green
    renderBars(arr, container, [], [], sortedIndices);
    await sleep(speed);
  }

  // Returns the fully sorted array
  return arr;
}
