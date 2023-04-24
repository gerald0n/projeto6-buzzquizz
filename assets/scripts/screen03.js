//start screen 3.1

onkeyup = () => {
    if (
        inputQuizzTitle.value.length > 0 &&
        inputImageURL.value.length > 0 &&
        inputAmountQuestions.value.length > 0 &&
        inputAmountLevels.value.length > 0
    )
        btnProceedToQuestions.disabled = false
    else btnProceedToQuestions.disabled = true
}

if (btnProceedToQuestions)
    btnProceedToQuestions.addEventListener('click', () => {

        if (
            inputQuizzTitle.value.length >= 20 &&
            inputQuizzTitle.value.length <= 65 &&
            checkURL(inputImageURL.value) &&
            inputAmountQuestions.value >= 3 &&
            inputAmountLevels.value >= 2
        ) {
            // screen03_1.classList.add('dp-none')
            // screen03_2.classList.remove('dp-none')
            // renderScreen03_2()
            replaceScreen(screen03_1, screen03_2);
            renderScreen03_2(Number(inputAmountQuestions.value))
        } else
            alert(
                'Dados inseridos fora dos requisitos obrigatórios. Tente novamente!'
            )
    })

//end screen 3.1

//start screen 3.2
renderScreen03_2()
function renderScreen03_2() {
    screen03_2.innerHTML = ''
    screen03_2.innerHTML += ` <div class="header-title">
    <h2>Crie suas perguntas</h2>
</div>`

    for (let index = 0; index < inputAmountQuestions.value; index++)
    
        screen03_2.innerHTML += 
        
        `<div data-test="question-ctn" class="question-create-card inputQuestion0${
            index + 1
        } selected">
    <div class="question wrapper">
        <div class="question-head">
            <span>Pergunta ${index + 1}</span>
            <ion-icon name="create-outline" data-test="toggle"></ion-icon>
        </div>
        <div class="question-info">
            <input
                type="text" data-test="question-input"
                placeholder="Texto da pergunta"
                class="inputQuestionText"
            />
            <input data-test="question-color-input"
                type="text"
                placeholder="Cor de fundo da pergunta"
                class="inputQuestionColor"
            />
        </div>
    </div>
    <div class="correct-answer wrapper">
        <span>Resposta correta</span>

        <input type="text" placeholder="Resposta correta" data-test="correct-answer-input" class="inputCorrectAnswer" />
        <input type="text" placeholder="URL da imagem" data-test="correct-img-input" class="inputCorrectImage"/>
    </div>
    <div class="incorrect-answers wrapper">
        <span>Respostas incorretas</span>
        <div class="wrapper">
            <input
                type="text" data-test="wrong-answer-input"
                placeholder="Resposta incorreta 1"
                class="inputIncorrectAnswer"
            />
            <input type="text" placeholder="URL da imagem 1" data-test="wrong-img-input" class="inputIncorrectImage"/>
        </div>
        <div class="wrapper">
            <input
                type="text" data-test="wrong-answer-input"
                placeholder="Resposta incorreta 2"
                class="inputIncorrectAnswer"
            />
            <input type="text" placeholder="URL da imagem 2" data-test="wrong-img-input" class="inputIncorrectImage"/>
        </div>
        <div class="wrapper">
            <input
                type="text" data-test="wrong-answer-input"
                placeholder="Resposta incorreta 3"
                class="inputIncorrectAnswer"
            />
            <input type="text" placeholder="URL da imagem 3" data-test="wrong-img-input" class="inputIncorrectImage"/>
        </div>
    </div>
</div>`

        
        

    screen03_2.innerHTML += `<button data-test="go-create-levels" class="btnCreateQuestions">
    Prosseguir pra criar níveis
</button>
</div>`


    // -----------------------render------------------------- //

    const btnCreateQuestions = document.querySelector('.btnCreateQuestions')
    let questionHead = document.querySelectorAll('.question-head ion-icon')
    if (questionHead)
        questionHead.forEach(clickedHead => {
            clickedHead.addEventListener('click', () => {
                clickedHead.parentNode.parentNode.parentNode.classList.toggle('selected')
            })
        })

    if (btnCreateQuestions)
        btnCreateQuestions.addEventListener('click', () => {
            if (
                validacaoInputQuestionText(
                    document.querySelectorAll('.inputQuestionText')
                ) &&
                validacaoInputQuestionColor(
                    document.querySelectorAll('.inputQuestionColor')
                ) &&
                validacaoInputTextAnswer(
                    document.querySelectorAll(`.inputIncorrectAnswer`)
                ) &&
                validacaoInputImageAnswer(
                    document.querySelectorAll('.inputIncorrectImage')
                ) &&
                validacaoInputTextAnswer(
                    document.querySelectorAll('.inputCorrectAnswer')
                ) &&
                validacaoInputImageAnswer(
                    document.querySelectorAll('.inputCorrectImage')
                )
            ) {
                screen03_2.classList.add('dp-none')
                screen03_3.classList.remove('dp-none')
                renderScreen03_3()
            } else alert('ERROR: requisitos não atendidos. Tente novamente!')
        })
}

//end screen 3.2

//start screen 3.3
renderScreen03_3()

