import { dataArray } from "./data.js";

const quizQuestion = document.querySelector('.quiz-question')
const quizOptions = document.querySelector('.quiz-options')
const questionNumbers = document.querySelector('.question-numbers')
const prevBtn = document.querySelector('.prev-btn')
const nextBtn = document.querySelector('.next-btn')

let currentQuestion = dataArray[0];

const displayQuestion = () => {
    quizQuestion.innerHTML = currentQuestion.question
    let displayOption = ''
    // looping through the answer object of data.js
    for(let option in currentQuestion.answers) {
        displayOption += `<li class="d-flex align-items-center" style="cursor: pointer;">
        <p class="option-wrapper text-uppercase bg_gay rounded-circle">${option}</p>
        <p class="answer-wrapper m-2">${currentQuestion.answers[option]}</p>
        </li>`
    }
    quizOptions.innerHTML = displayOption
}

displayQuestion()

const changeQuestion = (e) => {
    // closest a-tag to click
    const number = e.target.closest('a').innerHTML
    currentQuestion = dataArray[number -1]
    displayQuestion()
}


const changeToPrev = () => {
    let currentIndex = dataArray.indexOf(currentQuestion)
    if (currentIndex <= 0) return
    currentQuestion = dataArray[currentIndex-1]
    displayQuestion()
}

const changeToNext = () => {
    let currentIndex = dataArray.indexOf(currentQuestion)
    if (currentIndex === 9) return;
    currentQuestion = dataArray[currentIndex + 1]
    displayQuestion()
}

const selectAnswer = (e) => {
    const options = document.querySelectorAll('.option-wrapper')
    const answers = document.querySelectorAll('.answer-wrapper');
    const selectedAnswer = e.target.closest('li')
    options.forEach((option) => {
        option.classList.remove('selected-round');
    })
    answers.forEach((answer) => {
        answer.classList.remove('selected-text');
    })
    selectedAnswer.children[0].classList.add('selected-round')
    selectedAnswer.children[1].classList.add('selected-text')
}

// to prev question
prevBtn.addEventListener('click', changeToPrev)

// to next question
nextBtn.addEventListener('click', changeToNext)

// to question numbers
questionNumbers.addEventListener('click', changeQuestion)

// options
quizOptions.addEventListener('click', selectAnswer)