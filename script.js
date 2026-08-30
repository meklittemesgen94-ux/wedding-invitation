/* =====================================================
   WEDDING INVITATION - JAVASCRIPT
   ===================================================== */


/* =====================================================
   LANGUAGE (English / Amharic)
   ===================================================== */

const LANG_KEY = "weddingLang";
let currentLang = "en";

const I18N = {
    en: {
        "gate.welcome": "You are warmly invited",
        "gate.date": "November 14, 2026",
        "gate.verse": '"He has made everything beautiful in its time."',
        "gate.verseRef": "Ecclesiastes 3:11",
        "gate.letterDate": "Nov 14, 2026",
        "gate.tap": "Tap the envelope to open our invitation",
        "gate.openAria": "Open invitation",
        "hero.gettingMarried": "We are getting married",
        "hero.date": "November 14, 2026 · Addis Ababa",
        "hero.scrollAria": "Scroll to details",
        "countdown.label": "The big day",
        "countdown.title": "Counting Down to Forever",
        "countdown.days": "Days",
        "countdown.hours": "Hours",
        "countdown.minutes": "Minutes",
        "countdown.seconds": "Seconds",
        "countdown.calendar": "Add to Calendar",
        "story.label": "Our story",
        "story.title": "Two Hearts, One Story",
        "story.p1":
            "Some stories are written in books, but ours was written in the little moments we shared together.",
        "story.p2":
            "From childhood playmates to this beautiful day, every moment has led us here.",
        "story.p3":
            "And now, we are ready to begin the next chapter of our forever with Jehovah.",
        "story.verse":
            "And now these three remain: faith, hope, and love. But the greatest of these is love.",
        "story.verseRef": "1 Corinthians 13:13",
        "details.label": "Join us",
        "details.title": "Wedding Details",
        "details.ceremony": "Wedding Ceremony",
        "details.ceremonyPlace": "Addis Amba<br>JW Kingdom Hall",
        "details.zoom": "Zoom Meeting",
        "details.zoomInfo": "Zoom ID: 990 863 5436<br>Passcode: 303030",
        "gallery.label": "Our moments",
        "gallery.title": "Memories of Us",
        "gallery.note":
            "Swipe through a few favorite moments from our journey.",
        "gallery.trackAria": "Photo gallery",
        "gallery.prev": "Previous photo",
        "gallery.next": "Next photo",
        "gallery.goto": "Go to photo {n}",
        "location.label": "Find us",
        "location.title": "Wedding Location",
        "location.address": "XQ68+MCP, Addis Ababa<br>Ethiopia",
        "location.directions": "Get Directions",
        "wishes.label": "From your hearts",
        "wishes.title": "Guest Wishes",
        "wishes.intro":
            "Share a short blessing for Medhanit & Samuel — your words will appear here for everyone to see.",
        "wishes.empty": "Be the first to leave a wish.",
        "wishes.limit": "You can share one wish.",
        "wishes.nameLabel": "Your name",
        "wishes.messageLabel": "Your wish",
        "wishes.namePlaceholder": "Your name",
        "wishes.messagePlaceholder": "Write your wish for the couple...",
        "wishes.send": "Send Wish",
        "wishes.edit": "Edit",
        "wishes.delete": "Delete",
        "wishes.save": "Save",
        "wishes.cancel": "Cancel",
        "wishes.already": "Thank you — you’ve already shared your wish.",
        "wishes.limitReached": "Limit reached",
        "wishes.sending": "Sending your wish...",
        "wishes.sent": "Thank you — your wish is now on the wall.",
        "wishes.tooLong": "Please keep your wish a little shorter.",
        "wishes.loadError": "Could not load wishes. Check Firestore rules.",
        "wishes.firebaseError": "Could not load Firebase. Please refresh.",
        "wishes.configError":
            "Wishes are almost ready — add your Firebase config in script.js.",
        "wishes.sendError": "Sorry, something went wrong. Please try again.",
        "wishes.deleteConfirm": "Delete this wish?",
        "wishes.editError":
            "Could not edit this wish. Publish the latest Firestore rules.",
        "wishes.deleteError":
            "Could not delete this wish. Check Firestore rules.",
        "wishes.emptyFields": "Name and wish cannot be empty.",
        "photo.label": "Capture the love",
        "photo.title": "Share a Photo",
        "photo.text":
            "Have a sweet photo for us? Send it on WhatsApp — we’d love to keep it.",
        "photo.button": "Share Photo on WhatsApp",
        "thanks.label": "With grateful hearts",
        "thanks.title": "Thank You",
        "thanks.text": "Thank you for being part of our story.",
        "footer.date": "November 14, 2026",
        "footer.message": "With love, until we celebrate together.",
        "music.pause": "Pause music",
        "music.play": "Play music",
        "lang.group": "Language"
    },
    am: {
        "gate.welcome": "በአክብሮት ተጋብዘዋል",
        "gate.date": " ህዳር 14፣ 2026",
        "gate.verse": "«አምላክ ሁሉንም ነገር በወቅቱ ውብ አድርጎ ሠርቶታል።»",
        "gate.verseRef": "መክብብ 3፡11",
        "gate.letterDate": " ህዳር 14,2026",
        "gate.tap": "ፖስታውን በመንካት ግብዣችንን ይክፈቱ",
        "gate.openAria": "ግብዣውን ክፈት",
        "hero.gettingMarried": ",We are getting married",
        "hero.date": " ህዳር 14፣ 2026 · አዲስ አበባ",
        "hero.scrollAria": "ወደ ዝርዝር ይሸብልሉ",
        "countdown.label": "ትልቁ ቀን",
        "countdown.title": "ቀን እየቆጠርን",
        "countdown.days": "ቀናት",
        "countdown.hours": "ሰዓታት",
        "countdown.minutes": "ደቂቃዎች",
        "countdown.seconds": "ሰከንዶች",
        "countdown.calendar": "ወደ ቀን መቁጠሪያ ጨምር",
        "story.label": "ታሪካችን",
        "story.title": "ሁለት ልቦች፣ አንድ ታሪክ",
        "story.p1":
            "አንዳንድ ታሪኮች በመጻሕፍት ይጻፋሉ፤ የእኛ ግን አብረን ባሳለፍናቸው ትንንሽ ጊዜያት ተጽፏል።",
        "story.p2":
            "ከልጅነት ጓደኝነት እስከዚህ ውብ ቀን፣ እያንዳንዱ ጊዜ ወደዚህ መርቶናል።",
        "story.p3":
            "አሁንም ከይሖዋ ጋር የዘላለም ቀጣይ ምዕራፍ ለመጀመር ዝግጁ ነን።",
        "story.verse":
            "ይሁን እንጂ እምነት፣ ተስፋ፣ ፍቅር፣ እነዚህ ሦስቱ ይቀጥላሉ፤ ከእነዚህ መካከል የሚበልጠው ግን ፍቅር ነው።",
        "story.verseRef": "1ኛ ቆሮንቶስ 13፡13",
        "details.label": "ከእኛ ጋር ይሁኑ",
        "details.title": "ስለ ሰርጋችን",
        "details.ceremony": "የሰርግ ሥነ ሥርዓት",
        "details.ceremonyPlace": "አዲስ አምባ<br>የይሖዋ ምሥክሮች የመንግሥት አዳራሽ",
        "details.zoom": "የዙም ስብሰባ",
        "details.zoomInfo": "የዙም መታወቂያ፡ 990 863 5436<br>የይለፍ ቃል፡ 303030",
        "gallery.label": "ጊዜያቶቻችን",
        "gallery.title": "ትውስታዎቻችን",
        "gallery.note": "ከጉዞአችን የተወሰኑ ውድ ፎቶዎችን ያንሸራቱ።",
        "gallery.trackAria": "የፎቶ ማእከል",
        "gallery.prev": "ቀዳሚ ፎቶ",
        "gallery.next": "ቀጣይ ፎቶ",
        "gallery.goto": "ወደ ፎቶ {n} ሂድ",
        "location.label": "ያግኙን",
        "location.title": "የሰርግ ቦታ",
        "location.address": "XQ68+MCP፣ አዲስ አበባ<br>ኢትዮጵያ",
        "location.directions": "አቅጣጫ ያግኙ",
        "wishes.label": "ከልባችሁ",
        "wishes.title": "የእንግዶች ምኞት",
        "wishes.intro":
            "ለመድሃኒት እና ሳሙኤል አጭር ምኞት ያጋሩ — ቃላቶቻችሁ እዚህ ለሁሉም ይታያሉ።",
        "wishes.empty": "የመጀመሪያው ምኞት እርስዎ ይሁኑ።",
        "wishes.limit": "አንድ ምኞት ማጋራት ይችላሉ።",
        "wishes.nameLabel": "ስምዎ",
        "wishes.messageLabel": "ምኞትዎ",
        "wishes.namePlaceholder": "ስምዎ",
        "wishes.messagePlaceholder": "ለጥንዶቹ ምኞትዎን ይጻፉ...",
        "wishes.send": "ምኞት ላክ",
        "wishes.edit": "አርትዕ",
        "wishes.delete": "ሰርዝ",
        "wishes.save": "አስቀምጥ",
        "wishes.cancel": "ይቅር",
        "wishes.already": "እናመሰግናለን — ምኞትዎን አስቀድመው አጋርተዋል።",
        "wishes.limitReached": "ገደብ ተደርሷል",
        "wishes.sending": "ምኞትዎ እየተላከ ነው...",
        "wishes.sent": "እናመሰግናለን — ምኞትዎ አሁን በግድግዳው ላይ ነው።",
        "wishes.tooLong": "እባክዎ ምኞትዎን በትንሹ ያሳጥሩ።",
        "wishes.loadError": "ምኞቶችን መጫን አልተቻለም።",
        "wishes.firebaseError": "ፋየርቤዝ መጫን አልተቻለም። እባክዎ ያድሱ።",
        "wishes.configError": "ምኞቶች በቅርብ ይዘጋጃሉ።",
        "wishes.sendError": "ይቅርታ፣ ችግር ተፈጥሯል። እባክዎ እንደገና ይሞክሩ።",
        "wishes.deleteConfirm": "ይህን ምኞት መሰረዝ ይፈልጋሉ?",
        "wishes.editError": "ምኞቱን ማርትዕ አልተቻለም።",
        "wishes.deleteError": "ምኞቱን መሰረዝ አልተቻለም።",
        "wishes.emptyFields": "ስም እና ምኞት ባዶ መሆን አይችሉም።",
        "photo.label": "ፍቅሩን ያስቀምጡ",
        "photo.title": "ፎቶ ያጋሩ",
        "photo.text":
            "ውብ ፎቶ አለዎት? በዋትስአፕ ይላኩልን — ለማቆየት እንወዳለን።",
        "photo.button": "በዋትስአፕ ፎቶ ያጋሩ",
        "thanks.label": "በምስጋና ልብ",
        "thanks.title": "እናመሰግናለን",
        "thanks.text": "የታሪካችን አካል ስለሆናችሁ እናመሰግናለን።",
        "footer.date": "ህዳር 14፣ 2026",
        
        "music.pause": "ሙዚቃ አቁም",
        "music.play": "ሙዚቃ አጫውት",
        "lang.group": "ቋንቋ"
    }
};

