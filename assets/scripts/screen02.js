const url = "https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/";
const timeToScroll = 100;
let quizData;
let hits = 0;
let indexQuestion = 0;

function quizScore(amountHits, amountQuestions) {
    return amountHits * 100 / amountQuestions;
}

function renderResult() {
    let score = quizScore(hits, quizData.questions.length);
    let level;

    quizData.levels.forEach( (lv) => {
        if (score >= lv.minValue) {
            level = lv;
        }
    });

    const containerResult = document.querySelector('.container-result');
    containerResult.classList.remove('hidden');
    containerResult.classList.add('shown-flex');

    containerResult.innerHTML = `
        <div class="header-result">
            <label>${Math.round(score)}% de acerto: ${level.title}</label>
        </div>
        <div class="result">
            <img src=${level.image} alt="" />
            <p>${level.text}</p>
        </div>
    `;

    containerResult.scrollIntoView(false);
}

function renderQuiz(quiz) {
    quizData = quiz.data;

    document.querySelector('.banner').innerHTML = `
        <div class="darkened-image"></div>
        <img src="${quizData.img}" alt="" />
        <div>
            <label>${quizData.title}</label>
        </div>
    `;
    // scroll to top
    scrollTo(0, 0);

    let i = 0;
    let template = '';
    quizData.questions.forEach( (question) => {
        template += `
            <div class="question q${i}">
                <div class="header-question" style="background-color: ${question.color}">
                    <label style>${question.title}</label>
                </div>
                <div class="content-answer">
        `;
        i++;

        // sorting randomly each answer of each question
        question.answers.sort(random);

        question.answers.forEach ( (answer) => {
            template += `
                    <button class="answer" onclick="setAnswer(this)">
                        <img src=${answer.image} alt="" />
                        <p>${answer.text}</p>
                    </button>
            `;
        });
        template += '</div>'; // fechando .content-answer
        template += '</div>'; // fechando .question
    });

    document.querySelector(".container-question").innerHTML = template;
}

function initScreen(quizId) {
    const promise = axios.get(url + quizId);
    hits = 0;
    indexQuestion = 0;

    promise.then(renderQuiz);
    promise.catch( (error) => {
        console.log(error);
        alert('Houve um erro inesperado. Tente novamente mais tarde!');
        window.location.reload();
    });
}

function setAnswer(selectedAnswer) {
    const allAnswers = document.querySelectorAll(`.q${indexQuestion} .answer`);
    
    allAnswers.forEach( (elementAnswer) => {
        if (elementAnswer !== selectedAnswer) {
            elementAnswer.classList.add('whited-image');
        }
        elementAnswer.disabled = true;

        quizData.questions[indexQuestion].answers.forEach( (objAnswer) => {
            if (elementAnswer.querySelector('p').innerHTML === objAnswer.text) {
                // setting collors red or green and hits
                if (objAnswer.isCorrectAnswer) {
                    elementAnswer.querySelector("p").classList.add('green-text');
                    if (objAnswer.text === selectedAnswer.querySelector("p").innerHTML) {
                        hits++;
                    }
                } else {
                    elementAnswer.querySelector("p").classList.add('red-text');
                }
            }
        });
    });

    indexQuestion++;
    setTimeout(() => {
        if (indexQuestion < quizData.questions.length) {
            document.querySelector(`.q${indexQuestion}`).scrollIntoView();
        } else {
            renderResult();
        }
    }, timeToScroll);
}

function restartQuiz() {
    window.location.reload();
    initScreen(quizData.id);
}

// calls of functions

initScreen('92');