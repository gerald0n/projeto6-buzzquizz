axios.defaults.headers.common['Authorization'] = 'r8QBwdoMYNQpMCpzrdjOpk7b'

//start screen 3.1

const inputQuizzTitle = document.querySelector('#quizzTitle')
const inputImageURL = document.querySelector('#quizzImage')
const inputAmountQuestions = document.querySelector('#amountQuestions')
const inputAmountLevels = document.querySelector('#amountLevels')
const btnProceedToQuestions = document.querySelector('#btnProceedToQuestions')

const screen03_1 = document.querySelector('.screen03-1')
const screen03_2 = document.querySelector('.screen03-2')
const screen03_3 = document.querySelector('.screen03-3')

const newQuizz = new Object()

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
            replaceScreen(screen03_1, screen03_2);
            renderScreen03_2(Number(inputAmountQuestions.value))
        } else
            alert(
                'Dados inseridos fora dos requisitos obrigatórios. Tente novamente!'
            )
    })

function checkURL(url) {
    try {
        let newURL = new URL(url)
        return true
    } catch (err) {
        return false
    }
}

//end screen 3.1

//start screen 3.2

function renderScreen03_2() {
    screen03_2.innerHTML = ''
    screen03_2.innerHTML += ` <div class="header-title">
    <h2>Crie suas perguntas</h2>
</div>`

    for (let index = 0; index < inputAmountQuestions.value; index++)
        screen03_2.innerHTML += `<div class="question-create-card" id="inputQuestion0${
            index + 1
        }">
    <div class="question wrapper">
        <div class="question-head">
            <span>Pergunta ${index + 1}</span>
            <ion-icon name="create-outline"></ion-icon>
        </div>
        <div class="question-info">
            <input
                type="text"
                placeholder="Texto da pergunta"
                class="inputQuestionText"
            />
            <input
                type="text"
                placeholder="Cor de fundo da pergunta"
                class="inputQuestionColor"
            />
        </div>
    </div>
    <div class="correct-answer wrapper">
        <span>Resposta correta</span>

        <input type="text" placeholder="Resposta correta" class="inputCorrectAnswer answerText" />
        <input type="text" placeholder="URL da imagem" class="inputCorrectImage answerImage"/>
    </div>
    <div class="incorrect-answers wrapper">
        <span>Respostas incorretas</span>
        <div class="wrapper">
            <input
                type="text"
                placeholder="Resposta incorreta 1"
                class="inputIncorrectAnswer answerText"
            />
            <input type="text" placeholder="URL da imagem 1" class="inputIncorrectImage answerImage"/>
        </div>
        <div class="wrapper">
            <input
                type="text"
                placeholder="Resposta incorreta 2"
                class="inputIncorrectAnswer answerText"
            />
            <input type="text" placeholder="URL da imagem 2" class="inputIncorrectImage answerImage"/>
        </div>
        <div class="wrapper">
            <input
                type="text"
                placeholder="Resposta incorreta 3"
                class="inputIncorrectAnswer answerText"
            />
            <input type="text" placeholder="URL da imagem 3" class="inputIncorrectImage answerImage"/>
        </div>
    </div>
</div>`

    screen03_2.innerHTML += `<button class="btnCreateQuestions">
    Prosseguir pra criar níveis
</button>
</div>`
    // -----------------------render------------------------- //
    const inputQuestionText = document.querySelectorAll('.inputQuestionText')
    const inputQuestionColor = document.querySelectorAll('.inputQuestionColor')
    const answerText = document.querySelectorAll('.answerText')
    const answerImage = document.querySelectorAll('.answerImage')
    const btnCreateQuestions = document.querySelector('.btnCreateQuestions')
    let questionHead = document.querySelectorAll('.question-head')

    if (questionHead)
        questionHead.forEach(clickedHead => {
            clickedHead.addEventListener('click', () => {
                clickedHead.parentNode.parentNode.classList.toggle('selected')
            })
        })

    if (btnCreateQuestions)
        btnCreateQuestions.addEventListener('click', () => {
            if (
                validacaoInputQuestionText() &&
                validacaoInputQuestionColor() &&
                validacaoInputTextAnswer() &&
                validacaoInputImageAnswer()
            )
                console.log('SUCESSO!')
            else alert('ERROR: requisitos não atendidos. Tente novamente!')
        })

    // console.log(validacoesInputScreen03_2(inputQuestionText) && validacoesInputScreen03_2(inputQuestionColor))

    function validacaoInputTextAnswer(count = 0) {
        // Textos das respostas: não pode estar vazio
        let arr = []
        for (let index = 0; index < inputAmountQuestions; index++) {
            arr.push(
                document.querySelectorAll(`#inputQuestion0${index + 1} .answerText`)
            )
        }

        arr.forEach(answer => {
            answer.forEach(item => {
                if (item.value.length > 0) count++
            })
        })

        if (count == answerText.length) return true
        else return false
    }

    function validacaoInputImageAnswer(count = 0) {
        // Textos das respostas: não pode estar vazio
        let arr = []
        for (let index = 0; index < inputAmountQuestions; index++) {
            arr.push(
                document.querySelectorAll(`#inputQuestion0${index + 1} .answerImage`)
            )
        }
        arr.forEach(answer => {
            answer.forEach(item => {
                if (checkURL(item.value)) count++
            })
        })

        if (count == answerImage.length) return true
        else return false
    }

    function validacaoInputQuestionColor(count = 0) {
        // Cor de fundo: deve ser uma cor em hexadecimal
        const hexadecimal = /^(#)([a-fA-F0-9]{6})$/

        inputQuestionColor.forEach(input => {
            if (hexadecimal.test(input.value)) count++
        })
        if (count == inputQuestionColor.length) return true
        else return false
    }

    function validacaoInputQuestionText(count = 0) {
        // Texto da pergunta: no mínimo 20 caracteres
        inputQuestionText.forEach(input => {
            if (input.value.length >= 20) count++
        })

        if (count == inputQuestionText.length) return true
        return false
    }
}

// renderScreen03_3()
// function renderScreen03_3() {
//     screen03_3.innerHTML = ''
//     screen03_3.innerHTML += `<div class="header-title">
//     <h2>Agora, decida os níveis!</h2>
// </div>`

//     for (let index = 0; index < 3; index++)
//         screen03_3.innerHTML += `<div class="levels-create-card" id="inputLevel0${index+1}">
//     <div class="levels wrapper">
//         <div class="level-head">
//             <span>Nivel ${index+1}</span>
//             <ion-icon name="create-outline"></ion-icon>
//         </div>
//         <input
//             type="text"
//             placeholder="Título do nível"
//             class="inputLevelTitle"
//         />
//         <input
//             type="text"
//             placeholder="% de acerto mínima"
//             class="inputLevelPercent"
//         />
//         <input
//             type="text"
//             placeholder="URL da imagem do nível"
//             class="inputLevelImage"
//         />
//         <textarea
//             placeholder="Descrição do nível"
//             class="inputLevelDescription"
//         ></textarea>
//     </div>
// </div>`

//     screen03_3.innerHTML += `<button id="btnCreateLevels">Prosseguir pra criar níveis</button>`

//     // -----------------------render------------------------- //

//     const levelHead = document.querySelectorAll('.level-head')
//     const inputLevelTitle = document.querySelectorAll('.inputLevelTitle')
//     const inputLevelPercent = document.querySelectorAll('.inputLevelPercent')
//     const inputLevelImage = document.querySelectorAll('.inputLevelImage')
//     const inputLevelDescription = document.querySelectorAll('.inputLevelDescription')
//     const btnCreateLevels = document.querySelector('#btnCreateLevels')

//     if (levelHead)
//         levelHead.forEach(clickedHead => {
//             clickedHead.addEventListener('click', () => {
//                 clickedHead.parentNode.parentNode.classList.toggle('selected')
//             })
//         })

//         if (btnCreateLevels)
//         btnCreateLevels.addEventListener('click', () => {
            
//         })

//     function validacaoLevelTitle() {
//         inputLevelTitle.forEach(input => {
//             if (input.value.length >= 10) count++
//         })

//         if (count == inputLevelTitle.length) return true
//         return false
//     }
//     }
//     function validacaoLevelPercent() {}
//     function validacaoLevelImage() {}
//     function validacaoLevelDescription() {}
// }

// //end screen 3.1
