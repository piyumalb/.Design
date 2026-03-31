document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("keydown", e => {
    if ("F12" === e.key || e.ctrlKey && "u" === e.key || e.ctrlKey && e.shiftKey && ("I" === e.key || "J" === e.key)) return e.preventDefault(), !1
});

const observerOptions = { root: null, rootMargin: "0px", threshold: .15 };
const observer = new IntersectionObserver((e, t) => {
    e.forEach(e => { e.isIntersecting && e.target.classList.add("is-visible") })
}, observerOptions);

function initAnimations() {
    const e = document.querySelectorAll(".reveal-up, .reveal-from-left, .reveal-from-right, .reveal-scale");
    e.forEach(e => { e.classList.remove("is-visible"), observer.observe(e) })
}

function animateCounters() {
    const e = document.querySelectorAll(".count-up");
    e.forEach(a => {
        a.innerText = "0";
        const s = +a.getAttribute("data-target"), o = 2e3;
        let n = null;
        const r = e => {
            n = n || e;
            var t = Math.min((e - n) / o, 1), e = 1 - Math.pow(1 - t, 4), e = Math.floor(e * s);
            a.innerText = e, t < 1 ? window.requestAnimationFrame(r) : a.innerText = s
        };
        setTimeout(() => window.requestAnimationFrame(r), 400)
    })
}

function toggleTheme() {
    const e = document.documentElement;
    e.classList.contains("dark") ? (e.classList.remove("dark"), localStorage.theme = "light") : (e.classList.add("dark"), localStorage.theme = "dark")
}

function switchPage(t) {
    document.querySelectorAll(".page-section").forEach(e => {
        e.style.opacity = "0", e.style.transform = "scale3d(0.98, 0.98, 1) translate3d(0, 20px, 0)", setTimeout(() => { e.classList.remove("active") }, 500)
    }), document.querySelectorAll(".nav-btn").forEach(e => {
        e.dataset.target === t ? (e.classList.add("text-blue-600", "dark:text-blue-400", "bg-white", "dark:bg-blue-900/40", "shadow-sm", "scale-105"), e.classList.remove("text-gray-600", "dark:text-gray-300", "hover:bg-white/50", "dark:hover:bg-blue-900/40", "hover:scale-105")) : (e.classList.remove("text-blue-600", "dark:text-blue-400", "bg-white", "dark:bg-blue-900/40", "shadow-sm", "scale-105"), e.classList.add("text-gray-600", "dark:text-gray-300", "hover:bg-white/50", "dark:hover:bg-blue-900/40", "hover:scale-105"))
    }), document.querySelectorAll(".mobile-nav-btn").forEach(e => {
        e.dataset.target === t ? (e.classList.add("bg-blue-600", "dark:bg-blue-500", "text-white", "shadow-md"), e.classList.remove("bg-transparent", "text-gray-600", "dark:text-gray-300")) : (e.classList.remove("bg-blue-600", "dark:bg-blue-500", "text-white", "shadow-md"), e.classList.add("bg-transparent", "text-gray-600", "dark:text-gray-300"))
    }), setTimeout(() => {
        const e = document.getElementById(t);
        e.classList.add("active"), e.offsetWidth, e.style.opacity = "1", e.style.transform = "scale3d(1, 1, 1) translate3d(0, 0, 0)", initAnimations(), "home" === t && animateCounters()
    }, 500), window.scrollTo({ top: 0, behavior: "smooth" })
}

function selectPackage(t) {
    switchPage("contact"), setTimeout(() => {
        const e = document.getElementById("subject-field");
        e.value = "Order: " + t + " Package", e.focus(), e.classList.add("ring-4", "ring-blue-500/50", "border-blue-500"), setTimeout(() => e.classList.remove("ring-4", "ring-blue-500/50", "border-blue-500"), 1500)
    }, 600)
}

function toggleMobileMenu() {
    document.getElementById("mobile-menu").classList.toggle("hidden")
}

const currentWhatsAppNo = "94704227925";

function sendToWhatsApp(e) {
    e.preventDefault();
    var t = document.getElementById("contact-name").value,
        a = document.getElementById("contact-phone").value,
        s = document.getElementById("subject-field").value,
        o = document.getElementById("contact-message").value,
        n = "================================\n";
    n += "      INVOICE / ORDER DETAILS     \n", n += "================================\n\n", n += `Order ID    : #ORD-${Math.floor(1e3+9e3*Math.random())}\n`, n += `Date        : ${(new Date).toLocaleDateString()}\n`, n += "--------------------------------\n", n += `Client Name : ${t}\n`, n += `Contact No  : ${a}\n`, n += `Package     : ${s}\n`, n += "--------------------------------\n", n += `Requirements:\n${o}\n\n`, n += "================================\n", n += "Thank you for choosing P.Design.\n", n += "================================";
    n = encodeURIComponent(n), n = `https://wa.me/${currentWhatsAppNo}?text=${n}`;
    window.open(n, "_blank"), e.target.reset();
    const r = document.getElementById("success-modal"),
        l = r.querySelector(".glass-panel");
    r.classList.remove("hidden"), r.classList.add("flex"), r.offsetWidth, r.classList.remove("opacity-0"), l.classList.remove("scale-90"), l.classList.add("scale-100")
}

function closeSuccessModal() {
    const e = document.getElementById("success-modal"),
        t = e.querySelector(".glass-panel");
    e.classList.add("opacity-0"), t.classList.remove("scale-100"), t.classList.add("scale-90"), setTimeout(() => { e.classList.add("hidden"), e.classList.remove("flex") }, 300)
}

document.addEventListener("DOMContentLoaded", () => {
    "dark" === localStorage.theme || !("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark"), lucide.createIcons();
    const e = document.getElementById("home");
    e.classList.add("active"), e.style.opacity = "1", e.style.transform = "scale3d(1, 1, 1) translate3d(0, 0, 0)", document.querySelectorAll(".mobile-nav-btn").forEach(e => { "home" === e.dataset.target && (e.classList.add("bg-blue-600", "dark:bg-blue-500", "text-white", "shadow-md"), e.classList.remove("bg-transparent", "text-gray-600", "dark:text-gray-300")) }), setTimeout(() => {
        const e = document.getElementById("hero-bg-video");
        e && e.load()
    }, 100), setTimeout(() => { initAnimations(), animateCounters() }, 100)
});