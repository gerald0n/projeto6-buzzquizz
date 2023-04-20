const url = "https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/";

function quizScore(amountHits, amountQuestions) {
    return amountHits * 100 / amountQuestions;
}

function renderQuiz(quiz) {
    document.querySelector('.banner').innerHTML = `
        <div class="darkened-image"></div>
        <img src="${quiz.data.img}" alt="" />
        <div>
            <label>${quiz.data.title}</label>
        </div>
    `;

    let template = '';
    quiz.data.questions.forEach( (question) => {
        template += `
            <div class="question">
                <div class="header-question">
                    <label>${question.title}</label>
                </div>
                <div class="content-answer">
        `;

        // sorting randomly each answer of each question
        question.answers.sort(random);

        question.answers.forEach ( (answer) => {
            template += `
                    <div class="answer">
                        <img src=${answer.image} alt="" />
                        <label>${answer.text}</label>
                    </div>
            `;
        });
        template += '</div>'; // fechando .content-answer
        template += '</div>'; // fechando .question
    });

    document.querySelector(".container-question").innerHTML = template;
}

function initScreen(quizId) {
    const promise = axios.get(url + quizId);

    promise.then(renderQuiz);
    promise.catch( (error) => {
        console.log(error);
        alert('Houve um erro inesperado. Tente novamente mais tarde!');
        window.location.reload();
    });
}