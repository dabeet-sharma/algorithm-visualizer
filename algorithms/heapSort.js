// Brings in the renderBars function
import { renderBars } from "../visualizer/renderBars.js";

// Sleep returns new promise creating a delay
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// async for await
export async function heapSort(array, container, speed) {
  // Copying array using spread operator to avoid mutating orignal input
  const arr = [...array];
  const sortedIndices = [];

  // Restores max-heap property for the subtree rooted at i
  async function heapify(n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    // Tracks parent and children currently being compared
    const activeIndices = [i];
    if (left < n) activeIndices.push(left);
    if (right < n) activeIndices.push(right);

    // draws currently active bars in orange and waits
    renderBars(arr, container, activeIndices, [], sortedIndices);
    await sleep(speed);

    // checks if left child is larger than current largest
    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    // checks if right child is larger than current largest
    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    // swaps parent with the largest child if needed
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];

      // draws bars in red if swapped and waits
      renderBars(arr, container, [], [i, largest], sortedIndices);
      await sleep(speed);

      // continues heapifying the affected subtree
      await heapify(n, largest);
    }
  }

  // Builds the initial max heap from the array
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    await heapify(arr.length, i);
  }

  // Repeatedly moves the largest element to the end
  for (let end = arr.length - 1; end > 0; end--) {
    [arr[0], arr[end]] = [arr[end], arr[0]];

    // Marks the extracted max element as sorted
    sortedIndices.push(end);

    // draws bars in red for the root swap and waits
    renderBars(arr, container, [], [0, end], sortedIndices);
    await sleep(speed);

    // Restores heap property on the reduced heap
    await heapify(end, 0);
  }

  // Marks the final remaining element as sorted
  sortedIndices.push(0);

  // Redraws bars with all sorted bars highlighted green
  renderBars(arr, container, [], [], sortedIndices);

  // Returns the fully sorted array
  return arr;
}
