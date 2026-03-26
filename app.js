
// Imports Bubble Sort function and bar drawing function
import { bubbleSort } from "./algorithms/bubbleSort.js";
import { selectionSort } from "./algorithms/selectionSort.js";
import { renderBars } from "./visualizer/renderBars.js";

// DOM element references
const barContainer = document.getElementById("barContainer");
const generateBtn = document.getElementById("generateBtn");
const startBtn = document.getElementById("startBtn");
const speedRange = document.getElementById("speedRange");
const algorithmSelect = document.getElementById("algorithmSelect");

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

// Function to get selected algorithm by user
    function getSelectedAlgorithm() {
    const selected = algorithmSelect.value;
    switch (selected) {
        case "selection":
            return selectionSort;
        case "insertion":
            return insertionSort;
        case "merge":
            return mergeSort;
        case "quick":
            return quickSort;
        case "bubble":
            return bubbleSort;
        default:
            return bubbleSort;
    }
}

// Event listeners 
generateBtn.addEventListener("click", resetArray);
startBtn.addEventListener("click", async () => {
    if (isSorting) return;

    isSorting = true;
    generateBtn.disabled = true;
    startBtn.disabled = true;
    algorithmSelect.disabled = true;
    speedRange.disabled = true; 

    // Get speed and user choice of sort
    const speed = Number(speedRange.value);
    const selectedSort = getSelectedAlgorithm();


    /**
     * Run selected sort and wait for it to finish.
     * send current array into selected Sort
     * send bar container so it can redraw bars
     * send speed for animation delay
     * wait until sorting is fully done
     * store the sorted array back into array
     */
    array = await selectedSort(array, barContainer, speed);

    isSorting = false;
    generateBtn.disabled = false;
    startBtn.disabled = false;
    algorithmSelect.disabled = false;
    speedRange.disabled = false; 
});

// create the first random array 
resetArray();