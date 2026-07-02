/* ==========================================
   REMI+
   script.js
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initRoleSelection();

    initSmoothScroll();

    initBackToTop();

    initAnimations();

});

/* ==========================================
   ROLE SELECTION
========================================== */

function initRoleSelection() {

    const elderlyCard = document.getElementById("elderlyCard");

    const caregiverCard = document.getElementById("caregiverCard");

    const continueBtn = document.getElementById("continueBtn");

    // Exit if this page doesn't contain role selection
    if (!elderlyCard || !caregiverCard || !continueBtn) {

        return;

    }

    let selectedRole = null;

    // ======================================
    // Elderly Card
    // ======================================

    elderlyCard.addEventListener("click", () => {

        selectRole("elderly");

    });

    // ======================================
    // Caregiver Card
    // ======================================

    caregiverCard.addEventListener("click", () => {

        selectRole("caregiver");

    });

    // ======================================
    // Continue Button
    // ======================================

    continueBtn.disabled = true;

    continueBtn.addEventListener("click", () => {

        if (!selectedRole) {

            return;

        }

        localStorage.setItem("userRole", selectedRole);

        window.location.href = "login.html";

    });

    // ======================================
    // Function
    // ======================================

    function selectRole(role) {

        selectedRole = role;

        elderlyCard.classList.remove("active");

        caregiverCard.classList.remove("active");

        if (role === "elderly") {

            elderlyCard.classList.add("active");

        } else {

            caregiverCard.classList.add("active");

        }

        continueBtn.disabled = false;

    }

}

/* ==========================================
   SMOOTH SCROLL
========================================== */

function initSmoothScroll() {

    const links = document.querySelectorAll('a[href^="#"]');

    if (!links.length) {

        return;

    }

    links.forEach(link => {

        link.addEventListener("click", function (event) {

            const target = document.querySelector(
                this.getAttribute("href")
            );

            if (!target) {

                return;

            }

            event.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        });

    });

}

/* ==========================================
   BACK TO TOP BUTTON
========================================== */

function initBackToTop() {

    const button = document.createElement("button");

    button.className = "back-to-top";

    button.setAttribute("aria-label", "Back to Top");

    button.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';

    document.body.appendChild(button);

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

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

/* ==========================================
   PAGE UTILITIES
========================================== */

function initAnimations() {

    const elements = document.querySelectorAll(

        ".fade-in"

    );

    if (!elements.length) {

        return;

    }

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },

        {

            threshold: 0.15

        }

    );

    elements.forEach((element) => {

        observer.observe(element);

    });

}