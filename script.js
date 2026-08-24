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

const weddingDate = new Date("NOV 14, 2026 09:00:00").getTime();

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
   GUEST WISHES (Firebase Firestore)
   ===================================================== */

/*
  SETUP (free Firebase):
  1. Firestore rules: publish firestore.rules
  2. Authentication → Sign-in method → Email/Password → Enable
  3. Authentication → Users → Add user (couple email + password)
  4. Use that email/password in "Manage wishes" on the site
*/
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyAhAt-5ApABygNXF0OFA4fm2SOqpy7xHCI",
    authDomain: "medhanit-samuel-wedding.firebaseapp.com",
    projectId: "medhanit-samuel-wedding",
    storageBucket: "medhanit-samuel-wedding.firebasestorage.app",
    messagingSenderId: "358764916765",
    appId: "1:358764916765:web:d9b8ed6757fb79d7f156f4",
    measurementId: "G-8Z26EHMBTG"
};

const MAX_WISHES_PER_GUEST = 1;
const GUEST_ID_KEY = "weddingGuestId";
const GUEST_COUNT_KEY = "weddingWishCount";

let wishesDb = null;
let wishesAuth = null;
let isWishAdmin = false;
let lastWishDocs = [];

function isFirebaseConfigured() {
    return (
        FIREBASE_CONFIG.apiKey &&
        FIREBASE_CONFIG.apiKey !== "YOUR_API_KEY" &&
        FIREBASE_CONFIG.projectId &&
        FIREBASE_CONFIG.projectId !== "YOUR_PROJECT_ID"
    );
}

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function formatWishDate(value) {
    try {
        const date = value && value.toDate ? value.toDate() : new Date(value);
        if (Number.isNaN(date.getTime())) {
            return "";
        }
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
    } catch (e) {
        return "";
    }
}

function getGuestId() {
    try {
        let id = localStorage.getItem(GUEST_ID_KEY);
        if (!id) {
            id = "g_" + Date.now().toString(36) + "_" +
                Math.random().toString(36).slice(2, 10);
            localStorage.setItem(GUEST_ID_KEY, id);
        }
        return id;
    } catch (e) {
        return "g_temp_" + Date.now().toString(36);
    }
}

function getGuestWishCount() {
    try {
        return Number(localStorage.getItem(GUEST_COUNT_KEY) || "0") || 0;
    } catch (e) {
        return 0;
    }
}

function setGuestWishCount(count) {
    try {
        localStorage.setItem(GUEST_COUNT_KEY, String(count));
    } catch (e) {
        // ignore
    }
}

function updateGuestFormAvailability(status, form, submit) {
    const used = getGuestWishCount();
    if (used >= MAX_WISHES_PER_GUEST) {
        form.querySelectorAll("input, textarea, button").forEach(function (el) {
            if (el.id !== "wishHoney") {
                el.disabled = true;
            }
        });
        status.hidden = false;
        status.className = "wish-status is-success";
        status.textContent =
            "Thank you — you’ve already shared your wish.";
        if (submit) {
            submit.textContent = "Limit reached";
        }
    }
}

function renderWishCard(wish) {
    const card = document.createElement("article");
    card.className = "wish-card";
    card.dataset.id = wish.id || "";

    let actions = "";
    if (isWishAdmin) {
        actions =
            '<div class="wish-card-actions">' +
            '<button type="button" class="wish-edit-btn">Edit</button>' +
            '<button type="button" class="wish-delete-btn">Delete</button>' +
            "</div>";
    }

    card.innerHTML =
        '<p class="wish-card-message">“' + escapeHtml(wish.message) + '”</p>' +
        '<p class="wish-card-meta">' +
        "<span>" + escapeHtml(wish.name) + "</span>" +
        (wish.createdAt
            ? '<span class="wish-card-date">' +
              escapeHtml(formatWishDate(wish.createdAt)) +
              "</span>"
            : "") +
        "</p>" +
        actions;

    if (isWishAdmin) {
        const editBtn = card.querySelector(".wish-edit-btn");
        const deleteBtn = card.querySelector(".wish-delete-btn");

        if (editBtn) {
            editBtn.addEventListener("click", function () {
                editWish(wish.id, wish.name, wish.message);
            });
        }

        if (deleteBtn) {
            deleteBtn.addEventListener("click", function () {
                deleteWish(wish.id);
            });
        }
    }

    return card;
}

