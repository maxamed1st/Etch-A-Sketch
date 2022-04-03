const container = document.getElementById('container');
const left = document.getElementById('left');
const colors = document.getElementById('colors');
const rainbow = document.getElementById('rainbow');
const eraser = document.getElementById('eraser');
const clear = document.getElementById('clear')
const right = document.getElementById('right');
const slider = document.getElementById('slider');
const sliderLabel = document.getElementById('sliderLabel');
const sliderDiv = document.getElementById('sliderDiv');
const wrapper = document.getElementById('wrapper');

//Change color of gridcell on mouseclick
const color= 'brown'
const changeCellColor = function(e) {
    e.target.style.backgroundColor = `${color}`;
}
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
            let gridCell = document.createElement('div');
            gridCell.classList.add('items');
            gridCell.setAttribute('id', `${identity}`);
            gridCell.style.cssText = 'width:100%; height:100%; border: 1px solid black; border-radius: 6px; aspect-ratio: 1;';
            gridCell.addEventListener('mousedown', changeCellColor)
            wrapper.appendChild(gridCell);
            //testing
            let cell = document.getElementById(`${identity}`);
            console.log(cell.id)
            //increment identity for next cell
            ++identity;
        }
    }
}
//initiate grid with defoult slider value
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
