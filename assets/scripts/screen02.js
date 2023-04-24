const timeToScroll = 100;
let quizData;
let hits = 0;
let questionsAnswered = 0;

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
    containerResult.classList.remove('dp-none');
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

    containerResult.scrollIntoView();
    scrollBy(0, -60);
}

function renderQuiz(quiz) {
    quizData = quiz.data;

    replaceScreen(document.querySelector('.screen01'), document.querySelector('.screen02'));

    document.querySelector('.banner').innerHTML = `
        <div class="darkened-image"></div>
        <img src=${quizData.image} alt="" />
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
    const promise = axios.get(URL_QUIZZES + '/' + quizId);
    hits = 0;
    questionsAnswered = 0;

    promise.then(renderQuiz);
    promise.catch( (error) => {
        console.log(error);
        alert('Houve um erro inesperado. Tente novamente mais tarde!');
        window.location.reload();
    });
}

function scrollToUnansweredQuestion() {
    for (let i = 0; i < quizData.questions.length; i++) {
        if (!document.querySelector(`.q${i} .answer`).disabled) {
            document.querySelector(`.q${i}`).scrollIntoView();
            return;
        }
    }
}

function setAnswer(selectedAnswer) {
    const questionId = selectedAnswer.parentNode.parentNode.classList.item(1);
    const allAnswers = document.querySelectorAll(`.${questionId} .answer`);
    const numberQuestionId = parseInt(questionId.slice(1));

    allAnswers.forEach( (elementAnswer) => {
        if (elementAnswer !== selectedAnswer) {
            elementAnswer.classList.add('whited-image');
        }
        elementAnswer.disabled = true;

        quizData.questions[numberQuestionId].answers.forEach( (objAnswer) => {
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

    questionsAnswered++;
    setTimeout(() => {
        if (questionsAnswered < quizData.questions.length) {
            try {
                document.querySelector(`.q${numberQuestionId + 1}`).scrollIntoView();
            } catch {
                scrollToUnansweredQuestion();
            } finally {
                scrollBy(0, -70);
            }
        } else {
            renderResult();
        }
    }, timeToScroll);
}

function restartQuiz() {
    const containerResult = document.querySelector('.container-result');
    containerResult.classList.add('dp-none');
    containerResult.classList.remove('shown-flex');
    
    initScreen(quizData.id);
}