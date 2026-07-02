/* =====================================================
   REMI+
   script.js
===================================================== */

"use strict";

/* =====================================================
   APPLICATION START
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initialiseApplication();

});

/* =====================================================
   INITIALISE APPLICATION
===================================================== */

function initialiseApplication() {

    initialiseRoleSelection();

    initialiseLoginPage();

    initialiseDashboard();

    initialiseAppointments();

    initialiseMedication();

    initialiseVoiceAssistant();

    initialiseAccountPage();

    initialiseBottomNavigation();

    initialiseSmoothScroll();

    initialiseBackToTop();

    initialiseAnimations();

}

/* =====================================================
   GLOBAL HELPERS
===================================================== */

function $(selector) {

    return document.querySelector(selector);

}

function $$(selector) {

    return document.querySelectorAll(selector);

}

/* =====================================================
   CURRENT PAGE
===================================================== */

const currentPage = window.location.pathname
    .split("/")
    .pop();

/* =====================================================
   LOCAL STORAGE
===================================================== */

function saveData(key, value) {

    localStorage.setItem(

        key,

        JSON.stringify(value)

    );

}

function loadData(key, defaultValue = null) {

    const value = localStorage.getItem(key);

    if (value === null) {

        return defaultValue;

    }

    try {

        return JSON.parse(value);

    }

    catch {

        return defaultValue;

    }

}

/* =====================================================
   APPLICATION STATE
===================================================== */

const App = {

    role: loadData("userRole", null),

    user: loadData("currentUser", null),

    medications: loadData("medications", []),

    appointments: loadData("appointments", []),

    listening: false

};

/* =====================================================
   TOAST MESSAGE
===================================================== */

function showToast(message) {

    let toast = $("#toast");

    if (!toast) {

        toast = document.createElement("div");

        toast.id = "toast";

        toast.className = "toast";

        document.body.appendChild(toast);

    }

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}

/* =====================================================
   PAGE DETECTION
===================================================== */

function isPage(page) {

    return currentPage === page;

}

/* =====================================================
   SAFE ELEMENT CHECK
===================================================== */

function exists(selector) {

    return document.querySelector(selector) !== null;

}

/* =====================================================
   SMOOTH SCROLL
===================================================== */

function initialiseSmoothScroll() {

    const links = $$('a[href^="#"]');

    if (!links.length) {

        return;

    }

    links.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetID = link.getAttribute("href");

            if (targetID === "#") {

                return;

            }

            const target = document.querySelector(targetID);

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

/* =====================================================
   BACK TO TOP BUTTON
===================================================== */

function initialiseBackToTop() {

    const button = document.createElement("button");

    button.className = "back-to-top";

    button.setAttribute("type", "button");

    button.setAttribute("aria-label", "Back To Top");

    button.innerHTML =

        '<i class="fa-solid fa-arrow-up"></i>';

    document.body.appendChild(button);

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            button.classList.add("active");

        }

        else {

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

/* =====================================================
   FADE-IN ANIMATION
===================================================== */

function initialiseAnimations() {

    const elements = $$(
        ".fade-in, .feature-card, .review-card, .stat-card"
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

        if (!element.classList.contains("fade-in")) {

            element.classList.add("fade-in");

        }

        observer.observe(element);

    });

}

/* =====================================================
   HERO IMAGE PARALLAX
===================================================== */

function initialiseHeroImage() {

    const image = $(".hero-image img");

    if (!image) {

        return;

    }

    image.addEventListener("mousemove", () => {

        image.style.transform =

            "scale(1.03)";

    });

    image.addEventListener("mouseleave", () => {

        image.style.transform =

            "scale(1)";

    });

}

/* =====================================================
   PAGE LOADER
===================================================== */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});

/* =====================================================
   UPDATE FOOTER YEAR
===================================================== */

function updateFooterYear() {

    const year = new Date().getFullYear();

    const copyright = $(".copyright");

    if (!copyright) {

        return;

    }

    copyright.innerHTML =

        `© ${year} Remi+. All Rights Reserved.`;

}

updateFooterYear();

/* =====================================================
   INITIALISE HERO EFFECTS
===================================================== */

initialiseHeroImage();

