// Brings in the renderBars function
import { renderBars } from "../visualizer/renderBars.js";

// Sleep returns new promise creating a delay
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// async for await
export async function quickSort(array, container, speed) {
  // Copying array using spread operator to avoid mutating orignal input
  const arr = [...array];
  const sortedIndices = [];

  // Partitions the array around the pivot
  async function partition(low, high) {
    // Uses the last element as the pivot
    const pivot = arr[high];
    let i = low - 1;

    // compares each element with the pivot
    for (let j = low; j < high; j++) {
      // draws currently active bars in orange and waits
      renderBars(arr, container, [j, high], [], sortedIndices);
      await sleep(speed);

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];

        // draws bars in red if swapped and waits
        renderBars(arr, container, [], [i, j], sortedIndices);
        await sleep(speed);
      }
    }

    // places the pivot in its final sorted position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

    // draws pivot swap in red and waits
    renderBars(arr, container, [], [i + 1, high], sortedIndices);
    await sleep(speed);

    return i + 1;
  }

  // Recursively sorts elements on both sides of the pivot
  async function quickSortHelper(low, high) {
    if (low < high) {
      const pivotIndex = await partition(low, high);

      // Marks pivot position as sorted
      sortedIndices.push(pivotIndex);

      // Redraws bars after partition with sorted pivots highlighted green
      renderBars(arr, container, [], [], sortedIndices);

      await quickSortHelper(low, pivotIndex - 1);
      await quickSortHelper(pivotIndex + 1, high);
    } else if (low === high) {
      // Marks a single remaining element as sorted
      if (!sortedIndices.includes(low)) {
        sortedIndices.push(low);
      }
    }
  }

  // Starts quick sort on the full array
  await quickSortHelper(0, arr.length - 1);

  // Marks any remaining indices as sorted at the end
  for (let i = 0; i < arr.length; i++) {
    if (!sortedIndices.includes(i)) {
      sortedIndices.push(i);
    }
  }

  // Redraws bars with all sorted bars highlighted green
  renderBars(arr, container, [], [], sortedIndices);

  // Returns the fully sorted array
  return arr;
}
