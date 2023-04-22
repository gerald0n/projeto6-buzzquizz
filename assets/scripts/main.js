axios.defaults.headers.common['Authorization'] = 'r8QBwdoMYNQpMCpzrdjOpk7b'
const URL_QUIZZES = 'https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes'
const screen01 = document.querySelector('.screen01')

function random() {
    return Math.random() - 0.5;
}

function renderScreen01() {
    screen01.innerHTML = ''
    if (localStorage.length === 0)
        screen01.innerHTML += `<div class="create-quizz">
    <p>
        Você não criou nenhum <br />
        quizz ainda :(
    </p>
    <button class="btnCreateQuizz">Criar Quizz</button>
</div>`
    else
        screen01.innerHTML += `<div class="user-quizzes">
  <div class="add-quizz-hidden">
      <h2>Seus Quizzes</h2>
      <ion-icon name="add-circle-sharp"></ion-icon>
  </div>
  <div class="container-cards">
      <div class="card-quizz">
          <div id="shadow"></div>
          <img src="./assets/images/image01.png" alt="" />
          <span>O quão Potterhead é você?</span>
      </div>
  </div>
</div>`

    screen01.innerHTML += `<div class="all-quizzes">
<h2>Todos os Quizzes</h2>
<div class="container-cards">
</div>
</div>`

    axios.get(URL_QUIZZES).then(response => {
        response.data.forEach(quizz => {
            if (quizz.image !== 'https://pudim.com.br')
                screen01.innerHTML += `<div class="card-quizz">
    <div id="shadow"></div>
    <img src="${quizz.image}" alt="" />
    <span
        >${quizz.title}</span
    >
</div>`

            const btnCreateQuizz = document.querySelector('.btnCreateQuizz')
            if (btnCreateQuizz)
                btnCreateQuizz.addEventListener('click', () => {
                    screen01.classList.add('dp-none')
                    screen03_1.classList.remove('dp-none')
                })
        })
    })
}

renderScreen01();

// --------------------------------------------------- //
