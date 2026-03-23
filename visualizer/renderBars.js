export function renderBars(array, container, activeIndices = [], swapIndices = [], sortedIndices = []) {
    
    //  clears everything currently inside the bar container
    container.innerHTML = "";


    array.forEach((value, index) => {

        // Creates a new <div> in memory for this bar.
        const bar = document.createElement("div");
        // Adds the bar CSS class to it
        bar.classList.add("bar");
        // Visually scalling the bar height
        bar.style.height = `${value * 3}px`;


        // Go orange if active, red if swapped, or green if sorted. 
        if (activeIndices.includes(index)) {
            bar.classList.add("active");
        }
        if (swapIndices.includes(index)) {
            bar.classList.add("swap");
        }
        if (sortedIndices.includes(index)) {
            bar.classList.add("sorted");
        }

        // Place this bar into the container
        container.appendChild(bar);
    });
}