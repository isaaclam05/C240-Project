/* ===========================================
   Care Companion
   Splash Screen JavaScript
=========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initialiseSplash();

});

/* ===========================================
   INITIALISE
=========================================== */

function initialiseSplash() {

    updateClock();

    setInterval(updateClock, 1000);

    setupButtons();

    pageEntrance();

}

/* ===========================================
   BUTTONS
=========================================== */

function setupButtons() {

    const getStarted = document.getElementById("getStartedBtn");

    if (!getStarted) return;

    getStarted.addEventListener("click", () => {

        getStarted.disabled = true;

        getStarted.innerHTML = `
            Getting Started...
            <i class="bi bi-arrow-repeat spin"></i>
        `;

        getStarted.style.opacity = ".85";

        document.body.style.opacity = "0";

        setTimeout(() => {

            window.location.href = "login.html";

        }, 800);

    });

}

/* ===========================================
   PAGE ANIMATION
=========================================== */

function pageEntrance() {

    document.body.style.opacity = "0";

    document.body.style.transition = ".6s";

    setTimeout(() => {

        document.body.style.opacity = "1";

    }, 100);

}

/* ===========================================
   BUTTON RIPPLE
=========================================== */

document.addEventListener("click", function (event) {

    const button = event.target.closest("button");

    if (!button) return;

    const ripple = document.createElement("span");

    ripple.className = "ripple";

    const rect = button.getBoundingClientRect();

    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;

    button.appendChild(ripple);

    setTimeout(() => {

        ripple.remove();

    }, 600);

});

/* ===========================================
   CLOCK
=========================================== */

function updateClock() {

    const time = document.getElementById("time");

    if (!time) return;

    const now = new Date();

    let hour = now.getHours();
    let minute = now.getMinutes();

    hour = hour.toString().padStart(2, "0");
    minute = minute.toString().padStart(2, "0");

    time.textContent = `${hour}:${minute}`;

}

/* ===========================================
   GREETING
=========================================== */

function greeting() {

    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";

    if (hour < 18) return "Good Afternoon";

    return "Good Evening";

}

console.log("Splash Loaded Successfully");