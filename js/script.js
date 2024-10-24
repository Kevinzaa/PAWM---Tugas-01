// Kode JavaScript yang sudah ada di file.js

let body = document.querySelector('body');

let profile = document.querySelector('.header .flex .profile');

document.querySelector('#user-btn').onclick = () => {
    profile.classList.toggle('active');
    searchForm.classList.remove('active');
};

let searchForm = document.querySelector('.header .flex .search-form');

document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    profile.classList.remove('active');
};

let sideBar = document.querySelector('.side-bar');

document.querySelector('#menu-btn').onclick = () => {
    sideBar.classList.toggle('active');
    body.classList.toggle('active');
};

document.querySelector('.side-bar .close-side-bar').onclick = () => {
    sideBar.classList.remove('active');
    body.classList.remove('active');
};

window.onscroll = () => {
    profile.classList.remove('active');
    searchForm.classList.remove('active');

    if (window.innerWidth < 1200) {
        sideBar.classList.remove('active');
        body.classList.remove('active');
    }
};

let toggleBtn = document.querySelector('#toggle-btn');
let darkMode = localStorage.getItem('dark-mode');

window.onload = function () {
    if (!localStorage.getItem('theme')) {
        document.body.classList.remove('dark');
    } else if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
    }
};

const enableDarkMode = () => {
    toggleBtn.classList.replace('fa-sun', 'fa-moon');
    body.classList.add('dark');
    localStorage.setItem('dark-mode', 'enabled');
};

const disableDarkMode = () => {
    toggleBtn.classList.replace('fa-moon', 'fa-sun');
    body.classList.remove('dark');
    localStorage.setItem('dark-mode', 'disabled');
};

if (darkMode == 'enabled') {
    enableDarkMode();
}

toggleBtn.onclick = (e) => {
    let darkMode = localStorage.getItem('dark-mode');
    if (darkMode === 'disabled') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
};

toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark');
});

// Molekul section (Kimia)
const canvas = document.getElementById('moleculeCanvas');
const ctx = canvas.getContext('2d');

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawAtom(x, y, label, color) {
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = 'black';
    ctx.fillText(label, x - 5, y + 5);
    ctx.strokeStyle = '#FFB6C1';
}

function drawBond(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

let orange = '#FFA24C';
let blue = '#08C2FF';

function drawLinear() {
    clearCanvas();
    drawAtom(100, 200, "A", orange);
    drawAtom(300, 200, "B", orange);
    drawBond(120, 200, 280, 200);
}

function drawBent() {
    clearCanvas();
    drawAtom(200, 200, "A", blue);
    drawAtom(100, 300, "B", orange);
    drawAtom(300, 300, "C",orange);
    drawBond(180, 220, 110, 280);
    drawBond(220, 220, 280, 280);
}

function drawTrigonal() {
    clearCanvas();
    drawAtom(200, 200, "A", blue);
    drawAtom(100, 300, "B", orange);
    drawAtom(300, 300, "C",orange);
    drawAtom(200, 100, "D",orange);
    drawBond(200, 180, 200, 120);
    drawBond(200, 220, 280, 280);
    drawBond(200, 220, 120, 280);
}

function drawTetrahedral() {
    clearCanvas();
    drawAtom(200, 200,"A", blue);
    drawAtom(100, 300,"B", orange);
    drawAtom(300, 300,"C", orange);
    drawAtom(200, 100,"D", orange);
    drawAtom(200, 50,"E", orange);
    drawBond(200, 220, 120, 280);
    drawBond(200, 220, 280, 280);
    drawBond(200, 180, 200, 120);
    drawBond(200, 180, 200, 70);
}
    
function drawOctahedral() {
    clearCanvas();
    drawAtom(200, 200, "A", blue);
    drawAtom(100, 200, "B",orange);
    drawAtom(300, 200, "C", orange);
    drawAtom(200, 100, "D", orange);
    drawAtom(200, 300, "E", orange);
    drawAtom(200, 50, "F", orange);
    drawAtom(200, 350, "G", orange);
    drawBond(120, 200, 180, 200);
    drawBond(220, 200, 280, 200);
    drawBond(200, 180, 200, 120);
    drawBond(200, 220, 200, 280);
    drawBond(200, 50, 200, 100);
    drawBond(200, 300, 200, 350);
}
    
function drawTShaped() {
    clearCanvas();
    drawAtom(200, 200, "A", blue);
    drawAtom(200, 100, "B", orange);
    drawAtom(300, 200, "C", orange);
    drawAtom(100, 200, "D", orange);
    drawBond(200, 180, 200, 120);
    drawBond(220, 200, 280, 200);
    drawBond(180, 200, 120, 200);
}
    
function drawSquarePlanar() {
    clearCanvas();
    drawAtom(200, 200, "A", blue);
    drawAtom(100, 200, "B",orange);
    drawAtom(300, 200, "C", orange);
    drawAtom(200, 100, "D", orange);
    drawAtom(200, 300, "E", orange);
    drawBond(120, 200, 180, 200);
    drawBond(220, 200, 280, 200);
    drawBond(200, 180, 200, 120);
    drawBond(200, 220, 200, 280);
}

function handleShapeSelection() {
    const shape = document.getElementById('moleculeShapes').value;

    switch (shape) {
        case 'linear':
            drawLinear();
            break;
        case 'bent':
            drawBent();
            break;
        case 'trigonal':
            drawTrigonal();
            break;
        case 'tetrahedral':
            drawTetrahedral();
            break;
        case 'octahedral':
            drawOctahedral();
            break;
        case 'tshaped':
            drawTShaped();
            break;
        case 'squarePlanar':
            drawSquarePlanar();
            break;
        default:
            break;
    }
}