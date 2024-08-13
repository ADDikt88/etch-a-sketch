const container = document.querySelector("#container");
let divRow = []
let gridSize = 16;
let newGridSize = 0;
valid = false;
let areaSize;
let colorChoice = "red";

function drawGrid(sizeInput){
    areaSize = 960;
    for (let i = 0; i < sizeInput; i++){
        divRow[i] = document.createElement("div");
        divRow[i].setAttribute("class", "row");
        for (let j = 0; j < sizeInput; j++){
            let divBlock = document.createElement("div");
            divBlock.setAttribute("class", "block");
            divBlock.style.width = areaSize / gridSize + "px";
            divBlock.style.height = areaSize / gridSize + "px";
            divRow[i].appendChild(divBlock);
        }
        container.appendChild(divRow[i]);
    }
   
}


function changeGridSize (sizeInput) {
    for (let i = 0; i < gridSize; i++){
        container.removeChild(divRow[i]);
    }
    gridSize = sizeInput;
    drawGrid(gridSize);
    draw();

}

/** Draw the Grid */
drawGrid(gridSize);

const changeGridSizeBtn = document.querySelector("#change-grid-size");

changeGridSizeBtn.addEventListener ('click', () => {
    valid = false;
    if (confirm("Changing grid size, erases your current sketch. Is this okay?"))
    {
        while (!valid) {
            newGridSize = prompt("What grid size would you like to draw on? (Range: 10-99)");
            if (newGridSize === null) {
                newGridSize = gridSize;
                break;
            }
            console.log(newGridSize);
            console.log(Number.isInteger(Number(newGridSize)));
            if (newGridSize < 100 && newGridSize >= 10 && Number.isInteger(Number(newGridSize)))
            {
                valid = true;
                changeGridSize(newGridSize);
            }
            
        }
    }    
    

    
});



function draw() {

    isDrawing = false;
    let blocks = document.querySelectorAll(".block");
    
    container.addEventListener('mousedown', (event) => {
        isDrawing = true;
        event.preventDefault();
        event.target.style.backgroundColor = colorChoice;
       
    });

    container.addEventListener('mouseup', (event) => {
        isDrawing = false;
    });

    for (let i = 0; i < gridSize*gridSize; i++)
        {
            blocks[i].addEventListener('mouseover', (event) => {
            //console.log("mouseover");
            if(isDrawing){
                blocks[i].style.backgroundColor = colorChoice;
            }
        });
        }        

}

const redBtn = document.querySelector("#red");
redBtn.style.backgroundColor = "red";
redBtn.style.color = "white";
const blueBtn = document.querySelector("#blue");
const greenBtn = document.querySelector("#green");
const eraserBtn = document.querySelector("#eraser");
const clearGridBtn = document.querySelector("#clear-grid");

const allBtns = document.querySelectorAll("button");


function resetButtons () {
    for (let i = 2; i < 6; i++)
        {
            allBtns[i].style.backgroundColor = "";
            allBtns[i].style.color = ""; 
            allBtns[i].style.border = ""; 
        }
}

redBtn.addEventListener('click', () => {
    resetButtons();
    redBtn.style.backgroundColor = "red";
    redBtn.style.color = "white";
    colorChoice = "red";
});

blueBtn.addEventListener('click', () => {
    resetButtons();
    blueBtn.style.backgroundColor = "blue";
    blueBtn.style.color = "white";
    colorChoice = "blue";
});

greenBtn.addEventListener('click', () => {
    resetButtons();
    greenBtn.style.backgroundColor = "green";
    greenBtn.style.color = "white";
    colorChoice = "green";
});

eraserBtn.addEventListener('click', () => {
    resetButtons();
    eraserBtn.style.backgroundColor = "white";
    eraserBtn.style.color = "black";
    eraserBtn.style.border = "1px solid #FFBF00";
    colorChoice = "white";
});

clearGridBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to clear?")) {
        changeGridSize (gridSize);
    }

});

/*** Call main functions */

draw();






