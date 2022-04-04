const left = document.getElementById('left');
const colors = document.getElementById('colors');
const rainbow = document.getElementById('rainbow');
const eraser = document.getElementById('eraser');
const clear = document.getElementById('clear')
const slider = document.getElementById('slider');
const sliderLabel = document.getElementById('sliderLabel');
const wrapper = document.getElementById('wrapper');

//Change color of gridcell on mouseclick
let color= 'brown'
let previuseColor;
const changeCellColor = function(e) {
    e.target.style.backgroundColor = `${color}`;
}
//color button
allColors = ['brown', 'blue', 'green', 'yellow', 'purple', 'black']
const chooseColor = function(e) {
    colorDiv = document.createElement('div');
    colorDiv.style.cssText = "display: grid; grid-template-columns: repeat(3, 1fr);\
     grid-template-rows: repeat(2, 1fr); border:1px solid black; height: 10vh; width: 75%;"
    for(let i=0; i<allColors.length; i++) {
        colorBox = document.createElement('div');
        colorBox.setAttribute('id', allColors[i])
        colorBox.style.cssText = `background-color: ${colorBox.id}; border: 1px solid black; width:100%; height:100%;`;
        colorBox.onclick = () => {
            left.removeChild(colorDiv);
            if (random) {
                wrapper.childNodes.forEach(child => child.removeEventListener('mousedown', randomColor));
                random = !random;
            }
            return color=allColors[i];
        }
        console.log(colorBox);
        colorDiv.appendChild(colorBox);
    }
    left.insertBefore(colorDiv, rainbow);
}
colors.addEventListener('click', chooseColor);
//create a num*num grid in the right container
const grid = function(num){
    while(wrapper.lastChild) {
        wrapper.removeChild(wrapper.lastChild);
    }
    wrapper.style.cssText = `display: grid; grid-template-columns: 
        repeat(${num}, 1fr); grid-template-rows: repeat(${num}, 1fr); width:80%; height:80%; gap:1px;`;
    let identity = 0;
    for(let i=0; i<num; i++) {
        for (let j=0; j<num; j++) {
            //create gridcells and append them to wrapper
            let gridCell = document.createElement('div');
            gridCell.classList.add('items');
            gridCell.setAttribute('id', `${identity}`);
            gridCell.style.cssText = 'width:100%; height:100%; border: 1px solid black; border-radius: 6px; aspect-ratio: 1;';
            gridCell.addEventListener('mousedown', changeCellColor)
            wrapper.appendChild(gridCell);
            //increment identity for next cell
            ++identity;
        }
    }
}
//initiate grid with default slider value
grid(slider.value);
//display slider value and pass value to grid()
sliderLabel.textContent = slider.value;
slider.oninput = function() {
    sliderLabel.textContent = this.value;
}
slider.onchange = function() {
    grid(this.value);
}
//clear grid
clear.addEventListener('click', () => wrapper.childNodes.forEach(
    function (node) {
        return node.style.backgroundColor = 'white';
    }));
//Erase chosen gridcell
let erasing = false;
eraser.addEventListener('click', () => {
    erasing = !erasing;
    if (erasing) {
        if (random) {
            wrapper.childNodes.forEach(child => child.removeEventListener('mousedown', randomColor))
        }
        previuseColor = color;
        return color = 'white';
    }else {
        if (random) {
            return (wrapper.childNodes.forEach(child => child.addEventListener('mousedown', randomColor)));
        }
        return color=previuseColor;
}});
//randomize color choice
const randomColor = function() {
    const hex = Math.floor(Math.random()*16777215).toString(16);
    return color = `#${hex}`;
}
random = false;
rainbow.addEventListener('click', () => {
    random = !random;
    if(random){
        if (erasing) erasing = !erasing;
        wrapper.childNodes.forEach(child => child.addEventListener('mousedown', randomColor));
    } else {
        wrapper.childNodes.forEach(child => child.removeEventListener('mousedown', randomColor));
        return color = previuseColor;
    }
})