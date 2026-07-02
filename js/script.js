// ==========================================
// AI Caregiver
// script.js
// ==========================================

// Wait until page loads
document.addEventListener("DOMContentLoaded", () => {

    initScrollAnimation();
    initSmoothScroll();
    initBackToTop();
    initStickyNavbar();
    initMobileMenu();

});

// ==========================================
// Fade In Animation
// ==========================================

function initScrollAnimation() {

    const elements = document.querySelectorAll(
        ".feature-card, .review-card, .stat-card, .section-title"
    );

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {

        threshold: 0.15

    });

    elements.forEach(element => {

        element.classList.add("fade-in");
        observer.observe(element);

    });

}

// ==========================================
// Smooth Scroll
// ==========================================

function initSmoothScroll() {

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {

        link.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        });

    });

}

// ==========================================
// Sticky Navbar Shadow
// ==========================================

function initStickyNavbar() {

    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {

            header.style.boxShadow =
                "0 8px 25px rgba(0,0,0,.08)";

        } else {

            header.style.boxShadow =
                "0 5px 20px rgba(0,0,0,.05)";

        }

    });

}

// ==========================================
// Back To Top Button
// ==========================================

function initBackToTop() {

    const button = document.createElement("div");

    button.className = "back-to-top";

    button.innerHTML = '<i class="fas fa-arrow-up"></i>';

    document.body.appendChild(button);

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            button.classList.add("active");

        } else {

            button.classList.remove("active");

        }

    });

    button.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

// ==========================================
// Mobile Menu
// ==========================================

function initMobileMenu() {

    const navbar = document.querySelector(".navbar");

    const navLinks = document.querySelector(".nav-links");

    const toggle = document.createElement("div");

    toggle.className = "menu-toggle";

    toggle.innerHTML = '<i class="fas fa-bars"></i>';

    navbar.appendChild(toggle);

    toggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        if (navLinks.classList.contains("active")) {

            toggle.innerHTML =
                '<i class="fas fa-times"></i>';

        } else {

            toggle.innerHTML =
                '<i class="fas fa-bars"></i>';

        }

    });

}

// ==========================================
// Button Hover Ripple
// ==========================================

const buttons = document.querySelectorAll(
    ".btn-primary, .btn-outline"
);

buttons.forEach(button => {

    button.addEventListener("mouseenter", () => {

        button.style.transform = "translateY(-3px)";

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "translateY(0px)";

    });

});

// ==========================================
// Hero Image Animation
// ==========================================

const heroImage = document.querySelector(".hero-image img");

if (heroImage) {

    heroImage.addEventListener("mousemove", e => {

        heroImage.style.transform =
            "scale(1.02)";

    });

    heroImage.addEventListener("mouseleave", () => {

        heroImage.style.transform =
            "scale(1)";

    });

}

// ==========================================
// Footer Year
// ==========================================

const year = new Date().getFullYear();

const copyright = document.querySelector(".copyright");

if (copyright) {

    copyright.innerHTML =
        `© ${year} AI Caregiver. All Rights Reserved.`;

}

/* =====================================================
   ROLE SELECTION
===================================================== */

const elderlyCard = document.getElementById("elderlyCard");
const caregiverCard = document.getElementById("caregiverCard");
const continueBtn = document.getElementById("continueBtn");

let selectedRole = null;

function selectRole(role) {

    selectedRole = role;

    localStorage.setItem("userRole", role);

    elderlyCard.classList.remove("active");
    caregiverCard.classList.remove("active");

    if (role === "elderly") {

        elderlyCard.classList.add("active");

    } else {

        caregiverCard.classList.add("active");

    }

    continueBtn.disabled = false;

}

if (continueBtn) {

    continueBtn.disabled = true;

    continueBtn.addEventListener("click", function () {

        if (!selectedRole) {

            alert("Please select a role before continuing.");

            return;

        }

        window.location.href = "login.html";

    });

}