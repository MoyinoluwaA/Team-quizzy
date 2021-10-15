const emailInput = document.querySelector('.input-email')
const passwordInput = document.querySelector('.input-pwd')
const errorEmail = document.querySelector('.error-email')
const errorPassword = document.querySelector('.error-pwd')
const loginSuccess = document.querySelector('.success-text')
const loginFail = document.querySelector('.fail-text')
const loginBtn = document.querySelector('.login-btn')


const validateForm = () => {
    validateEmail()
    validatePassword()
}

// Confirm email
const validateEmail = () => {
    let email = emailInput.value
    if (email.includes('@') === false) {
        errorEmail.textContent = 'Not a valid email!'
        emailInput.classList.add('invalid');
    } else if (email.includes('reqres.in') === false) {
        errorEmail.textContent = 'Please include gmail.com'
        emailInput.classList.add('invalid')
    }
}

emailInput.onfocus = function() {
    if (this.classList.contains('invalid')) {
        emailInput.classList.remove('invalid')
        errorEmail.textContent = ''
    }
}

// Confirm password
const validatePassword = () => {
    let pwd = passwordInput.value
    if (pwd === '') {
        errorPassword.textContent = 'Input a valid password'
        passwordInput.classList.add('invalid')
    } else if (pwd.length < 6) {
        errorPassword.textContent = 'Password must be greater than 6 characters'
        passwordInput.classList.add('invalid')
    } else if ((pwd.search(/[a-zA-Z]+/)==-1) || (pwd.search(/[0-9]+/)==-1)) {
        errorPassword.textContent = 'Invalid password'
        passwordInput.classList.add('invalid')
    }
}

passwordInput.onfocus = function() {
    if (this.classList.contains('invalid')) {
        passwordInput.classList.remove('invalid')
        errorPassword.textContent = ''
    }
}

// Login Button
loginBtn.addEventListener('click', (e)=> {
    e.preventDefault();

    // the api to post to
    const url = "https://reqres.in/api/login";

    fetch(url,{
        method : "POST",
        headers : {
            Accept:"application/json,text/plain",
            "Content-Type":"application/json",
        },
        body : JSON.stringify({
            email: emailInput.value,
            password: passwordInput.value
        })
    })
    .then(response => response.json())
    .then(result =>{
       
        if (result.error) {
            loginFail.textContent = result.error
            return validateForm()
        }

        emailInput.value = ''
        passwordInput.value = ''

        // store to local storage
        localStorage.setItem('Quizzy Login Token', JSON.stringify(result.token))
        
        location.href = '/landingPage.html'
        loginSuccess.textContent = "Login Successfully"
        
    } ).catch((e) => console.log(e))

})