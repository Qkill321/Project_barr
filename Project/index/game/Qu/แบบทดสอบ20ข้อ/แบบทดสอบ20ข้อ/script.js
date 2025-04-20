const quizData = [
  {
    question: "The professor's explanation was so __________ that everyone understood.",
    options: ["ambiguous", "confusing", "clear", "irrelevant"],
    answer: "clear",
  },
  {
    question: "He was __________ for his outstanding contribution to science.",
    options: ["ignored", "punished", "criticized", "recognized"],
    answer: "recognized",
  },
  {
    question: "The company plans to __________ 50 new employees next year.",
    options: ["employ", "apply", "resign", "fire"],
    answer: "employ",
  },
  {
    question: "The results were not __________; we expected something different.",
    options: ["surprising", "predicted", "disappointing", "expected"],
    answer: "expected",
  },
  {
    question: "We need to find an __________ solution to this problem",
    options: [
      "immediate",
      "imaginary",
      "immature",
      "immoral",
    ],
    answer: "immediate",
  },
  {
    question: "If I __________ you, I wouldn’t do that.",
    options: ["am", "were", "was", "be"],
    answer: "were",
  },
  {
    question: "he __________ working here since 2022.",
    options: [
      "is",
      "has been",
      "was",
      "have been",
    ],
    answer: "has been",
  },
  {
    question: "he report must __________ by Friday.",
    options: ["submit", "submitting", "be submitting", "submitted"],
    answer: "be submitted",
  },
  {
    question: "either John nor his friends __________ coming to the meeting.",
    options: [
      "is",
      "was",
      "are",
      "be",
    ],
    answer: "are",
  },
  {
    question: "He __________ to the gym every day, but now he’s too busy.",
    options: ["goes", "go", "went", "used to go"],
    answer: "used to go",
  },
  {
    question: "She didn’t come to class __________ she was sick.",
    options: ["because", "although", "so", "despite"],
    answer: "because",
  },
  {
    question: "He more you practice, __________ you become.",
    options: ["the best", "better", "the better", "best"],
    answer: "the better",
  },
  {
    question: "He was late __________ the heavy traffic.",
    options: [
      "because",
      "because of",
      "although",
      "but",
    ],
    answer: "because of",
  },
  {
    question: "I’m not used to __________ in front of a big audience.",
    options: ["speak", "speaking", "spoke", "speaks"],
    answer: "speaking",
  },
  {
    question: "__________ we had more time, we could finish the project.",
    options: ["Unless", "If", "Although", "Even"],
    answer: "If",
  },
  {
    question: "I will call you __________ I arrive at the airport.",
    options: [
      "while",
      "although",
      "when",
      "unless",
    ],
    answer: "when",
  },
  {
    question: "He studied very hard, __________ he passed the exam with flying colors.",
    options: ["but", "so", "because", "although"],
    answer: "so",
  },
  {
    question: "She didn’t attend the meeting __________ she was feeling sick.",
    options: ["despite", "because", "unless", "although"],
    answer: "because",
  },
  {
    question: "The weather was terrible; __________, we decided to go hiking.",
    options: ["therefore", "however", "because", "since"],
    answer: "however",
  },
  {
    question: "If I had known about the traffic, I __________ earlier",
    options: ["will leave", "leave", "would have left", "would leave"],
    answer: "would have left",
  },
];

const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const submitButton = document.getElementById("submit");
const retryButton = document.getElementById("retry");
const showAnswerButton = document.getElementById("showAnswer");

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement("div");
  questionElement.className = "question";
  questionElement.innerHTML = `${currentQuestion + 1}.${questionData.question}`;

  const optionsElement = document.createElement("div");
  optionsElement.className = "options";

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement("label");
    option.className = "option";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "quiz";
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = "";
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  retryButton.style.display = "inline-block";
  showAnswerButton.style.display = "inline-block";
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = "block";
  submitButton.style.display = "inline-block";
  retryButton.style.display = "none";
  showAnswerButton.style.display = "none";
  resultContainer.innerHTML = "";
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  retryButton.style.display = "inline-block";
  showAnswerButton.style.display = "none";

  let incorrectAnswersHtml = "";
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
  }

  resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
}

submitButton.addEventListener("click", checkAnswer);
retryButton.addEventListener("click", retryQuiz);
showAnswerButton.addEventListener("click", showAnswer);

displayQuestion();
