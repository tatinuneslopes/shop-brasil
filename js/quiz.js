// Shopping Brasil - Quiz & Roleta da Sorte
// Baseado fielmente no "video da roleta.mp4"

const QUESTIONS = [
  {
    image: "images/produto1-tv.jpg",
    title: "O que você mais gosta de comprar na Shopping Brasil?",
    options: ["Eletrodomésticos", "Eletrônicos", "PC & Games", "Casa e decoração"]
  },
  {
    image: "images/pc-gamer.jpg",
    title: "Com que frequência você visita nossa loja ou compra online?",
    options: ["Toda semana", "Uma vez por mês", "De vez em quando", "É a minha primeira vez"]
  },
  {
    image: "images/produto2-iphone.jpg",
    title: "O que mais te chama atenção nas promoções da Shopping Brasil?",
    options: ["Preço baixo", "Variedade de produtos", "Parcelamento sem juros", "Qualidade das marcas"]
  },
  {
    image: "images/air-fryer.jpg",
    title: "Qual produto você gostaria de ganhar hoje?",
    options: ["Um smartphone novo", "Um eletrodoméstico", "Um PC Gamer / Som", "Uma surpresa"]
  },
  {
    image: "images/logo-shopping-brasil.jpg",
    title: "Você acredita que merece um super desconto hoje?",
    options: ["Com certeza!", "Claro que sim!", "Mereço demais!", "Sem dúvida!"]
  }
];

let currentQuestionIndex = 0;
let selectedOption = null;
let currentRotation = 0;
let spinCount = 0;
let isSpinning = false;

// Social proof ticker
const SOCIAL_NOTIFICATIONS = [
  { initials: "PO", text: "Pedro Oliveira acabou de ganhar 75% de desconto!" },
  { initials: "AA", text: "Ana Alves acabou de ganhar 50% de desconto!" },
  { initials: "YA", text: "Yasmin Araújo acabou de ganhar 95% de desconto!" },
  { initials: "LS", text: "Lucilene Silva acabou de ganhar 25% de desconto!" },
  { initials: "CM", text: "Carlos Machado acabou de ganhar 100% de desconto!" }
];
let socialIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  drawWheel();
  startSocialProofTicker();
});

// Step Navigation
function showStep(stepId) {
  document.querySelectorAll(".quiz-step").forEach(el => el.classList.remove("active"));
  const step = document.getElementById(stepId);
  if (step) {
    step.classList.add("active");
    window.scrollTo({ top: 0, behavior: "instant" });
  }
}

// Start Quiz
function startQuiz() {
  currentQuestionIndex = 0;
  loadQuestion(0);
  showStep("step-question");
}

// Load Question
function loadQuestion(index) {
  const q = QUESTIONS[index];
  selectedOption = null;

  // Update progress
  const percent = ((index + 1) / QUESTIONS.length) * 100;
  document.getElementById("progressFill").style.width = percent + "%";
  document.getElementById("progressLabel").textContent = Math.round(percent) + " %";

  // Banner image & title
  document.getElementById("questionImg").src = q.image;
  document.getElementById("questionTitle").textContent = q.title;

  // Options
  const grid = document.getElementById("optionsGrid");
  grid.innerHTML = q.options.map((opt, i) => `
    <button class="option-btn" onclick="selectOption(this, '${opt}')">
      ${opt}
    </button>
  `).join("");
}

// Select Option
function selectOption(btn, opt) {
  document.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
  selectedOption = opt;
}

// Next Question with "Processando..." loading spinner
function nextQuestion() {
  if (!selectedOption) {
    // Select first option by default if none clicked
    const first = document.querySelector(".option-btn");
    if (first) selectOption(first, first.textContent.trim());
  }

  // Show "Processando..." screen
  const proc = document.getElementById("step-processing");
  proc.classList.add("active");

  setTimeout(() => {
    proc.classList.remove("active");
    currentQuestionIndex++;

    if (currentQuestionIndex < QUESTIONS.length) {
      loadQuestion(currentQuestionIndex);
    } else {
      // Completed all 5 questions -> Show Unlock Screen with Confetti!
      showStep("step-congrats");
      launchConfetti();
    }
  }, 750);
}

// Go to Roulette Screen
function goToRoulette() {
  showStep("step-roulette");
}

