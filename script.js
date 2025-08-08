// Side navigation menu 
let menuBtn = document.querySelector(".menu-btn");
let cancelBtn = document.querySelector(".cancel-btn");
let navBar = document.querySelector(".navbar");
let menuLinks = document.querySelectorAll(".menu li a");
let body = document.body;

// Open menu
menuBtn.onclick = function () {
    menuBtn.style.opacity = "0";
    menuBtn.style.pointerEvents = "none";
    navBar.classList.add("active");
    body.style.overflow = "hidden"; // Prevent background scroll
    trapFocus(navBar);
};

// Close menu
function closeMenu() {
    menuBtn.style.opacity = "1";
    menuBtn.style.pointerEvents = "auto";
    navBar.classList.remove("active");
    body.style.overflow = ""; // Restore scroll
    menuBtn.focus();
}

cancelBtn.onclick = closeMenu;

// Close menu on link click (mobile)
menuLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 750) closeMenu();
    });
});

// Close menu with Escape key
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navBar.classList.contains("active")) {
        closeMenu();
    }
});

// Trap focus inside menu for accessibility
function trapFocus(element) {
    let focusableEls = element.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    let firstFocusableEl = focusableEls[0];
    let lastFocusableEl = focusableEls[focusableEls.length - 1];
    function handleTab(e) {
        if (!element.classList.contains("active")) {
            document.removeEventListener("keydown", handleTab);
            return;
        }
        if (e.key === "Tab") {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableEl) {
                    lastFocusableEl.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableEl) {
                    firstFocusableEl.focus();
                    e.preventDefault();
                }
            }
        }
    }
    document.addEventListener("keydown", handleTab);
    setTimeout(() => firstFocusableEl && firstFocusableEl.focus(), 100);
}

// Sticky navigation menu 
let nav = document.querySelector("nav");
window.onscroll = function () {
    if (document.documentElement.scrollTop > 20) {
        nav.classList.add("sticky");
    } else {
        nav.classList.remove("sticky");
    }
};
document.addEventListener("DOMContentLoaded", function () {
    const viewWorkBtn = document.querySelector('.home .button button');
    if (viewWorkBtn) {
        viewWorkBtn.addEventListener('click', function () {
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});
// Contact form validation and XSS prevention
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const subject = contactForm.subject.value.trim();
        const message = contactForm.message.value.trim();

        // Basic email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            contactForm.email.focus();
            return;
        }

        // Escape HTML to prevent XSS
        function escapeHTML(str) {
            return str.replace(/[&<>"']/g, function (m) {
                return ({
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#39;'
                })[m];
            });
        }

        // Show a safe confirmation (no actual sending)
        alert(
            "Thank you, " + escapeHTML(name) +
            "! Your message has been received."
        );
        contactForm.reset();
    });
}

// Responsive: scroll to section on "View My work" button
const viewWorkBtn = document.querySelector('.home .button button');
if (viewWorkBtn) {
    viewWorkBtn.addEventListener('click', function () {
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            skillsSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}