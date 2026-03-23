// Brings in the renderBars function
import  { renderBars } from "../visualizer/renderBars.js";

// Sleep returns new promise creating a delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// async for await
export async function bubbleSort(array, container, speed) {

    // Copying array using spread operator to avoid mutating orignal input
    const arr = [...array];
    const sortedIndices = [];

    // Core bubble sort
    for (let i = 0; i < arr.length; i++) {
        // after i passes, the last i elements are already sorted so no check
        for (let j = 0; j < arr.length - 1 - i; j++) {
            
            // draws currently active bars in orange and waits
            renderBars(arr, container, [j, j + 1], [], sortedIndices);
            await sleep(speed);

            // compare the bubble and swap if prev is larger  
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            
                // draws bars in red if swapped and waits 
                renderBars(arr, container, [], [j, j + 1], sortedIndices);
                await sleep(speed);
            }
        }
        // Marks the last unsorted position as sorted
        sortedIndices.push(arr.length - i - 1);
        // Redraws bars after the pass with only sorted bars are highlighted green
        renderBars(arr, container, [], [], sortedIndices);
    }

    // Returns the fully sorted array
    return arr;
}