/* =====================================================
   CHOOSE ROLE PAGE
===================================================== */

function initialiseRoleSelection() {

    const elderlyCard = $("#elderlyCard");
    const caregiverCard = $("#caregiverCard");
    const continueButton = $("#continueBtn");

    if (!elderlyCard || !caregiverCard || !continueButton) {

        return;

    }

    let selectedRole = loadData("userRole", null);

    /* ==========================================
       Restore Previous Selection
    ========================================== */

    if (selectedRole) {

        updateSelection(selectedRole);

    }

    /* ==========================================
       Card Click Events
    ========================================== */

    elderlyCard.addEventListener("click", () => {

        updateSelection("elderly");

    });

    caregiverCard.addEventListener("click", () => {

        updateSelection("caregiver");

    });

    /* ==========================================
       Keyboard Accessibility
    ========================================== */

    [elderlyCard, caregiverCard].forEach((card) => {

        card.setAttribute("tabindex", "0");

        card.addEventListener("keydown", (event) => {

            if (

                event.key === "Enter" ||

                event.key === " "

            ) {

                event.preventDefault();

                card.click();

            }

        });

    });

    /* ==========================================
       Continue Button
    ========================================== */

    continueButton.disabled = !selectedRole;

    continueButton.addEventListener("click", () => {

        if (!selectedRole) {

            showToast("Please choose a role.");

            return;

        }

        saveData("userRole", selectedRole);

        continueButton.innerHTML =

            'Loading <i class="fa-solid fa-spinner fa-spin"></i>';

        continueButton.disabled = true;

        setTimeout(() => {

            window.location.href = "login.html";

        }, 600);

    });

    /* ==========================================
       Update Selection
    ========================================== */

    function updateSelection(role) {

        selectedRole = role;

        App.role = role;

        saveData("userRole", role);

        elderlyCard.classList.remove("active");
        caregiverCard.classList.remove("active");

        if (role === "elderly") {

            elderlyCard.classList.add("active");

        }

        if (role === "caregiver") {

            caregiverCard.classList.add("active");

        }

        continueButton.disabled = false;

    }

}

/* =====================================================
   ROLE HELPERS
===================================================== */

function getSelectedRole() {

    return loadData("userRole", null);

}

function clearRoleSelection() {

    localStorage.removeItem("userRole");

}

/* =====================================================
   LOGIN PAGE
===================================================== */

function initialiseLoginPage() {

    const loginForm = $("#loginForm");

    if (!loginForm) {

        return;

    }

    const emailInput = $("#email");
    const passwordInput = $("#password");
    const rememberCheckbox = $("#rememberMe");
    const passwordToggle = $(".password-toggle");
    const loginButton = $(".login-btn");

    /* ==========================================
       Restore Remembered Email
    ========================================== */

    const rememberedEmail = loadData("rememberedEmail", "");

    if (rememberedEmail && emailInput) {

        emailInput.value = rememberedEmail;

        if (rememberCheckbox) {

            rememberCheckbox.checked = true;

        }

    }

    /* ==========================================
       Show / Hide Password
    ========================================== */

    if (passwordToggle && passwordInput) {

        passwordToggle.addEventListener("click", () => {

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                passwordToggle.classList.remove("fa-eye");

                passwordToggle.classList.add("fa-eye-slash");

            }

            else {

                passwordInput.type = "password";

                passwordToggle.classList.remove("fa-eye-slash");

                passwordToggle.classList.add("fa-eye");

            }

        });

    }

    /* ==========================================
       Login Form Submit
    ========================================== */

    loginForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const email = emailInput.value.trim();

        const password = passwordInput.value.trim();

        if (!validateEmail(email)) {

            showToast("Please enter a valid email address.");

            emailInput.focus();

            return;

        }

        if (password.length < 6) {

            showToast("Password must be at least 6 characters.");

            passwordInput.focus();

            return;

        }

        if (rememberCheckbox && rememberCheckbox.checked) {

            saveData("rememberedEmail", email);

        }

        else {

            localStorage.removeItem("rememberedEmail");

        }

        loginButton.disabled = true;

        loginButton.innerHTML =

            'Signing In <i class="fa-solid fa-spinner fa-spin"></i>';

        const user = {

            email: email,

            role: getSelectedRole()

        };

        saveData("currentUser", user);

        App.user = user;

        setTimeout(() => {

            window.location.href = "home.html";

        }, 1000);

    });

}

