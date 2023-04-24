axios.defaults.headers.common['Authorization'] = 'r8QBwdoMYNQpMCpzrdjOpk7b'
const URL_QUIZZES = 'https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes'
const screen01 = document.querySelector('.screen01')

const screen03_1 = document.querySelector('.screen03-1')
const screen03_2 = document.querySelector('.screen03-2')
const screen03_3 = document.querySelector('.screen03-3')
const screen03_4 = document.querySelector('.screen03-4')

const inputQuizzTitle = document.querySelector('#quizzTitle')
const inputImageURL = document.querySelector('#quizzImage')
const inputAmountQuestions = document.querySelector('#amountQuestions')
const inputAmountLevels = document.querySelector('#amountLevels')
const btnProceedToQuestions = document.querySelector('#btnProceedToQuestions')

const containerUserQuizzes = document.querySelector('.user-quizzes')
const containerCards = document.querySelector('.all-quizzes .container-cards')
const btnCreateQuizz = document.querySelector('.btnCreateQuizz')

const newQuizz = new Object()

function renderScreen01() {
    if (localStorage.length > 0) {
        replaceScreen(document.querySelector('.create-quizz'), document.querySelector('.user-quizzes'))

        for (let i = 0; i < localStorage.length; i++) {
            axios.get(`${URL_QUIZZES}/${localStorage.id}`).then(response => {
                containerUserQuizzes.innerHTML += `
                <div data-test="my-quiz" class="card-quizz" onclick="initScreen(${response.data.id})">
                <div id="shadow"></div>
                <img src="${response.data.image}" alt="" />
                <span
                    >${response.data.title}</span
                >
            </div>
            </div>`
            })   
        }

         axios.get(URL_QUIZZES).then(response => {
            response.data.forEach(quizz => {
                containerCards.innerHTML += `<div data-test="others-quiz" class="card-quizz">
                    <div class="card-quizz" onclick="initScreen(${quizz.id})">
        <div id="shadow"></div>
        <img src="${quizz.image}" alt="" />
        <span
            >${quizz.title}</span
        >
    </div>`
            })
        })
    } else {
        replaceScreen(document.querySelector('.user-quizzes'), document.querySelector('.create-quizz'))
        axios.get(URL_QUIZZES).then(response => {
            response.data.forEach(quizz => {
                containerCards.innerHTML += `<div data-test="others-quiz" class="card-quizz">
                    <div class="card-quizz" onclick="initScreen(${quizz.id})">
        <div id="shadow"></div>
        <img src="${quizz.image}" alt="" />
        <span
            >${quizz.title}</span
        >
    </div>`
            })
        })
    }

    if (btnCreateQuizz)
        btnCreateQuizz.addEventListener('click', () => {
            replaceScreen(screen01, screen03_1)
        })
}

renderScreen01()

function random() {
    return Math.random() - 0.5
}

function replaceScreen(scrToOff, scrToOn) {
    scrToOff.classList.add('dp-none')
    scrToOn.classList.remove('dp-none')
}

function backHome(currentScreenSelector) {
    window.location.reload()
    /*replaceScreen(document.querySelector(currentScreenSelector), screen01);*/
}

// --------------------------------------------------- //

//funções de validações

function validacaoInputTextAnswer(inputText, count = 0) {
    // Textos das respostas: não pode estar vazio
    inputText.forEach(item => {
        if (item.value.length > 0) count++
    })

    if (count == inputText.length) return true
    else return false
}

function validacaoInputImageAnswer(inputIncorrectImage, count = 0) {
    inputIncorrectImage.forEach(item => {
        if (checkURL(item.value)) count++
    })

    if (count == inputIncorrectImage.length) return true
    else return false
}

function validacaoInputQuestionColor(inputQuestionColor, count = 0) {
    // Cor de fundo: deve ser uma cor em hexadecimal
    const hexadecimal = /^(#)([a-fA-F0-9]{6})$/

    inputQuestionColor.forEach(input => {
        if (hexadecimal.test(input.value)) count++
    })
    if (count == inputQuestionColor.length) return true
    else return false
}

function validacaoInputQuestionText(inputQuestionText, count = 0) {
    // Texto da pergunta: no mínimo 20 caracteres
    inputQuestionText.forEach(input => {
        if (input.value.length >= 20) count++
    })

    if (count == inputQuestionText.length) return true
    return false
}

function validacaoLevelTitle(inputLevelTitle, count = 0) {
    inputLevelTitle.forEach(input => {
        if (input.value.length >= 10) count++
    })

    if (count == inputLevelTitle.length) return true
    return false
}

function validacaoLevelPercent(inputLevelPercent, count = 0) {
    inputLevelPercent.forEach(input => {
        if (input.value.length > 0 && input.value >= 0 && input.value <= 100)
            count++
    })

    if (count == inputLevelPercent.length) {
        if (!verificaIgualdade(inputLevelPercent)) {
            if (verificaZero(inputLevelPercent)) return true
            else {
                console.log('um nível precisa ser 0.')
                return false
            }
        } else {
            console.log('níveis com valores iguais. Corrija, por favor.')
            return false
        }
    } else {
        console.log('preencha os níveis!')
        return false
    }
}

function validacaoLevelDescription(inputLevelDescription, count = 0) {
    // Texto da pergunta: no mínimo 30 caracteres
    inputLevelDescription.forEach(input => {
        if (input.value.length >= 30) count++
    })

    if (count == inputLevelDescription.length) return true
    else {
        console.log('descrição precisa ter 30 ou mais caracteres!')
        return false
    }
}

function verificaIgualdade(inputLevelPercent) {
    const arrAux = []
    inputLevelPercent.forEach(input => {
        arrAux.push(input.value)
    })
    return new Set(arrAux).size !== arrAux.length
}

function verificaZero(inputLevelPercent) {
    const arrAux = []
    inputLevelPercent.forEach(input => {
        arrAux.push(input.value)
    })
    if (arrAux.includes('0')) return true
    else return false
}

function checkURL(url) {
    try {
        let newURL = new URL(url)
        return true
    } catch (err) {
        return false
    }
}

// inputQuestionText, inputQuestionColor, inputCorrectAnswer, inputCorrectImage, inputIncorrectAnswer, inputIncorrectImage
