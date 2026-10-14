const acceptedNames = new Set(["irene", "johnerine"]);
const nameForm = document.getElementById("name-form");
const nameInput = document.getElementById("boyfriend-name");
const popup = document.getElementById("correct-popup");
const popupTitle = document.getElementById("popup-title");
const popupMessage = document.getElementById("popup-message");
const popupButton = document.getElementById("popup-button");
const mainCard = document.getElementById("main-card");
const letterBox = document.getElementById("letter-container");
const heartsContainer = document.querySelector(".hearts-container");
const music = document.getElementById("bg-music");
const welcomePopup = document.getElementById("welcome-popup");
const startButton = document.getElementById("start-button");

let returnFocusTo = nameInput;

function showPopup(isCorrect) {
    popupTitle.textContent = isCorrect ? "✅ Correct!" : "❌ Incorrect!";
    popupMessage.textContent = isCorrect
        ? "NAKSSS, alam pangalan ng boyfriend mo 😏"
        : "Mali ah. Sino 'yan? 🤨";
    popupButton.textContent = isCorrect ? "Proceed to Next Page" : "Try Again";
    popupButton.onclick = isCorrect ? goNext : closePopup;
    returnFocusTo = document.activeElement;
    popup.hidden = false;
    popupButton.focus();
}

function closePopup() {
    popup.hidden = true;
    nameInput.value = "";
    returnFocusTo.focus();
}

function goNext() {
    popup.hidden = true;
    mainCard.hidden = true;
    letterBox.hidden = false;
    letterBox.classList.add("entrance");
    letterBox.scrollIntoView({ behavior: "smooth", block: "center" });
}

nameForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value.trim().toLowerCase();
    showPopup(acceptedNames.has(name));
});

popup.addEventListener("click", (event) => {
    if (event.target === popup && popupButton.textContent === "Try Again") {
        closePopup();
    }
});

popup.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && popupButton.textContent === "Try Again") {
        closePopup();
    }
    // Keep keyboard focus inside the one-button dialog.
    if (event.key === "Tab") {
        event.preventDefault();
        popupButton.focus();
    }
});

music.volume = 0.1;

startButton.addEventListener("click", () => {
    const playAttempt = music.play();

    welcomePopup.hidden = true;
    mainCard.inert = false;
    nameInput.focus();

    if (playAttempt && typeof playAttempt.catch === "function") {
        playAttempt.catch((error) => {
            console.warn("Music could not start:", error);
        });
    }
});


welcomePopup.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
        event.preventDefault();
        startButton.focus();
    }
});
startButton.focus();

function createHeart() {
    if (document.hidden) return;
    const heart = document.createElement("div");
    heart.classList.add("spawned-heart");
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = Math.random() * 100 + "vh";
    heart.style.setProperty(
        "--scale",
        Math.random() * 0.7 + 0.5
    );
    heartsContainer.appendChild(heart);

    heart.addEventListener("animationend", () => {
        heart.remove();
    }, { once: true });
}

setInterval(createHeart, 100);