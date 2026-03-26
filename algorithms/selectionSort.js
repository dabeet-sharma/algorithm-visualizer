// Brings in the renderBars function
import  { renderBars } from "../visualizer/renderBars.js";

// Sleep returns new promise creating a delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// async for await
export async function selectionSort(array, container, speed) {

    // Copying array using spread operator to avoid mutating orignal input
    const arr = [...array];
    const sortedIndices = [];

    // Core Selection sort
    for (let i = 0; i < arr.length; i++) {

        let smallestIndex = i; 
        for (let j = i+1; j < arr.length; j++) {            
            
            renderBars(arr, container, [smallestIndex,j], [], sortedIndices);
            await sleep(speed);
            
            if(arr[smallestIndex] > arr[j]){
            
                smallestIndex = j;  
            }
            
        }
        renderBars(arr, container, [], [i,smallestIndex], sortedIndices);
        await sleep(speed);


        // perform swap 
        if (smallestIndex != i){
        
            let small = arr[i]; 
            arr[i]=arr[smallestIndex];
            arr[smallestIndex]= small; 
        }
        
        renderBars(arr, container, [], [i,smallestIndex], sortedIndices);
        await sleep(speed);

        // Marks the unsorted position as sorted
        sortedIndices.push(i);
        renderBars(arr, container, [], [i,smallestIndex], sortedIndices);
    }

    // Returns the fully sorted array
    return arr;
}