import { dataArray } from "./data.js";

const quizQuestion = document.querySelector('.quiz-question')
const quizOptions = document.querySelector('.quiz-options')
const questionNumbers = document.querySelector('.question-numbers')
const prevBtn = document.querySelector('.prev-btn')
const nextBtn = document.querySelector('.next-btn')
const submitBtn = document.querySelector('.submit-btn')
const modaldBtn = document.querySelector('.md-btn')
const goBack = document.querySelector('.go-back')

let currentQuestion = dataArray[0];
let currentState = {}
let currentIndex = dataArray.indexOf(currentQuestion);

const displayQuestion = () => {
    currentIndex = dataArray.indexOf(currentQuestion);
    quizQuestion.innerHTML = currentQuestion.question
    let displayOption = ''
    // console.log(currentIndex)
    // looping through the answer object of data.js
    for(let option in currentQuestion.answers) {
        displayOption += `<li class="d-flex align-items-center" style="cursor: pointer;">
        <p class="option-wrapper text-uppercase bg_gay rounded-circle ${currentState[currentIndex] == option && 'selected-round'} ">${option}</p>
        <p class="answer-wrapper m-2 ${currentState[currentIndex] == option && 'selected-text'}">${currentQuestion.answers[option]}</p>
        </li>`
    }
    quizOptions.innerHTML = displayOption
}

displayQuestion()

const changeQuestion = (e) => {
    // closest a-tag to click
    const number = e.target.closest('a').innerHTML
    console.log(number)
    currentQuestion = dataArray[number -1]
    displayQuestion()
}


const changeToPrev = () => {
    currentIndex = dataArray.indexOf(currentQuestion)
    if (currentIndex <= 0) return
    currentQuestion = dataArray[currentIndex-1]
    displayQuestion()
}

const changeToNext = () => {
    currentIndex = dataArray.indexOf(currentQuestion)
    if (currentIndex === 9) return;
    currentQuestion = dataArray[currentIndex + 1]
    displayQuestion()
}

const selectAnswer = (e) => {
    const options = document.querySelectorAll('.option-wrapper')
    const answers = document.querySelectorAll('.answer-wrapper');
    const selectedAnswer = e.target.closest('li')
    currentState[currentIndex] = selectedAnswer.firstElementChild.textContent

    options.forEach((option) => {
        option.classList.remove('selected-round');
    })
    answers.forEach((answer) => {
        answer.classList.remove('selected-text');
    })
    selectedAnswer.children[0].classList.add('selected-round')
    selectedAnswer.children[1].classList.add('selected-text')
}

const handleSubmit = () => {
    const modalBody = document.querySelector('.modal-body')
    let result = []
    for(let data of dataArray){
        if(data.correctAnswer == currentState[dataArray.indexOf(data)]){
            result.push(dataArray.indexOf(data))
        }
    }
    console.log(result)
    modalBody.innerHTML = `
    <p>Your result is here, see you perfromance.</p>
    <p>Score: ${result.length}</p>
    <p>Number of Question: ${dataArray.length}</p>
    `
}

// to prev question
prevBtn.addEventListener('click', changeToPrev)

// to next question
nextBtn.addEventListener('click', changeToNext)

// to question numbers
questionNumbers.addEventListener('click', changeQuestion)

// options
quizOptions.addEventListener('click', selectAnswer)

// submit button
submitBtn.addEventListener('click', handleSubmit)

// modal button sends user back home
modaldBtn.onclick = () => {
    location.href = '/landingPage.html';
}

// Go back
goBack.onclick = () => {
    alert('Do you want to quit')
    location.href = '/landingPage.html'
}