// Wheel Data (8 segments)
const SEGMENTS = [
  { label: "100%", sub: "DE DESCONTO", color: "#f5b700", textColor: "#000000" },
  { label: "75%", sub: "DE DESCONTO", color: "#e60067", textColor: "#ffffff" },
  { label: "50%", sub: "DE DESCONTO", color: "#00b578", textColor: "#ffffff" },
  { label: "↻", sub: "Tente outra vez", color: "#2d313a", textColor: "#ffffff" },
  { label: "25%", sub: "DE DESCONTO", color: "#0099ff", textColor: "#ffffff" },
  { label: "5%", sub: "DE DESCONTO", color: "#e82828", textColor: "#ffffff" },
  { label: "↻", sub: "Tente outra vez", color: "#2d313a", textColor: "#ffffff" },
  { label: "90%", sub: "DE DESCONTO", color: "#00c2b2", textColor: "#ffffff" }
];

// Draw Wheel onto Canvas
function drawWheel() {
  const canvas = document.getElementById("rouletteCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const size = canvas.width;
  const center = size / 2;
  const radius = center - 8;
  const numSegments = SEGMENTS.length;
  const anglePerSegment = (2 * Math.PI) / numSegments;

  ctx.clearRect(0, 0, size, size);

  // Outer gold rim
  ctx.beginPath();
  ctx.arc(center, center, center - 2, 0, 2 * Math.PI);
  ctx.fillStyle = "#1e222a";
  ctx.fill();

  SEGMENTS.forEach((seg, i) => {
    const startAngle = i * anglePerSegment;
    const endAngle = startAngle + anglePerSegment;

    // Segment Wedge
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.arc(center, center, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = seg.color;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#161823";
    ctx.stroke();

    // Segment Text
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(startAngle + anglePerSegment / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = seg.textColor;

    if (seg.label === "↻") {
      ctx.font = "bold 26px sans-serif";
      ctx.fillText("↻", radius - 16, 4);
      ctx.font = "bold 10px sans-serif";
      ctx.fillText(seg.sub, radius - 36, 4);
    } else {
      ctx.font = "900 17px sans-serif";
      ctx.fillText(seg.label, radius - 14, -2);
      ctx.font = "bold 9px sans-serif";
      ctx.fillText(seg.sub, radius - 14, 12);
    }

    ctx.restore();
  });
}

// Trigger Spin
function triggerSpin() {
  if (isSpinning) return;
  isSpinning = true;

  const btn = document.getElementById("btnSpinMain");
  btn.disabled = true;
  document.getElementById("spinStatusLabel").textContent = "Girando...";

  spinCount++;

  // Segment angles (Pointer is at top = 270 degrees)
  let targetAngle = 0;

  if (spinCount === 1) {
    // Land on "Tente outra vez" (index 3 or 6)
    // 5 full rotations (1800 deg) + offset
    targetAngle = 1800 + 112.5;
  } else {
    // Spin 2: Land on "100% DE DESCONTO" (index 0)
    // 6 full rotations (2160 deg) + exact angle for index 0
    targetAngle = currentRotation + 2160 + (360 - (currentRotation % 360)) + 292.5;
  }

  currentRotation = targetAngle;
  const wheel = document.getElementById("wheelRotator");
  wheel.style.transform = `rotate(${currentRotation}deg)`;

  setTimeout(() => {
    isSpinning = false;
    document.getElementById("spinStatusLabel").textContent = "";

    if (spinCount === 1) {
      // First spin failed -> Show Modal 1
      document.getElementById("modalTryAgain").classList.add("active");
    } else {
      // Second spin won 100%!
      launchConfetti();
      document.getElementById("modalWinner").classList.add("active");
    }
  }, 4100);
}

// Retry Spin (Close Modal 1 and prepare spin 2)
function retrySpin() {
  document.getElementById("modalTryAgain").classList.remove("active");
  const btn = document.getElementById("btnSpinMain");
  btn.disabled = false;
  btn.textContent = "GIRAR NOVAMENTE";
  // Auto trigger second spin for convenience
  setTimeout(() => {
    triggerSpin();
  }, 400);
}

// Claim Prize Redirect to TikTok Shop Store
function claimPrizeRedirect() {
  document.getElementById("modalWinner").classList.remove("active");
  window.location.href = "index.html?promo=100off";
}

// Confetti Explosion
function launchConfetti() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 300);
  }
}

// Social Proof Ticker
function startSocialProofTicker() {
  setInterval(() => {
    const bar = document.getElementById("socialProofBar");
    if (!bar) return;

    socialIndex = (socialIndex + 1) % SOCIAL_NOTIFICATIONS.length;
    const item = SOCIAL_NOTIFICATIONS[socialIndex];

    bar.style.opacity = "0";
    setTimeout(() => {
      document.getElementById("spAvatar").textContent = item.initials;
      document.getElementById("spText").textContent = item.text;
      bar.style.opacity = "1";
    }, 300);
  }, 4000);
}
