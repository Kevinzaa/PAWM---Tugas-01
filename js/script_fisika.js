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

const canvas = document.getElementById('electricFieldCanvas');
const ctx = canvas.getContext('2d');

let charges = [
    { x: 150, y: 300, charge: 5, radius: 20, isDragging: false }, // Muatan positif
    { x: 450, y: 300, charge: -5, radius: 20, isDragging: false } // Muatan negatif
];

let k = 8.99e9; // Konstanta Coulomb

function drawCharge(charge) {
    ctx.beginPath();
    ctx.arc(charge.x, charge.y, charge.radius, 0, Math.PI * 2);
    ctx.fillStyle = charge.charge > 0 ? 'red' : 'blue';
    ctx.fill();
    ctx.closePath();

    // Tampilkan tanda (+) atau (-) di tengah bola
    ctx.fillStyle = 'grey';
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(charge.charge > 0 ? '+' : '-', charge.x, charge.y);

    // Tampilkan informasi terkait besar muatan
    ctx.fillStyle = 'grey';
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`${charge.charge} C`, charge.x, charge.y - charge.radius - 15); // Tampilkan muatan di atas bola
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

const PIXELS_PER_METER = 100; // Misalkan 100 piksel = 1 meter

function calculateForce(q1, q2, distanceInPixels) {
    // Konversi jarak dari piksel ke meter
    let distanceInMeters = distanceInPixels / PIXELS_PER_METER;

    // Hukum Coulomb: F = k * |q1 * q2| / r^2, dengan r dalam meter
    return (k * Math.abs(q1 * q2)) / Math.pow(distanceInMeters, 2);
}

function drawDistanceText(chargeA, chargeB, distance) {
    // Konversi jarak dari piksel ke sentimeter (1 cm = 37.7952755906 piksel)
    const pixelsPerCm = 37.7952755906;
    const distanceInCm = distance / pixelsPerCm;

    // Hitung titik tengah antara kedua muatan
    const midX = (chargeA.x + chargeB.x) / 2;
    const midY = (chargeA.y + chargeB.y) / 2;

    // Tampilkan jarak di titik tengah dalam satuan cm
    ctx.fillStyle = 'grey';
    ctx.font = "14px Arial";
    ctx.fillText(`Jarak: ${distanceInCm.toFixed(2)} cm`, midX, midY - 10); // Tampilkan jarak dalam cm
}

function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gambarkan muatan
    charges.forEach(charge => drawCharge(charge));

    // Gambar medan listrik dan garis gaya
    const chargeA = charges[0];
    const chargeB = charges[1];

    let distance = calculateDistance(chargeA.x, chargeA.y, chargeB.x, chargeB.y);
    let force = calculateForce(chargeA.charge, chargeB.charge, distance);

    // Konversi gaya ke dalam bentuk notasi ilmiah (10 pangkat)
    let forceExponential = force.toExponential(2); // Angka 2 di sini menentukan 2 digit setelah koma

    // Tampilkan gaya Coulomb di bagian bawah layar dalam bentuk eksponensial
    ctx.fillStyle = 'grey';
    ctx.fillText(`Gaya Coulomb: ${forceExponential} N`, canvas.width / 2, 20);

    // Gambar garis medan listrik antara muatan
    drawElectricFieldLine(chargeA.x, chargeA.y, chargeB.x, chargeB.y);

    // Tampilkan jarak antara muatan di titik tengah
    drawDistanceText(chargeA, chargeB, distance);

    // Perbarui posisi muatan jika sedang diseret
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