function t(key) {
    const table = I18N[currentLang] || I18N.en;
    if (table[key] != null) {
        return table[key];
    }
    if (I18N.en[key] != null) {
        return I18N.en[key];
    }
    return key;
}

function applyLanguage(lang) {
    currentLang = lang === "am" ? "am" : "en";

    try {
        localStorage.setItem(LANG_KEY, currentLang);
    } catch (e) {
        // ignore
    }

    document.documentElement.lang = currentLang === "am" ? "am" : "en";
    document.body.classList.toggle("lang-am", currentLang === "am");

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
        const key = el.getAttribute("data-i18n");
        if (key) {
            el.textContent = t(key);
        }
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
        const key = el.getAttribute("data-i18n-html");
        if (key) {
            el.innerHTML = t(key);
        }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
        const key = el.getAttribute("data-i18n-placeholder");
        if (key) {
            el.setAttribute("placeholder", t(key));
        }
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
        const key = el.getAttribute("data-i18n-aria");
        if (key) {
            el.setAttribute("aria-label", t(key));
        }
    });

    const switcher = document.getElementById("langSwitch");
    if (switcher) {
        switcher.setAttribute("aria-label", t("lang.group"));
        switcher.querySelectorAll(".lang-btn").forEach(function (btn) {
            const active = btn.getAttribute("data-lang") === currentLang;
            btn.classList.toggle("is-active", active);
            btn.setAttribute("aria-pressed", active ? "true" : "false");
        });
    }

    const musicToggle = document.getElementById("musicToggle");
    if (musicToggle && !musicToggle.hidden) {
        setMusicUI(musicPlaying);
    }

    const wishForm = document.getElementById("wishForm");
    const wishStatus = document.getElementById("wishStatus");
    const wishSubmit = document.getElementById("wishSubmit");
    if (wishForm && wishStatus && wishSubmit) {
        updateGuestFormAvailability(wishStatus, wishForm, wishSubmit);
    }

    const wall = document.getElementById("wishesWall");
    const empty = document.getElementById("wishesEmpty");
    if (wall && typeof lastWishDocs !== "undefined") {
        paintWishesWall(wall, empty);
    }
}

