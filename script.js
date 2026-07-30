/* =====================================================
   WEDDING INVITATION - JAVASCRIPT
   ===================================================== */


/* =====================================================
   OPENING INVITATION
   ===================================================== */

function openInvitation() {

    const envelope = document.querySelector(".envelope");
    const card = document.querySelector(".invite-card");

    // Stop multiple clicks
    if (!envelope || envelope.classList.contains("opening")) {
        return;
    }

    envelope.classList.add("opening");
    envelope.classList.add("open");

    // Hide the button
    const button = document.querySelector(".invite-card button");

    if (button) {
        button.style.opacity = "0";
        button.style.pointerEvents = "none";
    }

    // Wait for envelope animation
    setTimeout(function () {

        if (card) {
            card.style.opacity = "0";
            card.style.transform = "scale(0.95)";
        }

    }, 900);

    // Open wedding invitation page
    setTimeout(function () {

        window.location.href = "invitation.html";

    }, 1700);
}


/* =====================================================
   COUNTDOWN
   ===================================================== */

// Wedding date
const weddingDate = new Date("NOV 20, 2026 09:00:00").getTime();


function updateCountdown() {

    const now = new Date().getTime();

    const difference = weddingDate - now;


    // If the wedding date has arrived
    if (difference <= 0) {

        const days = document.getElementById("days");
        const hours = document.getElementById("hours");
        const minutes = document.getElementById("minutes");
        const seconds = document.getElementById("seconds");

        if (days) days.textContent = "0";
        if (hours) hours.textContent = "0";
        if (minutes) minutes.textContent = "0";
        if (seconds) seconds.textContent = "0";

        return;
    }


    // Calculate time
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


    // Find elements
    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");


    // Update page
    if (days) {
        days.textContent = daysValue;
    }

    if (hours) {
        hours.textContent =
            String(hoursValue).padStart(2, "0");
    }

    if (minutes) {
        minutes.textContent =
            String(minutesValue).padStart(2, "0");
    }

    if (seconds) {
        seconds.textContent =
            String(secondsValue).padStart(2, "0");
    }
}


/* =====================================================
   START COUNTDOWN
   ===================================================== */

updateCountdown();

setInterval(updateCountdown, 1000);