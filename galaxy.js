
/* =================================
   MD'S WORLD - GALAXY EXPLORER
================================= */

// VISITOR NAME

const visitorName = sessionStorage.getItem("mdVisitorName");

document.getElementById("visitorName").textContent =
    visitorName || "Explorer";


// =================================
// ANIMATED STARFIELD
// =================================

const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");

let stars = [];

function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    stars = [];

    for (let i = 0; i < 180; i++) {
        stars.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            radius: Math.random() * 1.5 + 0.3,
            alpha: Math.random(),
            speed: Math.random() * 0.015 + 0.003
        });
    }
}

function animateStars() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    stars.forEach(star => {
        star.alpha += star.speed;

        if (star.alpha >= 1 || star.alpha <= 0.2) {
            star.speed *= -1;
        }

        ctx.beginPath();

        ctx.arc(
            star.x,
            star.y,
            star.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = `rgba(210,235,255,${star.alpha})`;
        ctx.fill();
    });

    requestAnimationFrame(animateStars);
}

resizeCanvas();
animateStars();

window.addEventListener("resize", resizeCanvas);


// =================================
// GALAXY CAMERA
// =================================

const viewport = document.getElementById("viewport");
const world = document.getElementById("galaxyWorld");

let scale = 0.85;
let panX = 0;
let panY = 0;

let isDragging = false;
let startX = 0;
let startY = 0;
let moved = false;

function updateCamera() {

    world.style.transform = `
        translate(
            calc(-50% + ${panX}px),
            calc(-50% + ${panY}px)
        )
        scale(${scale})
    `;

}

updateCamera();


// =================================
// DRAG MOVEMENT
// =================================

viewport.addEventListener("pointerdown", function(e) {

    if (e.target.closest(".planet")) return;

    isDragging = true;
    moved = false;

    startX = e.clientX - panX;
    startY = e.clientY - panY;

    viewport.classList.add("dragging");

    viewport.setPointerCapture(e.pointerId);

});

viewport.addEventListener("pointermove", function(e) {

    if (!isDragging) return;

    const newX = e.clientX - startX;
    const newY = e.clientY - startY;

    if (
        Math.abs(newX - panX) > 2 ||
        Math.abs(newY - panY) > 2
    ) {
        moved = true;
    }

    panX = newX;
    panY = newY;

    updateCamera();

});

function stopDragging() {

    isDragging = false;
    viewport.classList.remove("dragging");

}

viewport.addEventListener("pointerup", stopDragging);
viewport.addEventListener("pointercancel", stopDragging);


// =================================
// ZOOM SYSTEM
// =================================

function changeZoom(amount) {

    scale = Math.max(
        0.45,
        Math.min(1.5, scale + amount)
    );

    updateCamera();

}

document.getElementById("zoomIn").addEventListener("click", () => {
    changeZoom(0.1);
});

document.getElementById("zoomOut").addEventListener("click", () => {
    changeZoom(-0.1);
});


// MOUSE WHEEL ZOOM

viewport.addEventListener("wheel", function(e) {

    e.preventDefault();

    changeZoom(e.deltaY < 0 ? 0.06 : -0.06);

}, { passive: false });


// RESET VIEW

document.getElementById("resetView").addEventListener("click", function() {

    scale = 0.85;
    panX = 0;
    panY = 0;

    updateCamera();

});



// =================================
// PLANET SELECTION
// =================================

const planets = document.querySelectorAll(".planet");

const panel = document.getElementById("planetPanel");

const panelName = document.getElementById("panelName");

const panelDescription =
    document.getElementById("panelDescription");

const exploreBtn = document.getElementById("exploreBtn");

let selectedPlanet = null;

planets.forEach(planet => {

    planet.addEventListener("click", function() {

        selectedPlanet = planet;

        panelName.textContent = planet.dataset.name;

        panelDescription.textContent =
            planet.dataset.description;

        // Save selected destination
        panel.dataset.destination = planet.dataset.destination;

        panel.classList.add("active");

    });

});


// =================================
// CLOSE PANEL
// =================================

document.getElementById("closePanel").addEventListener("click", function() {

    panel.classList.remove("active");

    selectedPlanet = null;

});


// =================================
// EXPLORE DESTINATION
// =================================

exploreBtn.addEventListener("click", function () {

    const destination = panel.dataset.destination;

    if (!destination) {
        alert("Destination not found!");
        return;
    }

    window.location.href = "planets/" + destination + ".html";

});


// =================================
// INITIALIZATION
// =================================

console.log("MD's World Galaxy Explorer initialized.");
console.log("Welcome, " + (visitorName || "Explorer") + "!");