function initLanguage() {
    let saved = "en";
    try {
        saved = localStorage.getItem(LANG_KEY) || "en";
    } catch (e) {
        saved = "en";
    }

    applyLanguage(saved === "am" ? "am" : "en");

    const switcher = document.getElementById("langSwitch");
    if (!switcher) {
        return;
    }

    switcher.addEventListener("click", function (event) {
        const btn = event.target.closest(".lang-btn");
        if (!btn) {
            return;
        }
        const lang = btn.getAttribute("data-lang");
        if (lang && lang !== currentLang) {
            applyLanguage(lang);
        }
    });
}


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
        toggle.setAttribute("aria-label", t("music.pause"));
    } else {
        toggle.classList.remove("is-playing");
        toggle.setAttribute("aria-label", t("music.play"));
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
        status.textContent = t("wishes.already");
        if (submit) {
            submit.textContent = t("wishes.limitReached");
        }
    }
}

function renderWishCard(wish) {
    const card = document.createElement("article");
    card.className = "wish-card";
    card.dataset.id = wish.id || "";

    card.innerHTML =
        '<div class="wish-card-view">' +
        '<p class="wish-card-message">“' + escapeHtml(wish.message) + '”</p>' +
        '<p class="wish-card-meta">' +
        '<span class="wish-card-name">' + escapeHtml(wish.name) + "</span>" +
        (wish.createdAt
            ? '<span class="wish-card-date">' +
              escapeHtml(formatWishDate(wish.createdAt)) +
              "</span>"
            : "") +
        "</p>" +
        '<div class="wish-card-actions">' +
        '<button type="button" class="wish-edit-btn">' +
        t("wishes.edit") +
        "</button>" +
        '<button type="button" class="wish-delete-btn">' +
        t("wishes.delete") +
        "</button>" +
        "</div>" +
        "</div>" +
        '<form class="wish-card-edit" hidden>' +
        '<label class="wish-label" for="edit-name-' +
        escapeHtml(wish.id) +
        '">' +
        t("wishes.nameLabel") +
        "</label>" +
        '<input class="wish-input" id="edit-name-' +
        escapeHtml(wish.id) +
        '" type="text" maxlength="80" required value="' +
        escapeHtml(wish.name) +
        '">' +
        '<label class="wish-label" for="edit-msg-' +
        escapeHtml(wish.id) +
        '">' +
        t("wishes.messageLabel") +
        "</label>" +
        '<textarea class="wish-textarea" id="edit-msg-' +
        escapeHtml(wish.id) +
        '" rows="3" maxlength="500" required>' +
        escapeHtml(wish.message) +
        "</textarea>" +
        '<div class="wish-card-actions">' +
        '<button type="submit" class="wish-save-btn">' +
        t("wishes.save") +
        "</button>" +
        '<button type="button" class="wish-cancel-btn">' +
        t("wishes.cancel") +
        "</button>" +
        "</div>" +
        "</form>";

    const view = card.querySelector(".wish-card-view");
    const editForm = card.querySelector(".wish-card-edit");
    const editBtn = card.querySelector(".wish-edit-btn");
    const deleteBtn = card.querySelector(".wish-delete-btn");
    const cancelBtn = card.querySelector(".wish-cancel-btn");
    const nameInput = card.querySelector(".wish-card-edit .wish-input");
    const messageInput = card.querySelector(".wish-card-edit .wish-textarea");

    if (editBtn && view && editForm) {
        editBtn.addEventListener("click", function () {
            view.hidden = true;
            editForm.hidden = false;
            if (nameInput) {
                nameInput.focus();
            }
        });
    }

    if (cancelBtn && view && editForm) {
        cancelBtn.addEventListener("click", function () {
            editForm.hidden = true;
            view.hidden = false;
            if (nameInput) {
                nameInput.value = wish.name || "";
            }
            if (messageInput) {
                messageInput.value = wish.message || "";
            }
        });
    }

    if (editForm) {
        editForm.addEventListener("submit", function (event) {
            event.preventDefault();
            saveWishEdit(
                wish.id,
                nameInput ? nameInput.value : "",
                messageInput ? messageInput.value : ""
            );
        });
    }

    if (deleteBtn) {
        deleteBtn.addEventListener("click", function () {
            deleteWish(wish.id);
        });
    }

    return card;
}

