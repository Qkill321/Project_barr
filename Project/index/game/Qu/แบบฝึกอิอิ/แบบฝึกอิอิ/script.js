const quizData = [
    {
      question: "What is the correct past tense of the verb 'play'?",
      choices: ["playd", "played", "playied", "playout"],
      answer: "played"
    },
    {
      question: "Which word is the correct past tense of 'clean'?",
      choices: ["cleaned", "cleant", "cleanned", "cleanty"],
      answer: "cleaned"
    },
    {
      question: "How do you change the verb 'stop' to past tense?",
      choices: ["stoped", "stopped", "stopd", "stoppt"],
      answer: "stopped"
    },
    {
      question: "What is the past tense of 'love'?",
      choices: ["loved", "lovd", "loveed", "lovet"],
      answer: "loved"
    },
    {
      question: "Which of the following is not the correct past form?",
      choices: ["walked", "watched", "listen", "talked"],
      answer: "listen"
    },
    {
      question: "Choose the correct past tense of 'cry'.",
      choices: ["cryed", "cried", "cryd", "crien"],
      answer: "cried"
    },
    {
      question: "What is the correct past form of 'open'?",
      choices: ["opened", "openet", "openned", "openned"],
      answer: "opened"
    },
    {
      question: "Which of these verbs changes by doubling the final consonant before adding -ed?",
      choices: ["plan", "play", "need", "enjoy"],
      answer: "plan"
    },
    {
      question: "What is the past tense of 'hurry'?",
      choices: ["hurryed", "hurried", "hurriied", "hurryied"],
      answer: "hurried"
    },
    {
      question: "Which sentence is written correctly in the past tense?",
      choices: ["She stoped the car.", "He cleaned his room.", "I playd football.", "We watchted TV."],
      answer: "He cleaned his room."
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let userAnswers = [];
  
  const questionEl = document.getElementById('question');
  const choicesEl = document.getElementById('choices');
  const resultEl = document.getElementById('result');
  const nextBtn = document.getElementById('next-btn');
  const backBtn = document.getElementById('back-btn');
  
  const modal = document.getElementById('scoreModal');
  const closeModal = document.getElementById('closeModal');
  const finalScoreEl = document.getElementById('finalScore');
  const questionReviewEl = document.getElementById('questionReview');
  
  function loadQuestion() {
    const current = quizData[currentQuestion];
    questionEl.textContent = `Question ${currentQuestion + 1}: ${current.question}`;
    choicesEl.innerHTML = "";
    resultEl.textContent = "";
    nextBtn.style.display = "none";
    backBtn.style.display = currentQuestion > 0 ? "inline-block" : "none";
  
    current.choices.forEach(choice => {
      const btn = document.createElement("button");
      btn.textContent = choice;
      btn.className = "choice-btn";
      
      if (userAnswers[currentQuestion]) {
        btn.disabled = true;
        if (choice === userAnswers[currentQuestion].selected) {
          btn.style.backgroundColor = userAnswers[currentQuestion].correct ? "lightgreen" : "lightcoral";
        }
        resultEl.textContent = userAnswers[currentQuestion].correct ? "✅" : "❌";
        nextBtn.style.display = "inline-block";
      } else {
        btn.addEventListener('click', () => selectAnswer(btn, current.answer));
      }
      
      choicesEl.appendChild(btn);
    });
  }
  
  function selectAnswer(button, correctAnswer) {
    const selected = button.textContent;
    const allButtons = document.querySelectorAll(".choice-btn");
  
    allButtons.forEach(btn => btn.disabled = true);
  
    if (selected === correctAnswer) {
      button.style.backgroundColor = "lightgreen";
      resultEl.textContent = "✅";
      score++;
    } else {
      button.style.backgroundColor = "lightcoral";
      resultEl.textContent = "❌";
    }
  
    userAnswers[currentQuestion] = {
      selected: selected,
      correct: selected === correctAnswer
    };
  
    nextBtn.style.display = "inline-block";
  }
  
  nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showSummary();
    }
  });
  
  backBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
      currentQuestion--;
      loadQuestion();
    }
  });
  
  function showSummary() {
    questionEl.textContent = "Quiz Completed!";
    choicesEl.innerHTML = "";
    resultEl.innerHTML = "";
    nextBtn.style.display = "none";
    backBtn.style.display = "none";

    // Show modal
    modal.style.display = "flex";
    
    // Display final score
    finalScoreEl.textContent = `${score} / ${quizData.length}`;
    
    // Create question review
    questionReviewEl.innerHTML = quizData.map((q, index) => {
      const userAnswer = userAnswers[index];
      const isCorrect = userAnswer?.correct;
      return `
        <div class="question-review-item">
          <p><strong>Question ${index + 1}:</strong> ${q.question}</p>
          <p class="${isCorrect ? 'correct-answer' : 'wrong-answer'}">
            ${isCorrect ? '✅ Correct' : `❌ Wrong (Your answer: ${userAnswer?.selected}, Correct answer: ${q.answer})`}
          </p>
        </div>
      `;
    }).join('');
  }
  
  // Close modal when clicking the close button
  closeModal.addEventListener('click', () => {
    modal.style.display = "none";
  });
  
  // Close modal when clicking outside the modal content
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
  
  loadQuestion();
  