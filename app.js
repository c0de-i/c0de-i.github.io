/* ==================== APP.JS (WITH BLOG) ==================== */
"use strict";

/* ---------- DATA ---------- */
const data = {
  branding: {
    name: "c0de_i IT Solutions",
    tagline: "Cybersecurity & Digital Forensics Specialist",
  },
  services: [
    {
    title: "Cybersecurity Consulting",
    description: "Risk assessment, firewall configuration, vulnerability management, compliance (ISO 27001, NIST)",
    quote: "Starting at ₹15,000/project"
  },
  {
    title: "Digital Forensics & Incident Response",
    description: "Evidence acquisition, memory/disk analysis, malware tracing, expert witness testimony",
    quote: "Starting at ₹25,000/case"
  },
  {
    title: "Network & Cloud Infrastructure",
    description: "VPN setup, server hardening, cloud migration (AWS, Azure), secure network design",
    quote: "Starting at ₹12,000/deployment"
  },
  {
    title: "Cybersecurity & IT Training",
    description: "Workshops on cyber hygiene, Windows/Linux security, ethical hacking, office productivity tools",
    quote: "Starting at ₹5,000/session"
  },
  {
    title: "Document & Graphic Design",
    description: "Cybersecurity reports, official certificates, logos, social media graphics, presentation decks",
    quote: "Starting at ₹2,500/document"
  },
  ],
  testimonials: [
    { name: "Ankit Sharma", role: "Owner, Sharma Textiles",
      quote: "Their security audit helped us spot critical vulnerabilities and secure our ecommerce site." },
    { name: "Inspector Neha Rao", role: "Cyber Crime Unit",
      quote: "The digital evidence report was thorough and instrumental in securing a conviction." },
  ],
  projects: [
    {
    title: "Penetration Testing on Windows",
    description: "Performed full lifecycle penetration testing on Windows environments including privilege escalation, Active Directory exploitation, and report generation.",
    year: 2021
  },
     {
    title: "Advanced Port Scanner (Python)",
    year: 2022,
    description: "Built a multithreaded port scanner with banner grabbing, TCP/UDP detection, and dynamic scanning ranges."
  },
      {
    title: "Keyrat Malware (Python)",
    year: 2023,
    description: "Developed a keylogger malware in Python for controlled demo and training purposes"
  },
  {
    title: "FSP Bootcamp Hands-on Manual and Training",
    year: 2024,
    description: "Designed and delivered a offline/virtual bootcamp on cybersecurity basics, Linux hardening, and forensics to 500+ students."
  },
  {
    title: "NeGD Forensics Training Content",
    year: 2025,
    description: "Created forensic investigation training modules for government officers under the NeGD initiative."
  },
  {
    title: "WireGuard VPN with pfSense Deployment",
    year: 2025,
    description: "Designed and implemented secure remote access using WireGuard and pfSense firewall"
  }
],


  /* ---------- BLOG (NEW) ---------- */
  blog: [
    { title: "KeyRAT: KeyLogger with Remote Access Trojan",
      date: "2023-05-05",
      excerpt: "KeyRAT merges key-logging and remote-access capabilities. Learn how it works and how to detect it.",
      url: "https://www.irjmets.com/uploadedfiles/paper//issue_5_may_2023/38706/final/fin_irjmets1683952106.pdf" },
    { title: "A Beginner’s Ethical Hacking Lab",
      date: "2023-10-20",
      excerpt: "Spin up a safe test environment and master the first phase of penetration testing.",
      url: "https://drive.google.com/file/d/1DL0oUk0J1JB7q71t2dIcVLFUdzPZsJu3/view?usp=sharing" },
    { title: "From District to Nationals: My IndiaSkills Cybersecurity Story",
      date: "2024-07-02",
      excerpt: "What competitive cybersecurity taught me about discipline, teamwork, and rapid learning.",
      url: "blog/indiaskills-journey.html" },
    { title: "Top 5 Ways to Spot a Phishing Attack in 2025",
      date: "2025-04-09",
      excerpt: "Modern phishers are slick—here are five red flags even pros sometimes miss.",
      url: "blog/spot-phishing-2025.html" },
    { title: "What PC Gaming Taught Me About Cyber Defense",
      date: "2024-10-11",
      excerpt: "Strategy, situational awareness, and risk management—lessons from the digital battlefield.",
      url: "blog/gaming-and-security.html" },
  ],
};

