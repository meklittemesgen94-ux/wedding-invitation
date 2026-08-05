/* =====================================================
   WEDDING INVITATION - JAVASCRIPT
   ===================================================== */


/* =====================================================
   OPENING INVITATION
   ===================================================== */

function openInvitation() {

    const envelope = document.querySelector(".envelope");
    const card = document.querySelector(".invite-card");
    const gate = document.getElementById("openingGate");

    if (!envelope || envelope.classList.contains("opening")) {
        return;
    }

    // Best sync: start music in the SAME click that opens the invitation
    // (no page change, so the song never cuts)
    playWeddingMusic();

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
        document.body.classList.remove("invitation-locked");
        document.body.classList.add("invitation-open");

        if (gate) {
            gate.classList.add("is-hidden");
        }

        const toggle = document.getElementById("musicToggle");
        if (toggle) {
            toggle.hidden = false;
            toggle.classList.add("is-playing");
        }

        revealHeroNow();
        initReveals();

        // Remove gate after fade so it cannot block the page
        setTimeout(function () {
            if (gate) {
                gate.remove();
            }
            window.scrollTo(0, 0);
        }, 700);
    }, 1500);
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

function fillPetalLayer(layer, count) {

    if (!layer || layer.dataset.filled === "1") {
        return;
    }

    layer.dataset.filled = "1";

    for (let i = 0; i < count; i++) {
        const petal = document.createElement("span");
        petal.className = "petal" + (i % 3 === 0 ? " petal-rose" : "");

        const size = 7 + Math.random() * 12;
        const left = Math.random() * 100;
        const delay = Math.random() * 14;
        const duration = 11 + Math.random() * 16;
        const opacity = 0.22 + Math.random() * 0.4;

        petal.style.width = size + "px";
        petal.style.height = size * 0.65 + "px";
        petal.style.left = left + "%";
        petal.style.animationDelay = delay + "s";
        petal.style.animationDuration = duration + "s";
        petal.style.opacity = String(opacity);

        layer.appendChild(petal);
    }
}

function createPetals() {

    const gateLayer = document.querySelector('[data-petals="gate"]');
    const pageLayer = document.querySelector('[data-petals="page"]');
    const mobile = window.innerWidth < 600;

    fillPetalLayer(gateLayer, mobile ? 10 : 18);
    fillPetalLayer(pageLayer, mobile ? 8 : 14);
}


/* =====================================================
   SCROLL REVEALS — gentle appear on scroll
   ===================================================== */

let revealObserver = null;

function initReveals() {

    const items = document.querySelectorAll(".reveal:not([data-observe])");

    if (!items.length) {
        return;
    }

    if (!("IntersectionObserver" in window)) {
        items.forEach(function (item) {
            item.classList.add("is-visible");
        });
        return;
    }

    if (!revealObserver) {
        revealObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -8% 0px"
            }
        );
    }

    items.forEach(function (item, index) {
        item.dataset.observe = "1";

        // Stagger siblings in the same section gently
        const siblings = item.parentElement
            ? item.parentElement.querySelectorAll(":scope > .reveal")
            : [];
        let delay = 0;

        if (siblings.length) {
            const siblingIndex = Array.prototype.indexOf.call(siblings, item);
            delay = Math.max(siblingIndex, 0) * 0.12;
        } else {
            delay = (index % 5) * 0.1;
        }

        item.style.transitionDelay = delay + "s";
        revealObserver.observe(item);
    });
}

function revealHeroNow() {
    document.querySelectorAll(".wedding-hero .reveal").forEach(
        function (item, index) {
            setTimeout(function () {
                item.classList.add("is-visible");
            }, 180 + index * 140);
        }
    );
}


/* =====================================================
   WEDDING MUSIC — Unfailing Love (autoplay on open)
   ===================================================== */

let musicPlaying = false;
let unlockHandlersBound = false;

function getWeddingAudio() {
    return document.getElementById("weddingMusic");
}

function setMusicUI(isPlaying) {

    const toggle = document.getElementById("musicToggle");

    musicPlaying = isPlaying;

    if (!toggle) {
        return;
    }

    if (isPlaying) {
        toggle.classList.add("is-playing");
        toggle.setAttribute("aria-label", "Pause music");
    } else {
        toggle.classList.remove("is-playing");
        toggle.setAttribute("aria-label", "Play music");
    }
}

function playWeddingMusic() {

    const audio = getWeddingAudio();

    if (!audio) {
        return Promise.resolve(false);
    }

    audio.volume = 0.45;
    audio.loop = true;

    return audio.play().then(function () {
        setMusicUI(true);
        return true;
    }).catch(function () {
        setMusicUI(false);
        return false;
    });
}

function pauseWeddingMusic() {

    const audio = getWeddingAudio();

    if (!audio) {
        return;
    }

    audio.pause();
    setMusicUI(false);
}

function unlockMusicOnFirstGesture() {

    if (unlockHandlersBound || musicPlaying) {
        return;
    }

    unlockHandlersBound = true;

    function unlock() {
        playWeddingMusic().then(function (started) {
            if (started) {
                document.removeEventListener("click", unlock);
                document.removeEventListener("touchstart", unlock);
                document.removeEventListener("keydown", unlock);
            }
        });
    }

    document.addEventListener("click", unlock);
    document.addEventListener("touchstart", unlock, { passive: true });
    document.addEventListener("keydown", unlock);
}

function toggleMusic(event) {

    if (event) {
        event.stopPropagation();
    }

    const audio = getWeddingAudio();
    const toggle = document.getElementById("musicToggle");

    if (!audio || !toggle) {
        return;
    }

    if (musicPlaying && !audio.paused) {
        pauseWeddingMusic();
    } else {
        playWeddingMusic();
    }
}

function initWeddingMusic() {

    const audio = getWeddingAudio();

    if (!audio) {
        return;
    }

    const toggle = document.getElementById("musicToggle");

    if (toggle) {
        toggle.addEventListener("click", toggleMusic);
    }

    // Music starts when the envelope is opened (same moment as reveal).
    // Do not autoplay on load — that is often blocked and can desync.
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
    initWeddingMusic();
    initEnvelopeAccess();
    initHeroParallax();
    // Scroll reveals start after the envelope opens
});