function renderScreen03_3() {
    screen03_3.innerHTML = ''
    screen03_3.innerHTML += `<div class="header-title">
    <h2>Agora, decida os níveis!</h2>
</div>`

    // for (let index = 0; index < inputAmountLevels.value; index++)
    for (let index = 0; index < 2; index++)
         
    screen03_3.innerHTML += `<div data-test="level-ctn" class="levels-create-card inputLevel0${
            index + 1
        } selected">
    <div class="levels wrapper">
        <div class="level-head">
            <span>Nivel ${index + 1}</span>
            <ion-icon name="create-outline" data-test="toggle"></ion-icon>
        </div>
        <input
            type="text" data-test="level-input"
            placeholder="Título do nível"
            class="inputLevelTitle"
        />
        <input
            type="text" data-test="level-percent-input"
            placeholder="% de acerto mínima"
            class="inputLevelPercent"
        />
        <input
            type="text" data-test="level-img-input"
            placeholder="URL da imagem do nível"
            class="inputLevelImage"
        />
        <textarea data-test="level-description-input"
            placeholder="Descrição do nível"
            class="inputLevelDescription"
        ></textarea>
    </div>
</div>`


    screen03_3.innerHTML += `<button data-test="finish" id="btnCreateQuizz">Finalizar Quizz</button>`


    // -----------------------render------------------------- //

    const levelHead = document.querySelectorAll('.level-head ion-icon')
    const btnCreateQuizz = document.querySelector('#btnCreateQuizz')

    if (levelHead)
        levelHead.forEach(clickedHead => {
            clickedHead.addEventListener('click', () => {
                clickedHead.parentNode.parentNode.parentNode.classList.toggle('selected')
            })
        })

    if (btnCreateQuizz)
        btnCreateQuizz.addEventListener('click', () => {
            if (
                validacaoLevelTitle(
                    document.querySelectorAll('.inputLevelTitle')
                ) &&
                validacaoInputImageAnswer(
                    document.querySelectorAll('.inputLevelImage')
                ) &&
                validacaoLevelPercent(
                    document.querySelectorAll('.inputLevelPercent')
                ) &&
                validacaoLevelDescription(
                    document.querySelectorAll('.inputLevelDescription')
                )
            ) {
                createNewQuizz()
                screen03_3.classList.add('dp-none')
                screen03_4.classList.remove('dp-none')
                renderScreen03_4()
            } else {
                alert('ERROR: requisitos não atendidos. Tente novamente!')
            }
        })
}

//end screen 3.3

// start screen 3.4
renderScreen03_4()
function renderScreen03_4() {
    screen03_4.innerHTML = ''
    screen03_4.innerHTML += `
    <div class="header-title">
                    <h2>Seu quizz está pronto!</h2>
                </div>
                <div class="card-quizz" 
                onclick="initScreen(${localStorage.id})"
                data-test="success-banner">
                    <div id="shadow"></div>
                    <img src="${newQuizz.image}" alt="" />
                    <span
                        >${newQuizz.title}</span
                    >
                </div>
                <button data-test="go-quiz" id="btnAcessQuizz" onclick="initScreen(${localStorage.id})">Acessar Quizz</button>
                <a data-test="go-home" id="backHome">Voltar pra home</a>
            </div>`
}

const btnBackHome = document.querySelector('#backHome')
if (btnBackHome) btnBackHome.addEventListener('click', backHome)

// end screen 3.4

function createNewQuizz() {
    const listQuestions = []
    const arrQuestions = [] // [{title, color, answers}, {title, color, answers}]
    let arrAnswers = [] // [{respostaCorreta}, {respostaIncorreta}, {respostaIncorreta}, ...]

    for (let i = 0; i < inputAmountQuestions.value; i++)
        listQuestions[i] = document.querySelectorAll(`.inputQuestion0${i + 1}`)

    listQuestions.forEach(questions => {
        questions.forEach(question => {
            const inputQuestionText =
                question.querySelector('.inputQuestionText')
            const inputQuestionColor = question.querySelector(
                '.inputQuestionColor'
            )
            const correctAnswer = question.querySelector(`.correct-answer`)
            const incorrectsAnswers =
                question.querySelectorAll(`.incorrect-answers`)

            arrAnswers.push({
                text: correctAnswer.querySelector('.inputCorrectAnswer').value,
                image: correctAnswer.querySelector('.inputCorrectImage').value,
                isCorrectAnswer: true
            })
            incorrectsAnswers.forEach(incorrectAnswer => {
                for (let i = 0; i < 3; i++) {
                    arrAnswers.push({
                        text: incorrectAnswer.querySelectorAll(
                            '.inputIncorrectAnswer'
                        )[i].value,
                        image: incorrectAnswer.querySelectorAll(
                            '.inputIncorrectImage'
                        )[i].value,
                        isCorrectAnswer: false
                    })
                }
                arrQuestions.push({
                    title: inputQuestionText.value,
                    color: inputQuestionColor.value,
                    answers: arrAnswers
                })
                arrAnswers = []
            })
        })
    })

    const inputLevelTitle = document.querySelectorAll('.inputLevelTitle')
    const inputLevelPercent = document.querySelectorAll('.inputLevelPercent')
    const inputLevelImage = document.querySelectorAll('.inputLevelImage')
    const inputLevelDescription = document.querySelectorAll(
        '.inputLevelDescription'
    )

    const levels = []

    for (let i = 0; i < 2; i++) {
        levels.push({
            title: inputLevelTitle[i].value,
            image: inputLevelImage[i].value,
            text: inputLevelDescription[i].value,
            minValue: inputLevelPercent[i].value
        })
    }

    newQuizz.title = inputQuizzTitle.value
    newQuizz.image = inputImageURL.value
    newQuizz.questions = arrQuestions
    newQuizz.levels = levels

    axios.post(URL_QUIZZES, newQuizz).then(response => {
        console.log(response.data)
        localStorage.setItem('id', response.data.id)
    }).catch(error => console.log(error.data))
}
