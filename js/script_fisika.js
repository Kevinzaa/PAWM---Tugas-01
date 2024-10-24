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

const canvas = document.getElementById('electricFieldCanvas');
const ctx = canvas.getContext('2d');

let charges = [
    { x: 150, y: 300, charge: 5, radius: 20, isDragging: false },
    { x: 450, y: 300, charge: -5, radius: 20, isDragging: false }
];

let k = 8.99e9;

function drawCharge(charge) {
    ctx.beginPath();
    ctx.arc(charge.x, charge.y, charge.radius, 0, Math.PI * 2);
    ctx.fillStyle = charge.charge > 0 ? 'red' : 'blue';
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = 'grey';
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(charge.charge > 0 ? '+' : '-', charge.x, charge.y);

    ctx.fillStyle = 'grey';
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`${charge.charge} C`, charge.x, charge.y - charge.radius - 15); 
}

function drawElectricFieldLine(startX, startY, endX, endY) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = 'green';
    ctx.stroke();
    ctx.closePath();
}

function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

const PIXELS_PER_METER = 100; 

function calculateForce(q1, q2, distanceInPixels) {

    let distanceInMeters = distanceInPixels / PIXELS_PER_METER;

    return (k * Math.abs(q1 * q2)) / Math.pow(distanceInMeters, 2);
}

function drawDistanceText(chargeA, chargeB, distance) {

    const pixelsPerCm = 37.7952755906;
    const distanceInCm = distance / pixelsPerCm;

    const midX = (chargeA.x + chargeB.x) / 2;
    const midY = (chargeA.y + chargeB.y) / 2;

    ctx.fillStyle = 'grey';
    ctx.font = "14px Arial";
    ctx.fillText(`Jarak: ${distanceInCm.toFixed(2)} cm`, midX, midY - 10); 
}

function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    charges.forEach(charge => drawCharge(charge));

    const chargeA = charges[0];
    const chargeB = charges[1];

    let distance = calculateDistance(chargeA.x, chargeA.y, chargeB.x, chargeB.y);
    let force = calculateForce(chargeA.charge, chargeB.charge, distance);

    let forceExponential = force.toExponential(2); 

    ctx.fillStyle = 'grey';
    ctx.fillText(`Gaya Coulomb: ${forceExponential} N`, canvas.width / 2, 20);

    drawElectricFieldLine(chargeA.x, chargeA.y, chargeB.x, chargeB.y); 
    drawDistanceText(chargeA, chargeB, distance);

    charges.forEach((charge) => {
        if (charge.isDragging) {
            charge.x = mouseX;
            charge.y = mouseY;
        }
    });
}

let mouseX = 0, mouseY = 0;
canvas.addEventListener('mousedown', (e) => {
    mouseY = e.offsetY;
    mouseX = e.offsetX;

    charges.forEach((charge) => {
        let distance = calculateDistance(mouseX, mouseY, charge.x, charge.y);
        if (distance < charge.radius) {
            charge.isDragging = true;
        }
    });
});

canvas.addEventListener('mousemove', (e) => {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
});

canvas.addEventListener('mouseup', () => {
    charges.forEach((charge) => {
        charge.isDragging = false;
    });
});

function resetCharges() {
    charges = [
        { x: 150, y: 300, charge: 5, radius: 20, isDragging: false },
        { x: 450, y: 300, charge: -5, radius: 20, isDragging: false }
    ];
    drawScene();
}

setInterval(drawScene, 100);