/* ---------- DOM READY ---------- */
document.addEventListener("DOMContentLoaded", () => {
  injectServices();
  injectProjects();
  injectTestimonials();
  injectBlogPosts();              // <<< NEW
  initNavToggle();
  initSmoothScroll();
  initContactForm();

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* ---------- CONTENT INJECTION ---------- */
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
      <p>${svc.description}</p>`;
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
      <p>${proj.description}</p>`;
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
      <p class="testimonial-role">${tm.role}</p>`;
    wrapper.appendChild(card);
  });
}

/* ========== BLOG START ========== */
function injectBlogPosts() {
  const list = document.getElementById("blogList");
  if (!list) return;
  data.blog.forEach((post) => {
    const li = document.createElement("li");
    li.className = "blog-item";
    li.innerHTML = `
      <a href="${post.url}" class="blog-link">
        <h3 class="blog-title">${post.title}</h3>
        <time class="blog-date" datetime="${post.date}">${formatDate(
          post.date
        )}</time>
        <p class="blog-excerpt">${post.excerpt}</p>
      </a>`;
    list.appendChild(li);
  });
}

function formatDate(iso) {
  const opts = { year: "numeric", month: "short", day: "numeric" };
  return new Date(iso).toLocaleDateString(undefined, opts);
}
/* ========== BLOG END ========== */
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".page-section");
  const navLinks = document.querySelectorAll(".nav-link");

  // Show only #hero on load
  sections.forEach(section => {
    if (section.id === "hero") {
      section.classList.add("active");
    } else {
      section.classList.remove("active");
    }
  });
  if (window.innerWidth < 768) {
  const navMenu = document.getElementById("nav-menu");
  const burger = document.getElementById("burger");
  if (burger && navMenu.classList.contains("open")) {
    navMenu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  }
}

  navLinks.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (!targetSection) return;

      // Hide all sections
      sections.forEach(section => {
        section.classList.remove("active");
      });

      // Show selected section
      targetSection.classList.add("active");

      // Scroll to the section smoothly
      targetSection.scrollIntoView({ behavior: "smooth" });

      // Close mobile menu if needed
      const navMenu = document.getElementById("nav-menu");
      const burger = document.getElementById("burger");
      if (burger && navMenu.classList.contains("open")) {
        navMenu.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  });
});

/* ---------- NAV & SMOOTH SCROLL ---------- */
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
  const header = document.querySelector("header");
  const offset = header ? header.offsetHeight + 8 : 80;
  document.querySelectorAll("section").forEach((sec) => {
    sec.style.scrollMarginTop = `${offset}px`;
  });

  document.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href").slice(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth" });

        const navMenu = document.getElementById("nav-menu");
        if (navMenu && navMenu.classList.contains("is-open")) {
          navMenu.classList.remove("is-open");
          document.getElementById("burger").setAttribute("aria-expanded", false);
        }
      }
    });
  });
}

/* ---------- CONTACT FORM ---------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const statusEl = document.getElementById("formStatus");
  if (!form || !statusEl) return;

  statusEl.setAttribute("aria-live", "polite");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    statusEl.textContent = "";
    statusEl.className = "status";

    const nameVal = form.name.value.trim();
    const emailVal = form.email.value.trim();
    const msgVal = form.message.value.trim();

    if (!nameVal || !emailVal || !msgVal) {
      return showStatus("Please fill in all fields.", "error");
    }
    if (!/^([^\s@]+)@([^\s@]+)\.([^\s@]+)$/.test(emailVal)) {
      return showStatus("Please provide a valid email address.", "error");
    }

    try {
      const res = await fetch("https://formspree.io/f/mayvlvrd", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: nameVal, email: emailVal, message: msgVal }),
      });

      res.ok
        ? (form.reset(), showStatus("Message sent successfully!", "success"))
        : showStatus("There was a problem sending your message. Please try again.", "error");
    } catch (err) {
      showStatus("Network error. Please try again later.", "error");
    }
  });

  function showStatus(message, type) {
    statusEl.textContent = message;
    statusEl.className = `status status--${type}`;
    alert(message);
  }
}
/* ==================== END APP.JS ==================== */
