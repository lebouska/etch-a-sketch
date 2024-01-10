let type = "color";
let gridBorder = "off";

const buttons = document.querySelectorAll('button');
const color = document.querySelector('#colorPick');
const squareSize = document.querySelector('#squareSize');
const sizeValue = document.querySelector('#sizeValue');
const canva = document.querySelector('.canva');
const grid = document.querySelector('#grid');
const pageTitle = document.querySelector('h1');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        changeType(button.value);
    })
})

function changeType(button) {
    if (button == "grid") {
        turnOnGrid();
    } else if (button == "clear") {
        createGrid();
        if (gridBorder == "on") {
            turnOnGrid();
        }
    } else {
        type = button;
        changeButtonColor(type);
    }
}

function changeButtonColor() {
    buttons.forEach((button) => {
        button.style.backgroundColor = "rgb(239, 239, 239)";
        if (button.value == type) {
            button.style.backgroundColor = "grey";
            }
    })
}

squareSize.addEventListener("change", (event) => {
    sizeValue.textContent = `${squareSize.value} X ${squareSize.value}`;
    createGrid();
    if (gridBorder == "on") {
        turnOnGrid();
    }
})

function turnOnGrid() {
    if (gridBorder == "off") {
        for (const square of canva.children) {
        square.style.border = "1px solid grey";
        }
        grid.textContent = "Turn magic lines off";
        gridBorder = "on";
    } else {
        for (const square of canva.children) {
            square.style.border = "";
        }
        grid.textContent = "Turn magic lines on";
        gridBorder = "off";
    }
    
}

function clearCanva() {
    while (canva.firstChild) {
        canva.removeChild(canva.firstChild);
    }
}

function createGrid() {
    clearCanva();
    for (let i = 0; i < Math.pow(squareSize.value, 2); i++) {
        const square = document.createElement('div');
        let height = (600 / squareSize.value);
        square.style.height = `${height}px`;
        square.style.width = `${height}px`;
        square.style.boxSizing = "border-box";
        square.style.backgroundColor = "rgb(255 ,255, 255)";
        square.addEventListener('click', function(event) {
            changeColor(this);
            event.stopPropagation();
        })
        canva.appendChild(square);
    }
}

function randomColor() {
    let colorString = "";
    for (let i = 0; i < 3; i++) {
        if (i != 2) {
            colorString = colorString + Math.floor(Math.random() * 255 + 1) + ", ";
        } else {
            colorString = colorString + Math.floor(Math.random() * 255 + 1);
        } 
    }
    return colorString;
}

function changeColor(place) {
    switch (type) {
        case "color":
            place.style.backgroundColor = color.value;
            break;
        case "gay":
            place.style.backgroundColor = `rgb(${randomColor()})`;
            break;
        case "eraser":
            place.style.backgroundColor = "rgb(255 ,255, 255)";
            break;
        case "picker":
            let colorPick = place.style.backgroundColor;
            color.value = transformColorValue(colorPick);
            type = "color";
            changeButtonColor();
            break;
    }

}

function changeColorTitle(place) {
    switch (type) {
        case "color":
            place.style.color = color.value;
            break;
        case "gay":
            place.style.color = `rgb(${randomColor()})`;
            break;
        case "eraser":
            place.style.color = "rgb(255 ,255, 255)";
            break;
        case "picker":
            let colorPick = place.style.color;
            color.value = transformColorValue(colorPick);
            type = "color";
            changeButtonColor();
            break;
    }

}

function transformColorValue(string) {
    let color = string.slice(4, -1);
    let colorArray = color.split(", ");
    for (let i = 0; i < 3; i++) {
        let colorRRGGBB = (+colorArray[i]).toString(16);
            if (colorRRGGBB.length == 1) {
                colorArray[i] = `0${colorRRGGBB}`;
            } else {
                colorArray[i] = colorRRGGBB;
            }
    }
    color = `#${colorArray[0]}${colorArray[1]}${colorArray[2]}`;
    return color;
}

function createTitle() {
    const title = "Etch-A-Sketch".split("");
    for (let i = 0; i < 13; i ++) {
        const letter = document.createElement('div');
        letter.textContent = title[i];
        letter.addEventListener('click', function(event) {
            changeColorTitle(this);
            event.stopPropagation();
        })        
        pageTitle.appendChild(letter);
    }
}

createGrid();
changeButtonColor();
createTitle();
