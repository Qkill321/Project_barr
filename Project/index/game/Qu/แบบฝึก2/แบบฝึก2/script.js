let questions = [
    { question: "I ___ to the store.", answer: "go" },
    { question: "She ___ a book.", answer: "reads" },
    { question: "We ___ playing soccer.", answer: "are" },
    { question: "We ___ playing soccer.", answer: "are" },
    { question: "We ___ playing soccer.", answer: "are" },
    { question: "I ___ to the store.", answer: "go" },
    { question: "She ___ a book.", answer: "reads" },
    { question: "We ___ playing soccer.", answer: "are" },
    { question: "We ___ playing soccer.", answer: "are" },
    { question: "We ___ playing soccer.", answer: "are" },
  ];
  

  let userAnswers = [];
  

  function displayQuestions() {
    const questionContainer = document.getElementById("questions");
    questionContainer.innerHTML = ""; 
  
    questions.forEach((q, index) => {
      const questionHTML = `
        <div>
          <p>${index + 1}. ${q.question}</p>
          <input type="text" id="q${index + 1}" placeholder="พิมพ์คำตอบของคุณที่นี่..." />
        </div>
      `;
      questionContainer.innerHTML += questionHTML;
    });
  }
  

  function submitAnswers() {
    let correctCount = 0;
    let incorrectCount = 0;
    let wrongAnswers = [];
  
    questions.forEach((q, index) => {
      const userAnswer = document.getElementById(`q${index + 1}`).value.toLowerCase();
      
      if (userAnswer === q.answer) {
        correctCount++;
      } else {
        incorrectCount++;
        wrongAnswers.push({
          question: q.question,
          userAnswer: userAnswer,
          correctAnswer: q.answer,
          questionNumber: index + 1
        });
      }
    });

    const totalQuestions = questions.length;
    const score = (correctCount / totalQuestions) * 100;
  
    let wrongAnswersHTML = '';
    if (wrongAnswers.length > 0) {
      wrongAnswersHTML = `
        <div class="wrong-answers">
          <h3>คำตอบที่ถูกต้องสำหรับข้อที่ตอบผิด:</h3>
          <div class="answer-buttons">
            ${wrongAnswers.map(w => `
              <button class="answer-button" data-question="${w.questionNumber}">
                ดูข้อ ${w.questionNumber}
              </button>
            `).join('')}
          </div>
          <div class="answer-details">
            ${wrongAnswers.map(w => `
              <div class="answer-detail" id="answer-${w.questionNumber}" style="display: none;">
                <p>ข้อ ${w.questionNumber}: ${w.question}</p>
                <p>คำตอบของคุณ: ${w.userAnswer || '(ไม่ได้ตอบ)'}</p>
                <p>คำตอบที่ถูกต้อง: ${w.correctAnswer}</p>
                <hr>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
  
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-button">&times;</span>
        <div class="score-display">
          <h2>ผลลัพธ์</h2>
          <p>คุณตอบถูก ${correctCount} ข้อ จากทั้งหมด ${totalQuestions} ข้อ</p>
          <p>คะแนน: ${score.toFixed(1)}%</p>
          <p>ถูก: ${correctCount} ข้อ | ผิด: ${incorrectCount} ข้อ</p>
          ${wrongAnswersHTML}
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';


    modal.querySelectorAll('.answer-button').forEach(button => {
      button.addEventListener('click', function() {
        const questionNumber = this.getAttribute('data-question');
        const answerDetail = modal.querySelector(`#answer-${questionNumber}`);
        

        modal.querySelectorAll('.answer-detail').forEach(detail => {
          detail.style.display = 'none';
        });
        

        answerDetail.style.display = 'block';
      });
    });


    modal.querySelector('.close-button').onclick = function() {
      modal.style.display = 'none';
      document.body.removeChild(modal);
    };


    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
        document.body.removeChild(modal);
      }
    };
  }
  

  displayQuestions();
  