document.addEventListener("DOMContentLoaded", () => {
  const timerDisplay = document.getElementById("timer");
  const studyButton = document.getElementById("study");
  const relaxButton = document.getElementById("relax");
  const phraseDisplay = document.getElementById("phrase");

  if (!timerDisplay || !studyButton || !relaxButton || !phraseDisplay) {
    console.error("Missing required DOM elements");
    return;
  }

  let timer = null;
  let timeLeft = 0;
  let mode = "study";
  let phraseIndex = 0;
  let phraseTimer = null;

  const phrases = [
    "You’ve got this 💪",
    "Stay focused, one step at a time 👣",
    "Progress, not perfection 🌱",
    "Deep breath — you’re doing great 🌸",
    "Keep your momentum going ⚡",
    "Every second counts ⏳",
    "Small steps lead to big results 🚀",
    "Your future self will thank you 🙏"
  ];

  // 🎵 Simple sound generator (Web Audio API)
  function playBeep(frequency = 440, duration = 200, type = "sine") {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime); // volume

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration / 1000);
  }

  function startTimer(minutes, seconds) {
    clearInterval(timer);
    timeLeft = minutes * 60 + seconds;
    updateDisplay();

    timer = setInterval(() => {
      timeLeft--;
      if (timeLeft < 0) {
        clearInterval(timer);
        playBeep(600, 450, "triangle"); // 🔔 Sound when timer ends
        switchMode();
      } else {
        updateDisplay();
      }
    }, 1000);
  }

  function updateDisplay() {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    timerDisplay.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  function switchMode() {
    if (mode === "study") {
      mode = "relax";
      activateButton(relaxButton);
      startTimer(5, 0);
    } else {
      mode = "study";
      activateButton(studyButton);
      startTimer(25, 0);
    }
  }

  function activateButton(activeBtn) {
    studyButton.classList.remove("active");
    relaxButton.classList.remove("active");
    activeBtn.classList.add("active");
    playBeep(440, 150, "sine");
  }

  function startPhraseRotation() {
    clearInterval(phraseTimer);
    phraseDisplay.textContent = phrases[phraseIndex];
    phraseTimer = setInterval(() => {
      phraseIndex = (phraseIndex + 1) % phrases.length;
      phraseDisplay.textContent = phrases[phraseIndex];
    }, 30000);
  }

  // 🎮 Button click events
  studyButton.addEventListener("click", () => {
    mode = "study";
    activateButton(studyButton);
    startTimer(25, 0);
  });

  relaxButton.addEventListener("click", () => {
    mode = "relax";
    activateButton(relaxButton);
    startTimer(5, 0);
  });

});
