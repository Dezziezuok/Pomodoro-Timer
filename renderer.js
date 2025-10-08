let timerDisplay = document.getElementById('timer');
let studyButton = document.getElementById('study');
let relaxButton = document.getElementById('relax');
let phraseDisplay = document.getElementById('phrase');

let timer;
let timeLeft = 0;
let mode = "study";
let phraseIndex = 0;
let phraseTimer;

// Encouraging phrases
const phrases = [
  "You’ve got this 💪",
  "Stay focused, one step at a time 👣",
  "Progress, not perfection 🌱",
  "Deep breath — you’re doing great 🌸",
  "Keep your momentum going ⚡",
  "Every second counts ⏳",
  "Small steps lead to big results 🚀",
  "Your future self will thank you 🙌"
];


// Start timer function
function startTimer(minutes, seconds) {
  clearInterval(timer);
  timeLeft = minutes * 60 + seconds;
  updateDisplay();

  timer = setInterval(() => {
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(timer);
      switchMode();
    } else {
      updateDisplay();
    }
  }, 1000);
}

// Update display every second
function updateDisplay() {
  let mins = Math.floor(timeLeft / 60);
  let secs = timeLeft % 60;
  timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Switch between Study and Relax
function switchMode() {
  if (mode === "study") {
    mode = "relax";
    activateButton(relaxButton);
    startTimer(7, 30);
  } else {
    mode = "study";
    activateButton(studyButton);
    startTimer(40, 0);
  }
}

// Highlight active button
function activateButton(activeBtn) {
  studyButton.classList.remove("active");
  relaxButton.classList.remove("active");
  activeBtn.classList.add("active");
}

// Phrase rotation
function startPhraseRotation() {
  clearInterval(phraseTimer);
  phraseDisplay.textContent = phrases[phraseIndex];
  phraseTimer = setInterval(() => {
    phraseIndex = (phraseIndex + 1) % phrases.length;
    phraseDisplay.textContent = phrases[phraseIndex];
  }, 30000); // 30 seconds
}

// Button events
studyButton.addEventListener('click', () => {
  mode = "study";
  activateButton(studyButton);
  startTimer(40, 0);
});

relaxButton.addEventListener('click', () => {
  mode = "relax";
  activateButton(relaxButton);
  startTimer(7, 30);
});

// Initial setup
startPhraseRotation();
activateButton(studyButton);
