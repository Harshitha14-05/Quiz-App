const questions = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Creative Style System"
    ],
    answer: "Cascading Style Sheets"
  },
  {
    question: "What year was JavaScript launched?",
    options: ["1996", "1995", "1994", "None of the above"],
    answer: "1995"
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Google", "Netscape", "Microsoft", "Sun Microsystems"],
    answer: "Netscape"
  },
  {
    question: "Which HTML tag is used to link JavaScript file?",
    options: ["<js>", "<javascript>", "<script>", "<link>"],
    answer: "<script>"
  },
  {
    question: "Which of these is NOT a programming language?",
    options: ["Python", "HTML", "C++", "Java"],
    answer: "HTML"
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["let", "var", "const", "All of the above"],
    answer: "All of the above"
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "/* */", "#", "<!-- -->"],
    answer: "//"
  }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");
const quizEl = document.getElementById("quiz");
const timerEl = document.getElementById("time");

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  resultEl.classList.add("hidden");   // hide result
  resultEl.innerHTML = "";            // clear old score
  quizEl.classList.remove("hidden");  // show quiz again
  showQuestion();
}

function showQuestion() {
  resetState();
  startTimer();

  let currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;

  currentQuestion.options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option-btn");
    button.onclick = () => selectAnswer(button, option);
    optionsEl.appendChild(button);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  optionsEl.innerHTML = "";
  clearInterval(timer);
  timeLeft = 15;
  timerEl.textContent = timeLeft;
}

function selectAnswer(button, selected) {
  let correct = questions[currentQuestionIndex].answer;

  // disable all buttons
  Array.from(optionsEl.children).forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.style.background = "#28c76f"; // green for correct
      btn.style.color = "#fff";
    } else {
      btn.style.background = "#ff6b6b"; // red for wrong
      btn.style.color = "#fff";
    }
  });

  if (selected === correct) {
    score++;
  }

  nextBtn.style.display = "block";
  clearInterval(timer);
}

function showResult() {
  quizEl.classList.add("hidden");
  resultEl.classList.remove("hidden");
  resultEl.innerHTML = `
    <h2>Your Score: ${score} / ${questions.length}</h2>
    <button onclick="startQuiz()">Play Again</button>
  `;
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextBtn.style.display = "block"; // move if time runs out
    }
  }, 1000);
}

startQuiz();
