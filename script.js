/* =====================================================
   WEDDING INVITATION - JAVASCRIPT
   ===================================================== */


/* =====================================================
   OPENING INVITATION
   ===================================================== */

function openInvitation() {

    const envelope = document.querySelector(".envelope");
    const card = document.querySelector(".invite-card");

    if (!envelope || envelope.classList.contains("opening")) {
        return;
    }

    envelope.classList.add("opening");
    envelope.classList.add("open");

    const button = document.querySelector(".invite-card button");

    if (button) {
        button.style.opacity = "0";
        button.style.pointerEvents = "none";
    }

    setTimeout(function () {
        if (card) {
            card.style.opacity = "0";
            card.style.transform = "scale(0.95)";
        }
    }, 900);

    setTimeout(function () {
        window.location.href = "invitation.html";
    }, 1700);
}


/* =====================================================
   COUNTDOWN
   ===================================================== */

const weddingDate = new Date("NOV 20, 2026 09:00:00").getTime();

function updateCountdown() {

    const now = new Date().getTime();
    const difference = weddingDate - now;

    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");

    if (!days || !hours || !minutes || !seconds) {
        return;
    }

    if (difference <= 0) {
        days.textContent = "0";
        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";
        return;
    }

    const daysValue = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hoursValue = Math.floor(
        (difference % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutesValue = Math.floor(
        (difference % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const secondsValue = Math.floor(
        (difference % (1000 * 60))
        / 1000
    );

    days.textContent = daysValue;
    hours.textContent = String(hoursValue).padStart(2, "0");
    minutes.textContent = String(minutesValue).padStart(2, "0");
    seconds.textContent = String(secondsValue).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);


/* =====================================================
   FLOATING PETALS
   ===================================================== */

function createPetals() {

    const layer = document.querySelector(".floating-petals");

    if (!layer) {
        return;
    }

    const count = window.innerWidth < 600 ? 12 : 22;

    for (let i = 0; i < count; i++) {
        const petal = document.createElement("span");
        petal.className = "petal";

        const size = 8 + Math.random() * 10;
        const left = Math.random() * 100;
        const delay = Math.random() * 12;
        const duration = 10 + Math.random() * 14;
        const opacity = 0.25 + Math.random() * 0.45;

        petal.style.width = size + "px";
        petal.style.height = size * 0.7 + "px";
        petal.style.left = left + "%";
        petal.style.animationDelay = delay + "s";
        petal.style.animationDuration = duration + "s";
        petal.style.opacity = String(opacity);

        layer.appendChild(petal);
    }
}


/* =====================================================
   SCROLL REVEALS
   ===================================================== */

function initReveals() {

    const items = document.querySelectorAll(".reveal");

    if (!items.length) {
        return;
    }

    if (!("IntersectionObserver" in window)) {
        items.forEach(function (item) {
            item.classList.add("is-visible");
        });
        return;
    }

    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    items.forEach(function (item, index) {
        item.style.transitionDelay = (index % 4) * 0.08 + "s";
        observer.observe(item);
    });
}


/* =====================================================
   SOFT AMBIENT MUSIC (Web Audio)
   ===================================================== */

let audioCtx = null;
let musicMaster = null;
let musicTimer = null;
let musicPlaying = false;

const melodyNotes = [
    392.0, 440.0, 523.25, 493.88,
    440.0, 392.0, 349.23, 392.0
];

function createSoftAmbience() {

    audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    musicMaster = audioCtx.createGain();
    musicMaster.gain.value = 0;
    musicMaster.connect(audioCtx.destination);
}

function playMelodyNote(freq, when) {

    if (!audioCtx || !musicMaster) {
        return;
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.value = freq;

    filter.type = "lowpass";
    filter.frequency.value = 1400;

    gain.gain.setValueAtTime(0, when);
    gain.gain.linearRampToValueAtTime(0.07, when + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, when + 1.6);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(musicMaster);

    osc.start(when);
    osc.stop(when + 1.7);
}

function scheduleMelody() {

    if (!audioCtx || !musicPlaying) {
        return;
    }

    const start = audioCtx.currentTime + 0.05;

    melodyNotes.forEach(function (freq, i) {
        playMelodyNote(freq, start + i * 0.85);
    });

    musicTimer = setTimeout(scheduleMelody, melodyNotes.length * 850 + 1200);
}

function fadeMusic(target, duration) {

    if (!musicMaster || !audioCtx) {
        return;
    }

    const now = audioCtx.currentTime;
    musicMaster.gain.cancelScheduledValues(now);
    musicMaster.gain.setValueAtTime(musicMaster.gain.value, now);
    musicMaster.gain.linearRampToValueAtTime(target, now + duration);
}

function toggleMusic() {

    const toggle = document.getElementById("musicToggle");

    if (!toggle) {
        return;
    }

    if (!audioCtx) {
        createSoftAmbience();
    }

    if (audioCtx.state === "suspended") {
        audioCtx.resume();
    }

    musicPlaying = !musicPlaying;

    if (musicPlaying) {
        fadeMusic(0.85, 1.2);
        scheduleMelody();
        toggle.classList.add("is-playing");
        toggle.setAttribute("aria-label", "Pause soft music");
    } else {
        fadeMusic(0, 0.8);
        clearTimeout(musicTimer);
        musicTimer = null;
        toggle.classList.remove("is-playing");
        toggle.setAttribute("aria-label", "Play soft music");
    }
}

function initMusicToggle() {

    const toggle = document.getElementById("musicToggle");

    if (!toggle) {
        return;
    }

    toggle.addEventListener("click", toggleMusic);
}


/* =====================================================
   ENVELOPE KEYBOARD ACCESS
   ===================================================== */

function initEnvelopeAccess() {

    const envelope = document.querySelector(".envelope");

    if (!envelope) {
        return;
    }

    envelope.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openInvitation();
        }
    });
}


/* =====================================================
   HERO PARALLAX (subtle)
   ===================================================== */

function initHeroParallax() {

    const hero = document.querySelector(".wedding-hero");
    const content = document.querySelector(".hero-content");

    if (!hero || !content || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    window.addEventListener("scroll", function () {
        const rect = hero.getBoundingClientRect();
        if (rect.bottom < 0) {
            return;
        }
        const progress = Math.min(
            Math.max(-rect.top / Math.max(rect.height, 1), 0),
            1
        );
        content.style.transform =
            "translateY(" + progress * 40 + "px)";
        content.style.opacity = String(1 - progress * 0.55);
    }, { passive: true });
}


/* =====================================================
   INIT
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {
    createPetals();
    initReveals();
    initMusicToggle();
    initEnvelopeAccess();
    initHeroParallax();

    // Hero content visible immediately on load
    document.querySelectorAll(".wedding-hero .reveal").forEach(
        function (item, index) {
            setTimeout(function () {
                item.classList.add("is-visible");
            }, 200 + index * 160);
        }
    );
});
