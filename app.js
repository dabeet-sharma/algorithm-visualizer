
// Imports Bubble Sort function and bar drawing function
import { bubbleSort } from "./algorithms/bubbleSort.js";
import { renderBars } from "./visualizer/renderBars.js";

// DOM element references
const barContainer = document.getElementById("barContainer");
const generateBtn = document.getElementById("generateBtn");
const startBtn = document.getElementById("startBtn");
const speedRange = document.getElementById("speedRange");

//  stores current array
let array = [];
let isSorting = false;

// create a random array to default size
function generateRandomArray(size = 30) {
    const arr = [];

    // +20 to keep the bars from being too small 
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * 100) + 20);
    }
    return arr;
}

// function to generate a new array and draw it
function resetArray() {
    if (isSorting) return;
    array = generateRandomArray();
    renderBars(array, barContainer);
}

// Event listeners 
generateBtn.addEventListener("click", resetArray);
startBtn.addEventListener("click", async () => {
    if (isSorting) return;

    isSorting = true;
    generateBtn.disabled = true;
    startBtn.disabled = true;

    const speed = Number(speedRange.value);

    /**
     * Run Bubble Sort and waits for it to finish.
     * send current array into Bubble Sort
     * send bar container so it can redraw bars
     * send speed for animation delay
     * wait until sorting is fully done
     * store the sorted array back into array
     */
    array = await bubbleSort(array, barContainer, speed);

    generateBtn.disabled = false;
    startBtn.disabled = false;
    isSorting = false;
});

// create the first random array 
resetArray();