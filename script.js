
/* CHANGE THIS TO YOUR BEST FRIEND'S BIRTHDAY */
const birthdayDate = "2026-10-15T00:00:00+08:00";
const birthday = new Date(birthdayDate);

let confettiStarted = false;

function updateCountdown() {
    const now = new Date();
    let difference = birthday.getTime() - now.getTime();

    const monthsElement = document.getElementById("months");
    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");
    const message = document.getElementById("countdown-message");

    if (difference <= 0) {
    monthsElement.textContent = "00";
    daysElement.textContent = "00";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";


    return;
    }

    // Calculate remaining calendar months
    let months =
        (birthday.getFullYear() - now.getFullYear()) * 12 +
        birthday.getMonth() - now.getMonth();

    let monthDate = new Date(now);
    monthDate.setMonth(monthDate.getMonth() + months);

    if (monthDate > birthday) {
        months--;
        monthDate = new Date(now);
        monthDate.setMonth(monthDate.getMonth() + months);
    }

    // Calculate remaining days, hours, minutes, seconds
    difference = birthday.getTime() - monthDate.getTime();

    const days = Math.floor(difference / 86400000);
    const hours = Math.floor((difference % 86400000) / 3600000);
    const minutes = Math.floor((difference % 3600000) / 60000);
    const seconds = Math.floor((difference % 60000) / 1000);

    monthsElement.textContent = String(months).padStart(2, "0");
    daysElement.textContent = String(days).padStart(2, "0");
    hoursElement.textContent = String(hours).padStart(2, "0");
    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");

    message.textContent = "";
}

updateCountdown();
setInterval(updateCountdown, 1000);

// SURPRISE LETTER
function openLetter() {
    const letter = document.getElementById("letter");
    const button = document.getElementById("letter-button");

    letter.hidden = !letter.hidden;

    button.textContent = letter.hidden
        ? "Open your letter 💌"
        : "Close your letter ♡";

    if (!letter.hidden) {
        letter.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
}


// INTERACTIVE BIRTHDAY CAKE
let candlesBlown = false;

function blowCandles() {
    const cake = document.getElementById("cake");
    const message = document.getElementById("candle-message");
    const button = document.getElementById("candle-button");

    if (!candlesBlown) {
        cake.textContent = "🍰";
        cake.classList.add("blow");

        message.textContent =
            "Wish made! May all your dreams come true! ✨💗";

        button.textContent = "Light the candles again 🕯️";
        candlesBlown = true;

        launchConfetti();
    } else {
        cake.textContent = "🎂";
        cake.classList.remove("blow");

        message.textContent = "Make another wish, Ate! 💕";

        button.textContent = "Blow out the candles 🕯️";
        candlesBlown = false;
    }
}


/* CONFETTI */
function launchConfetti() {
    const colors = [
        "#f4a7c5",
        "#ffd6e7",
        "#d9b8ff",
        "#fff0b3",
        "#ffffff"
    ];

    for (let i = 0; i < 100; i++) {
        const piece = document.createElement("div");

        piece.style.position = "fixed";
        piece.style.left = Math.random() * 100 + "vw";
        piece.style.top = "-20px";
        piece.style.width = "8px";
        piece.style.height = "12px";
        piece.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];
        piece.style.borderRadius = "2px";
        piece.style.zIndex = "9999";
        piece.style.pointerEvents = "none";

        document.body.appendChild(piece);

        const duration = 2500 + Math.random() * 2000;

        piece.animate(
            [
                {
                    transform: "translate(0, 0) rotate(0deg)",
                    opacity: 1
                },
                {
                    transform:
                        `translate(${Math.random() * 200 - 100}px, 110vh) rotate(${Math.random() * 720}deg)`,
                    opacity: 0.8
                }
            ],
            {
                duration: duration,
                easing: "ease-in",
                fill: "forwards"
            }
        );

        setTimeout(() => piece.remove(), duration);
    }
}


/* AUTOMATIC CONFETTI AFTER 3 SECONDS */
window.addEventListener("load", () => {
    setTimeout(() => {
        launchConfetti();
    }, 1000);
});