function editWish(id, oldName, oldMessage) {
    if (!wishesDb || !id) {
        return;
    }

    const name = window.prompt("Edit name:", oldName || "");
    if (name === null) {
        return;
    }

    const message = window.prompt("Edit wish:", oldMessage || "");
    if (message === null) {
        return;
    }

    const cleanName = name.trim();
    const cleanMessage = message.trim();

    if (!cleanName || !cleanMessage) {
        window.alert("Name and wish cannot be empty.");
        return;
    }

    wishesDb
        .collection("wishes")
        .doc(id)
        .update({
            name: cleanName.slice(0, 80),
            message: cleanMessage.slice(0, 500)
        })
        .catch(function () {
            window.alert("Could not edit. Make sure you are signed in as admin.");
        });
}

function deleteWish(id) {
    if (!wishesDb || !id) {
        return;
    }

    if (!window.confirm("Delete this wish?")) {
        return;
    }

    wishesDb
        .collection("wishes")
        .doc(id)
        .delete()
        .catch(function () {
            window.alert("Could not delete. Make sure you are signed in as admin.");
        });
}

function setAdminUi(loggedIn) {
    isWishAdmin = loggedIn;

    const loginBtn = document.getElementById("adminLoginBtn");
    const logoutBtn = document.getElementById("adminLogoutBtn");
    const help = document.querySelector(".wish-admin-help");

    if (loginBtn) {
        loginBtn.hidden = loggedIn;
    }
    if (logoutBtn) {
        logoutBtn.hidden = !loggedIn;
    }
    if (help) {
        help.textContent = loggedIn
            ? "Admin mode on — you can edit or delete wishes."
            : "Sign in to edit or delete wishes.";
    }
}

function paintWishesWall(wall, empty) {
    wall.querySelectorAll(".wish-card").forEach(function (card) {
        card.remove();
    });

    if (!lastWishDocs.length) {
        if (empty) {
            empty.hidden = false;
        }
        return;
    }

    if (empty) {
        empty.hidden = true;
    }

    lastWishDocs.forEach(function (item) {
        wall.appendChild(renderWishCard(item));
    });
}

function initWishAdmin() {
    const toggle = document.getElementById("wishAdminToggle");
    const panel = document.getElementById("wishAdminPanel");
    const loginBtn = document.getElementById("adminLoginBtn");
    const logoutBtn = document.getElementById("adminLogoutBtn");
    const status = document.getElementById("adminStatus");
    const wall = document.getElementById("wishesWall");
    const empty = document.getElementById("wishesEmpty");

    if (!toggle || !panel || !loginBtn || !logoutBtn) {
        return;
    }

    toggle.addEventListener("click", function () {
        panel.hidden = !panel.hidden;
    });

    loginBtn.addEventListener("click", function () {
        const email = (document.getElementById("adminEmail") || {}).value || "";
        const password = (document.getElementById("adminPassword") || {}).value || "";

        if (!wishesAuth) {
            return;
        }

        status.hidden = false;
        status.className = "wish-status";
        status.textContent = "Signing in...";

        wishesAuth
            .signInWithEmailAndPassword(email.trim(), password)
            .then(function () {
                status.className = "wish-status is-success";
                status.textContent = "Signed in.";
            })
            .catch(function () {
                status.className = "wish-status is-error";
                status.textContent = "Sign-in failed. Check email/password.";
            });
    });

    logoutBtn.addEventListener("click", function () {
        if (!wishesAuth) {
            return;
        }
        wishesAuth.signOut();
    });

    if (wishesAuth) {
        wishesAuth.onAuthStateChanged(function (user) {
            setAdminUi(!!user);
            if (wall) {
                paintWishesWall(wall, empty);
            }
            if (status && user) {
                status.hidden = false;
                status.className = "wish-status is-success";
                status.textContent = "Admin mode on.";
            }
        });
    }
}

