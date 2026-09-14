/**
 * AHMED GIBRAN — APPLE-DESIGNED PORTFOLIO ENGINE
 * Includes Scroll Reveal Observers, Dynamic Rendering, & Editable State
 */

// 1. DATA STATE ARCHITECTURE
const portfolioState = {
    salesMetrics: {
        leads: 120,
        qualified: 48,
        viewings: 18,
        negotiations: 6,
        deals: 3
    },

    skills: [
        { title: "Lead Prospecting", category: "prospecting", desc: "Multi-channel research, digital profiling, and targeted outreach across Egyptian buyer personas." },
        { title: "Needs Discovery", category: "consultative", desc: "Conducting investigative discovery calls to map financial timeline, family requirements, and investment goals." },
        { title: "Value Positioning", category: "consultative", desc: "Structuring property recommendations around capital appreciation, rental yield, and lifestyle utility." },
        { title: "Objection Handling", category: "negotiation", desc: "Converting buyer anxiety around developer delivery dates, inflation, and pricing into confidence." },
        { title: "Win-Win Negotiation", category: "negotiation", desc: "Structuring customized down payment and installment compromises between client and developer." },
        { title: "Cairo Market Inventory", category: "re-knowledge", desc: "Mastery of compounds across East Cairo (Golden Square), West Cairo (Zayed), and North Coast." }
    ],

    developers: [
        { name: "Emaar Misr", focus: "east", region: "New Cairo & Coast", note: "Benchmark luxury developer (Uptown Cairo, Marassi, Mivida)." },
        { name: "Palm Hills", focus: "west", region: "West & East Cairo", note: "Pioneering integrated communities with high secondary market liquidity." },
        { name: "SODIC", focus: "west", region: "West & East Cairo", note: "Upscale residential compounds, commercial hubs, and modern design aesthetics." },
        { name: "Talaat Moustafa Group (TMG)", focus: "east", region: "East Cairo", note: "Massive township infrastructure (Madinaty, Al Rehab, Noor)." },
        { name: "Mountain View", focus: "east", region: "East/West & Coast", note: "Lifestyle-centric developments featuring distinctive Mediterranean architecture." },
        { name: "Ora Developers", focus: "coast", region: "Zayed & Coast", note: "Ultra-prime developments including Zed Zayed and Silversands North Coast." }
    ],

    consultationSteps: [
        { num: "01", title: "Uncover Buyer Motivation", detail: "Is the client looking for primary family living, inflation protection, or high rental yields?" },
        { num: "02", title: "Cash-Flow & Budget Mapping", detail: "Analyzing down payment capacity and quarterly installment comfort over a 5 to 8 year horizon." },
        { num: "03", title: "Targeted Inventory Matching", detail: "Filtering verified developer masterplans that match the buyer's criteria." },
        { num: "04", title: "Side-by-Side Comparison", detail: "Presenting 2 to 3 tailored property options with objective financial and lifestyle analysis." },
        { num: "05", title: "On-Site Experiential Viewing", detail: "Conducting walkthroughs of development sites, infrastructure, and model units." },
        { num: "06", title: "Objection Resolution", detail: "Systematically resolving concerns regarding delivery schedules, finishing specs, and maintenance fees." },
        { num: "07", title: "Closing & Reservation", detail: "Facilitating contract signing, payment schedule alignment, and reservation processing." },
        { num: "08", title: "Long-Term Advisory", detail: "Providing post-sale support for resales, rentals, and portfolio management." }
    ]
};

// 2. DOM INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
    initScrollReveal();
    initThemeToggle();
    initMobileMenu();
    renderSkills("all");
    renderDevelopers("all");
    renderConsultationStepper();
    bindAnalyticsControls();
});

// 3. APPLE SCROLL REVEAL OBSERVER
function initScrollReveal() {
    const revealElements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
}

// 4. THEME TOGGLER
function initThemeToggle() {
    const toggleBtn = document.getElementById("theme-toggle");
    toggleBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const nextTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", nextTheme);
    });
}

// 5. MOBILE MENU
function initMobileMenu() {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");

    hamburger.addEventListener("click", () => navMenu.classList.toggle("show"));
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => navMenu.classList.remove("show"));
    });
}

// 6. RENDER SKILLS
function renderSkills(categoryFilter) {
    const container = document.getElementById("skills-container");
    container.innerHTML = "";

    const filtered = categoryFilter === "all" 
        ? portfolioState.skills 
        : portfolioState.skills.filter(s => s.category === categoryFilter);

    filtered.forEach(skill => {
        const card = document.createElement("div");
        card.className = "feature-card glass-panel";
        card.innerHTML = `
            <h4>${skill.title}</h4>
            <p>${skill.desc}</p>
        `;
        container.appendChild(card);
    });

    document.querySelectorAll("#stack-filters .filter-btn").forEach(btn => {
        btn.classList.toggle("active", btn.getAttribute("data-filter") === categoryFilter);
        btn.onclick = () => renderSkills(btn.getAttribute("data-filter"));
    });
}

// 7. RENDER DEVELOPERS
function renderDevelopers(devFilter) {
    const container = document.getElementById("developer-grid");
    container.innerHTML = "";

    const filtered = devFilter === "all"
        ? portfolioState.developers
        : portfolioState.developers.filter(d => d.focus === devFilter);

    filtered.forEach(dev => {
        const card = document.createElement("div");
        card.className = "feature-card glass-panel";
        card.innerHTML = `
            <span class="badge badge-apple">${dev.region}</span>
            <h4 style="margin-top:12px;">${dev.name}</h4>
            <p>${dev.note}</p>
        `;
        container.appendChild(card);
    });

    document.querySelectorAll("#dev-filters .filter-btn").forEach(btn => {
        btn.classList.toggle("active", btn.getAttribute("data-devfilter") === devFilter);
        btn.onclick = () => renderDevelopers(btn.getAttribute("data-devfilter"));
    });
}

// 8. RENDER ACCORDION STEPPER
function renderConsultationStepper() {
    const container = document.getElementById("consultation-stepper");
    container.innerHTML = "";

    portfolioState.consultationSteps.forEach((step, idx) => {
        const accordion = document.createElement("div");
        accordion.className = `step-accordion glass-panel ${idx === 0 ? 'open' : ''}`;
        accordion.innerHTML = `
            <div class="step-header">
                <span><strong class="text-gold">STEP ${step.num}:</strong> ${step.title}</span>
                <span>&#9660;</span>
            </div>
            <div class="step-body">
                <p>${step.detail}</p>
            </div>
        `;

        accordion.querySelector(".step-header").addEventListener("click", () => {
            accordion.classList.toggle("open");
        });

        container.appendChild(accordion);
    });
}

// 9. ANALYTICS CONTROLS
function bindAnalyticsControls() {
    const resetBtn = document.getElementById("reset-metrics-btn");
    resetBtn.addEventListener("click", () => {
        document.getElementById("val-leads").innerText = portfolioState.salesMetrics.leads;
        document.getElementById("val-qualified").innerText = portfolioState.salesMetrics.qualified;
        document.getElementById("val-viewings").innerText = portfolioState.salesMetrics.viewings;
        document.getElementById("val-negotiations").innerText = portfolioState.salesMetrics.negotiations;
        document.getElementById("val-deals").innerText = portfolioState.salesMetrics.deals;
        alert("Demo metrics reset to baseline.");
    });
}