/* ==================== APP.JS (FINAL FIX) ==================== */
"use strict";

// -------------------- DATA -------------------- //
const data = {
  branding: {
    name: "YourName IT Solutions",
    tagline: "Cybersecurity & Digital Forensics Specialist",
  },
  services: [
    {
      title: "Cybersecurity Consulting",
      description:
        "Remote vulnerability assessments, managed security, firewall configuration, compliance advisory",
    },
    {
      title: "Digital Forensics & Incident Response",
      description:
        "Evidence collection, disk imaging, investigation reports, expert witness testimony",
    },
    {
      title: "Network Infrastructure & System Administration",
      description:
        "Network design, VPN setup, server hardening, cloud migration",
    },
    {
      title: "IT Training & Workshops",
      description:
        "Online courses in cybersecurity basics, MS Office, networking essentials, graphic design",
    },
    {
      title: "Graphics & Document Design",
      description:
        "Logo and brochure design, professional reports and presentations",
    },
  ],
  testimonials: [
    {
      name: "Ankit Sharma",
      role: "Owner, Sharma Textiles",
      quote:
        "Their security audit helped us spot critical vulnerabilities and secure our ecommerce site.",
    },
    {
      name: "Inspector Neha Rao",
      role: "Cyber Crime Unit",
      quote:
        "The digital evidence report was thorough and instrumental in securing a conviction.",
    },
  ],
  projects: [
    {
      title: "SME Ransomware Recovery",
      summary: "Led incident response, restored operations within 48 hours",
      year: 2024,
    },
    {
      title: "Network Overhaul for Community Hospital",
      summary: "Designed and deployed secure Wi-Fi and VPN for 300+ staff",
      year: 2023,
    },
    {
      title: "Online Security Bootcamp",
      summary: "Delivered 6-week cybersecurity fundamentals course to 120 students",
      year: 2025,
    },
  ],
};

// -------------------- DOM READY -------------------- //
document.addEventListener("DOMContentLoaded", () => {
  injectServices();
  injectProjects();
  injectTestimonials();
  initNavToggle();
  initSmoothScroll();
  initContactForm();
  // Year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// -------------------- CONTENT INJECTION -------------------- //
function injectServices() {
  const grid = document.getElementById("servicesGrid");
  if (!grid) return;
  const emojis = ["🔒", "🕵️", "🌐", "🎓", "🎨"];
  data.services.forEach((svc, idx) => {
    const card = document.createElement("div");
    card.className = "service-card";
    card.innerHTML = `
      <div class="service-card__icon">${emojis[idx % emojis.length]}</div>
      <h3>${svc.title}</h3>
      <p>${svc.description}</p>
    `;
    grid.appendChild(card);
  });
}

function injectProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;
  data.projects.forEach((proj) => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <h3>${proj.title}</h3>
      <span>${proj.year}</span>
      <p>${proj.summary}</p>
    `;
    grid.appendChild(card);
  });
}

function injectTestimonials() {
  const wrapper = document.getElementById("testimonialsWrapper");
  if (!wrapper) return;
  data.testimonials.forEach((tm) => {
    const card = document.createElement("div");
    card.className = "testimonial-card";
    card.innerHTML = `
      <p class="testimonial-quote">“${tm.quote}”</p>
      <p class="testimonial-name">${tm.name}</p>
      <p class="testimonial-role">${tm.role}</p>
    `;
    wrapper.appendChild(card);
  });
}

// -------------------- NAV & SMOOTH SCROLL -------------------- //
function initNavToggle() {
  const burger = document.getElementById("burger");
  const navMenu = document.getElementById("nav-menu");
  if (!burger || !navMenu) return;

  burger.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", isOpen);
  });
}

function initSmoothScroll() {
  // Add scroll-margin to all sections via JS (fallback if CSS not supported)
  const header = document.querySelector("header");
  const offset = header ? header.offsetHeight + 8 : 80; // +8 for spacing

  document.querySelectorAll("section").forEach((sec) => {
    sec.style.scrollMarginTop = `${offset}px`;
  });

  const links = document.querySelectorAll("a[href^='#']");
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href").slice(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth" });

        // Close mobile nav if open
        const navMenu = document.getElementById("nav-menu");
        if (navMenu && navMenu.classList.contains("is-open")) {
          navMenu.classList.remove("is-open");
          document.getElementById("burger").setAttribute("aria-expanded", false);
        }
      }
    });
  });
}

// -------------------- CONTACT FORM -------------------- //
function initContactForm() {
  const form = document.getElementById("contactForm");
  const statusEl = document.getElementById("formStatus");
  if (!form || !statusEl) return;

  // Accessibility
  statusEl.setAttribute("aria-live", "polite");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Reset any previous status
    statusEl.textContent = "";
    statusEl.className = "status"; // remove hidden class

    const nameVal = form.name.value.trim();
    const emailVal = form.email.value.trim();
    const msgVal = form.message.value.trim();

    // Simple client validation
    if (!nameVal || !emailVal || !msgVal) {
      return showStatus("Please fill in all fields.", "error");
    }
    if (!/^([^\s@]+)@([^\s@]+)\.([^\s@]+)$/.test(emailVal)) {
      return showStatus("Please provide a valid email address.", "error");
    }

    // POST to Formspree
    try {
      const res = await fetch("https://formspree.io/f/mayvlvrd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name: nameVal, email: emailVal, message: msgVal }),
      });

      if (res.ok) {
        form.reset();
        showStatus("Message sent successfully!", "success");
      } else {
        showStatus("There was a problem sending your message. Please try again.", "error");
      }
    } catch (err) {
      showStatus("Network error. Please try again later.", "error");
    }
  });

  function showStatus(message, type) {
    statusEl.textContent = message;
    statusEl.className = `status status--${type}`;
    // Pop-up fallback for visibility
    alert(message);
  }
}

// ==================== END APP.JS ==================== */