function saveWishEdit(id, name, message) {
    if (!wishesDb || !id) {
        return;
    }

    const cleanName = String(name || "").trim();
    const cleanMessage = String(message || "").trim();

    if (!cleanName || !cleanMessage) {
        window.alert(t("wishes.emptyFields"));
        return;
    }

    wishesDb
        .collection("wishes")
        .doc(id)
        .update({
            name: cleanName.slice(0, 80),
            message: cleanMessage.slice(0, 500)
        })
        .catch(function (err) {
            const detail = err && err.message ? " " + err.message : "";
            window.alert(t("wishes.editError") + detail);
        });
}

function deleteWish(id) {
    if (!wishesDb || !id) {
        return;
    }

    if (!window.confirm(t("wishes.deleteConfirm"))) {
        return;
    }

    wishesDb
        .collection("wishes")
        .doc(id)
        .delete()
        .catch(function () {
            window.alert(t("wishes.deleteError"));
        });
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
        status.textContent = t("wishes.configError");
        return;
    }

    if (typeof firebase === "undefined") {
        status.hidden = false;
        status.className = "wish-status is-error";
        status.textContent = t("wishes.firebaseError");
        return;
    }

    if (!firebase.apps.length) {
        firebase.initializeApp(FIREBASE_CONFIG);
    }
    wishesDb = firebase.firestore();

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
                status.textContent = t("wishes.loadError");
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
            status.textContent = t("wishes.tooLong");
            return;
        }

        submit.disabled = true;
        status.hidden = false;
        status.className = "wish-status";
        status.textContent = t("wishes.sending");

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
                status.textContent = t("wishes.sent");
                form.reset();
                updateGuestFormAvailability(status, form, submit);
            })
            .catch(function () {
                status.className = "wish-status is-error";
                status.textContent = t("wishes.sendError");
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

function initGalleryCarousel() {
    const track = document.getElementById("galleryTrack");
    const dotsWrap = document.getElementById("galleryDots");
    const prevBtn = document.getElementById("galleryPrev");
    const nextBtn = document.getElementById("galleryNext");
    const currentEl = document.getElementById("galleryCurrent");
    const totalEl = document.getElementById("galleryTotal");

    if (!track || !dotsWrap) {
        return;
    }

    const slides = Array.prototype.slice.call(
        track.querySelectorAll(".gallery-slide")
    );

    if (!slides.length) {
        return;
    }

    if (totalEl) {
        totalEl.textContent = String(slides.length);
    }

    dotsWrap.innerHTML = "";
    slides.forEach(function (_slide, index) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "gallery-dot" + (index === 0 ? " is-active" : "");
        dot.setAttribute(
            "aria-label",
            t("gallery.goto").replace("{n}", String(index + 1))
        );
        dot.addEventListener("click", function () {
            goTo(index);
        });
        dotsWrap.appendChild(dot);
    });

    const dots = Array.prototype.slice.call(
        dotsWrap.querySelectorAll(".gallery-dot")
    );

    function currentIndex() {
        const width = track.clientWidth || 1;
        return Math.round(track.scrollLeft / width);
    }

    function updateUi(index) {
        const safe = Math.max(0, Math.min(index, slides.length - 1));
        if (currentEl) {
            currentEl.textContent = String(safe + 1);
        }
        dots.forEach(function (dot, i) {
            dot.classList.toggle("is-active", i === safe);
        });
    }

    function goTo(index) {
        const safe = Math.max(0, Math.min(index, slides.length - 1));
        track.scrollTo({
            left: safe * track.clientWidth,
            behavior: "smooth"
        });
        updateUi(safe);
    }

    let scrollTick = null;
    track.addEventListener(
        "scroll",
        function () {
            if (scrollTick) {
                return;
            }
            scrollTick = window.requestAnimationFrame(function () {
                scrollTick = null;
                updateUi(currentIndex());
            });
        },
        { passive: true }
    );

    if (prevBtn) {
        prevBtn.addEventListener("click", function () {
            goTo(currentIndex() - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", function () {
            goTo(currentIndex() + 1);
        });
    }

    track.addEventListener("keydown", function (event) {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            goTo(currentIndex() - 1);
        } else if (event.key === "ArrowRight") {
            event.preventDefault();
            goTo(currentIndex() + 1);
        }
    });

    window.addEventListener(
        "resize",
        function () {
            const index = currentIndex();
            track.scrollTo({
                left: index * track.clientWidth,
                behavior: "auto"
            });
            updateUi(index);
        },
        { passive: true }
    );

    updateUi(0);
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
    initLanguage();
    createPetals();
    initWeddingMusic();
    initEnvelopeAccess();
    initHeroParallax();
    initFirebaseWishes();
    initGalleryCarousel();
    initAddToCalendar();
    // Scroll reveals start after the envelope opens
});