/* =====================================================
   EMAIL VALIDATION
===================================================== */

function validateEmail(email) {

    const pattern =

        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);

}

/* =====================================================
   LOGOUT
===================================================== */

function logout() {

    localStorage.removeItem("currentUser");

    window.location.href = "login.html";

}

/* =====================================================
   HOME DASHBOARD
===================================================== */

function initialiseHomePage() {

    const greeting = $("#greeting");
    const welcomeName = $("#welcomeName");
    const insightCard = $("#aiInsight");
    const activityList = $("#recentActivity");

    if (!greeting) {
        return;
    }

    const currentUser = loadData("currentUser", null);

    if (!currentUser) {

        window.location.href = "login.html";

        return;

    }

    App.user = currentUser;

    updateGreeting();

    if (welcomeName) {

        const displayName = currentUser.email
            .split("@")[0]
            .replace(".", " ");

        welcomeName.textContent = capitaliseWords(displayName);

    }

    loadDashboardStatistics();

    loadAIInsight();

    loadRecentActivity();

    initialiseQuickActions();

}

/* =====================================================
   GREETING
===================================================== */

function updateGreeting() {

    const greeting = $("#greeting");

    if (!greeting) {
        return;
    }

    const hour = new Date().getHours();

    let text = "Hello";

    if (hour < 12) {

        text = "Good Morning";

    }

    else if (hour < 18) {

        text = "Good Afternoon";

    }

    else {

        text = "Good Evening";

    }

    greeting.textContent = text;

}

/* =====================================================
   DASHBOARD STATS
===================================================== */

function loadDashboardStatistics() {

    const stats = loadData("dashboardStats", {

        totalApplications: 248,

        pendingReview: 37,

        approvedToday: 15,

        aiAccuracy: 97

    });

    setText("#totalApplications", stats.totalApplications);

    setText("#pendingReview", stats.pendingReview);

    setText("#approvedToday", stats.approvedToday);

    setText("#aiAccuracy", stats.aiAccuracy + "%");

}

/* =====================================================
   AI INSIGHT
===================================================== */

function loadAIInsight() {

    const insight = $("#aiInsight");

    if (!insight) {

        return;

    }

    const insights = [

        "No unusual claim behaviour detected today.",

        "Approval rate increased by 8% compared to yesterday.",

        "Three high-risk applications require manual review.",

        "Medical underwriting queue is below average today.",

        "Motor insurance claims are trending lower this week."

    ];

    const random = Math.floor(

        Math.random() * insights.length

    );

    insight.textContent = insights[random];

}

/* =====================================================
   RECENT ACTIVITY
===================================================== */

function loadRecentActivity() {

    const activityContainer = $("#recentActivity");

    if (!activityContainer) {

        return;

    }

    const activities = loadData("recentActivity", [

        {

            title: "Application Approved",

            time: "5 mins ago"

        },

        {

            title: "AI completed fraud analysis",

            time: "18 mins ago"

        },

        {

            title: "Customer uploaded documents",

            time: "43 mins ago"

        },

        {

            title: "Policy generated",

            time: "1 hour ago"

        }

    ]);

    activityContainer.innerHTML = "";

    activities.forEach(activity => {

        const item = document.createElement("div");

        item.className = "activity-item";

        item.innerHTML = `

            <div class="activity-title">

                ${activity.title}

            </div>

            <div class="activity-time">

                ${activity.time}

            </div>

        `;

        activityContainer.appendChild(item);

    });

}

/* =====================================================
   QUICK ACTIONS
===================================================== */

function initialiseQuickActions() {

    document

        .querySelectorAll("[data-link]")

        .forEach(button => {

            button.addEventListener("click", () => {

                const page =

                    button.dataset.link;

                window.location.href = page;

            });

        });

}

/* =====================================================
   CAPITALISE WORDS
===================================================== */

function capitaliseWords(text) {

    return text

        .split(" ")

        .map(word =>

            word.charAt(0).toUpperCase() +

            word.slice(1)

        )

        .join(" ");

}