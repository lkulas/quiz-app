"use strict";

const QUIZ = [
  {
    question: 'What kind of food did Walter throw onto his roof?',
    answers: [
      'Chinese takeout',
      'Fried chicken',
      'Pizza',
      'Burritos',
    ],
    correctAnswer: 'Pizza',
  },
  {
    question: 'What is Marie’s favorite color?',
    answers: [
      'Blue',
      'Purple',
      'Yellow',
      'Pink',
    ],
    correctAnswer: 'Purple',
  },
  {
    question: 'Where is Gus Fring from?',
    answers: [
      'Chile',
      'Argentina',
      'Brazil',
      'Guatemala',
    ],
    correctAnswer: 'Chile',
  },
  {
    question: 'What drug does Jesse NOT use in the course of the series?',
    answers: [
      'Meth',
      'Heroin',
      'Weed',
      'LSD',
    ],
    correctAnswer: 'LSD',
  },
  {
    question: 'Jesse’s girlfriend Andrea has a son named?',
    answers: [
      'Brock',
      'Billy',
      'Brody',
      'Bobby',
    ],
    correctAnswer: 'Brock',
  },
  {
    question: 'Saul Goodman’s real name is…?',
    answers: [
      'Jimmy McCormick',
      'Jimmy McGill',
      'Jimmy McAvoy',
      'Jimmy McElroy',
    ],
    correctAnswer: 'Jimmy McGill',
  },
  {
    question: 'Who was originally supposed to die by the end of season one?',
    answers: [
      'Marie',
      'Skyler',
      'Jesse',
      'Hank',
    ],
    correctAnswer: 'Jesse',
  },
  {
    question: 'Which artist’s paintings do Jesse and Jane go see together?',
    answers: [
      'Vincent Van Gogh',
      'Claude Monet',
      'Frida Kahlo',
      `Georgia O'Keefe`,
    ],
    correctAnswer: `Georgia O'Keefe`,
  },
  {
    question: 'What was the name of the company Walter co-founded before becoming a high school teacher?',
    answers: [
      'Dark Matter Technologies',
      'Gray Matter Technologies',
      'Blue Matter Technologies',
      'Black Matter Technologies',
    ],
    correctAnswer: 'Gray Matter Technologies',
  },
  {
    question: `“They’re not rocks, Marie! They’re…”`,
    answers: [
      'Gems',
      'Stones',
      'Minerals',
      'Jewels',
    ],
    correctAnswer: 'Minerals',
  },
];

let questionNumber = 0;
let score = 0;
// a button should render the first question

function startQuiz() {
  $('.js-start-button').on('click', event => {
    $('#start-page').hide();
    renderQuestion();
    $('.question-number').text(questionNumber+1);
  });
}

function renderQuestion() {
  if (questionNumber < QUIZ.length) {
    $('#question-page').html(generateQuestion());
  }
  else renderFinalPage();
}

function generateQuestion() {
    return (`<h2>${QUIZ[questionNumber].question}</h2>
        <form>
          <fieldset role="radiogroup">
          <div class="radio">
            <label class="input" id="answer1">
              <input type="radio" value="${QUIZ[questionNumber].answers[0]}" aria-labelledby="answer1" required>
              <span class="checkmark">${QUIZ[questionNumber].answers[0]}</span>
            </label>
          </div>
          <div class="radio">
            <label class="input" id="answer2">
              <input type="radio" value="${QUIZ[questionNumber].answers[1]}" aria-labelledby="answer2" required>
              <span>${QUIZ[questionNumber].answers[1]}</span>
            </label>
          </div>
          <div class="radio">
            <label class="input" id="answer3">
              <input type="radio" value="${QUIZ[questionNumber].answers[2]}" aria-labelledby="answer3" required>
              <span>${QUIZ[questionNumber].answers[2]}</span>
            </label>
          </div>
          <div class="radio">
            <label class="input" id="answer4">
              <input type="radio" value="${QUIZ[questionNumber].answers[3]}" aria-labelledby="answer4" required>
              <span class="checkmark">${QUIZ[questionNumber].answers[3]}</span>
            </label>
          </div>
          <button type="submit" class="js-submit-answer">Submit</button>
          </fieldset>
        </form>`);
  }

function generateFeedback() {
  $('#question-page').on('submit', 'form', event => {
    event.preventDefault();
    let answer = $('input:checked').val();
    let correctAnswer = `${QUIZ[questionNumber].correctAnswer}`;
    if (answer === correctAnswer) {
      handleCorrectAnswer();
    }
    else {
      handleIncorrectAnswer();
    }
  })
}

function handleCorrectAnswer() {
  $('#question-page').hide();
  $('#feedback-page').show();
  $('#feedback-page').html(`<h2>That's right!</h2><button type="button" class="js-next-question">Next</button>`)
  increaseScore();
}

function handleIncorrectAnswer() {
  $('#question-page').hide();
  $('#feedback-page').show();
  $('#feedback-page').html(`<h2>You were wrong!</h2><h3>The correct answer is ${QUIZ[questionNumber].correctAnswer}.</h3><button type="button" class="js-next-question">Next</button>`);
}

function nextQuestion() {
  $("#feedback-page").on('click', '.js-next-question', event => {
    $('#feedback-page').hide();
    $('#question-page').show();
    increaseQuestionCount();
    renderQuestion();
  })
}

function increaseQuestionCount() {
  if (questionNumber < QUIZ.length) {
    questionNumber ++;
    $('.question-number').text(questionNumber+1);
  }
}

function increaseScore() {
  score ++;
  $('.score').text(score);
}

function renderFinalPage() {
  $('#question-page').hide();
  $('.question-number').text(10);
  if (score >= 7) {
    $('#final-page').html(`<h2>You did great!</h2><h3>You scored ${score}/10.</h3><h4>You're a true Breaking Bad fan.</h4><button type="button" class="js-reset">Restart Quiz</button>`)
  } else if (score >= 5) {
    $('#final-page').html(`<h2>Not bad...</h2><h3>You scored ${score}/10.</h3><h4>Binge watch the series a few more times, and you'll get there!</h4><button type="button" class="js-reset">Restart Quiz</button>`)
  } else {
    $('#final-page').html(`<h2>Yikes!</h2><h3>You scored ${score}/10.</h3><h4>Did you even watch the show?</h4><button type="button" class="js-reset">Restart Quiz</button>`)
  }
}

function resetQuiz() {
  $('#final-page').on('click', '.js-reset', event => {
    location.reload();
  })
}


function handleQuiz() {
  startQuiz();
  generateFeedback();
  nextQuestion();
  resetQuiz();
}

$(handleQuiz);