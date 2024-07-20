const quizData = [
  {
    question: 'What should you do if you receive an email from an unknown sender?',
    options: ['Open it immediately' , 'Mark it as spam' , 'Reply to it' , 'Ignore it'],
    answer: 'Mark it as spam',
  },
  {
    question: 'Which of the following is a strong password?',
    options: ['password123', '123456', 'MySecureP@ssw0rd!', 'qwerty'],
    answer: 'MySecureP@ssw0rd!',
  },
  {
    question: 'Which of the following should you avoid sharing on social media?',
    options: ['Your favorite movie', 'Your home address', 'Your opinion on a book', 'A picture of your pet'],
    answer: 'Your home address',
  },
  {
    question: 'Which of the following is a sign of a secure website?',
    options: ['The website loads quickly', 'The URL starts with "http://"', 'The URL starts with "https://"', 'The website has colorful graphics'],
    answer: 'The URL starts with "https://"',
  },
  {
    question: 'What should you do if you think your account has been hacked?',
    options: [
      'Change your password immediately',
      'Ignore it',
      'Post about it on social media',
      'Delete your account',
    ],
    answer: 'Change your password immediately',
  },
  {
    question: 'Why is it important to regularly update your software?',
    options: ['To protect against security vulnerabilities', 'To get new features', 'To increase speed', 'To save battery life'],
    answer: 'To protect against security vulnerabilities',
  },
  {
    question: 'Which of these practices helps protect your privacy online?',
    options: [
      'Using public Wi-Fi for banking',
      'Sharing your passwords with friends',
      'Regularly reviewing privacy settings on social media',
      'Clicking on all pop-up ads',
    ],
    answer: 'Regularly reviewing privacy settings on social media',
  },
  {
    question: 'Why should you avoid using public Wi-Fi for sensitive transactions?',
    options: ['It is too slow', 'It is often unreliable', 'It can be easily intercepted by hackers', 'It is expensive'],
    answer: 'It can be easily intercepted by hackers',
  },
  {
    question: 'What should you do before clicking on a link in an email?',
    options: [
      'Click immediately',
      'Hover over the link to see the actual URL',
      'Forward the email to a friend',
      'Delete the email',
    ],
    answer: 'Hover over the link to see the actual URL',
  },
  {
    question: 'What is the safest way to download software?',
    options: ['From peer-to-peer networks', 'From official and trusted websites', 'From email attachments', 'Share the message with others'],
    answer: 'From official and trusted websites',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

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

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
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
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <span style="display: block;">Your Answer: ${incorrectAnswers[i].incorrectAnswer}</span>
        <span style="display: block;">Correct Answer: ${incorrectAnswers[i].correctAnswer}</span>
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}


submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();