function initFirebaseWishes() {

    const form = document.getElementById("wishForm");
    const status = document.getElementById("wishStatus");
    const submit = document.getElementById("wishSubmit");
    const wall = document.getElementById("wishesWall");
    const empty = document.getElementById("wishesEmpty");

    if (!form || !status || !submit || !wall) {
        return;
    }

    if (!isFirebaseConfigured()) {
        status.hidden = false;
        status.className = "wish-status is-error";
        status.textContent =
            "Wishes will appear here once Firebase setup is finished.";
        return;
    }

    if (typeof firebase === "undefined") {
        status.hidden = false;
        status.className = "wish-status is-error";
        status.textContent = "Could not load Firebase. Please refresh.";
        return;
    }

    if (!firebase.apps.length) {
        firebase.initializeApp(FIREBASE_CONFIG);
    }
    wishesDb = firebase.firestore();
    wishesAuth = firebase.auth();

    initWishAdmin();
    updateGuestFormAvailability(status, form, submit);

    wishesDb
        .collection("wishes")
        .orderBy("createdAt", "desc")
        .limit(80)
        .onSnapshot(
            function (snapshot) {
                lastWishDocs = [];
                snapshot.forEach(function (doc) {
                    const data = doc.data() || {};
                    lastWishDocs.push({
                        id: doc.id,
                        name: data.name || "Guest",
                        message: data.message || "",
                        createdAt: data.createdAt
                    });
                });
                paintWishesWall(wall, empty);
            },
            function () {
                status.hidden = false;
                status.className = "wish-status is-error";
                status.textContent =
                    "Could not load wishes. Check Firestore rules.";
            }
        );

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const honey = document.getElementById("wishHoney");
        if (honey && honey.value) {
            return;
        }

        const used = getGuestWishCount();
        if (used >= MAX_WISHES_PER_GUEST) {
            updateGuestFormAvailability(status, form, submit);
            return;
        }

        const name = form.name.value.trim();
        const message = form.message.value.trim();

        if (!name || !message) {
            return;
        }

        if (name.length > 80 || message.length > 500) {
            status.hidden = false;
            status.className = "wish-status is-error";
            status.textContent = "Please keep your wish a little shorter.";
            return;
        }

        submit.disabled = true;
        status.hidden = false;
        status.className = "wish-status";
        status.textContent = "Sending your wish...";

        wishesDb
            .collection("wishes")
            .add({
                name: name,
                message: message,
                guestId: getGuestId(),
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(function () {
                const next = used + 1;
                setGuestWishCount(next);
                status.className = "wish-status is-success";
                status.textContent =
                    "Thank you — your wish is now on the wall.";
                form.reset();
                updateGuestFormAvailability(status, form, submit);
            })
            .catch(function () {
                status.className = "wish-status is-error";
                status.textContent =
                    "Sorry, something went wrong. Please try again.";
            })
            .finally(function () {
                submit.disabled = false;
                updateGuestFormAvailability(status, form, submit);
            });
    });
}


/* =====================================================
   ADD TO CALENDAR (.ics)
   ===================================================== */

function buildWeddingIcs() {
    // 09:00–15:00 Addis Ababa (UTC+3) on Nov 14, 2026
    return [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Medhanit and Samuel//Wedding Invitation//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",
        "UID:medhanit-samuel-wedding-20261114@weddinv",
        "DTSTAMP:20260820T090000Z",
        "DTSTART:20261114T060000Z",
        "DTEND:20261114T120000Z",
        "SUMMARY:Medhanit & Samuel Wedding",
        "DESCRIPTION:Ceremony 09:00 AM at Addis Amba JW Kingdom Hall. Celebration 12:00 PM. Zoom ID: 990 863 5436 Passcode: 303030",
        "LOCATION:Addis Amba JW Kingdom Hall\\, XQ68+MCP\\, Addis Ababa\\, Ethiopia",
        "STATUS:CONFIRMED",
        "SEQUENCE:0",
        "END:VEVENT",
        "END:VCALENDAR"
    ].join("\r\n");
}

function initAddToCalendar() {

    const link = document.getElementById("addToCalendar");

    if (!link) {
        return;
    }

    link.addEventListener("click", function (event) {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

        // iPhone/iPad: open the .ics file so Calendar can import it
        if (isIOS) {
            return;
        }

        // Android/desktop: download a generated calendar file
        event.preventDefault();

        const icsText = buildWeddingIcs();
        const blob = new Blob([icsText], {
            type: "text/calendar;charset=utf-8"
        });
        const url = URL.createObjectURL(blob);
        const temp = document.createElement("a");
        temp.href = url;
        temp.download = "Medhanit-Samuel-Wedding.ics";
        document.body.appendChild(temp);
        temp.click();
        temp.remove();
        setTimeout(function () {
            URL.revokeObjectURL(url);
        }, 2000);
    });
}


/* =====================================================
   INIT
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {
    createPetals();
    initWeddingMusic();
    initEnvelopeAccess();
    initHeroParallax();
    initFirebaseWishes();
    initAddToCalendar();
    // Scroll reveals start after the envelope opens
});
