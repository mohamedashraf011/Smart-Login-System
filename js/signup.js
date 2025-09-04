let userNameInput = document.getElementById('userName');
let userEmailInput = document.getElementById('userEmail');
let userPasswordInput = document.getElementById('userPassword');
let signUpBtn = document.getElementById('signUpBtn');
let msg = document.getElementById('Msg');
let nameMsg = document.getElementById('nameMsg');
let emailMsg = document.getElementById('emailMsg');
let passwordMsg = document.getElementById('passwordMsg');

signUpBtn.addEventListener('click', function(){

    let usersList = JSON.parse(localStorage.getItem('usersList')) || [];

    if(userNameInput.value == "" || userEmailInput.value == "" || userPasswordInput.value == ""){
        showMessage('All inputs are required', 'danger');
        return;
    }

    if(!validateName() || !validateEmail() || !validatePassword()){
        showMessage('please fix the errors before signing up' , 'danger');
        return;
    }

    let user = {
        name: userNameInput.value,
        email: userEmailInput.value,
        password: userPasswordInput.value
    }

    let userExist = false;

    for (let i = 0; i < usersList.length; i++) {
        if(userEmailInput.value == usersList[i].email){
            userExist = true;
            break;
        }
    }

    if(userExist){
        showMessage('User already exists', 'danger');
    }
    else{
        usersList.push(user);
        localStorage.setItem('usersList', JSON.stringify(usersList));
        showMessage('User registered successfully', 'success');
        clearForm();
    }
});

function clearForm(){
    userNameInput.value = "";
    userEmailInput.value = "";
    userPasswordInput.value = "";
    nameMsg.classList.add('d-none');
    emailMsg.classList.add('d-none');
    passwordMsg.classList.add('d-none');
}

function showMessage(text, type){
    msg.classList.remove('d-none', 'text-danger', 'text-success');
    msg.classList.add(`text-${type}`);
    msg.innerHTML = text;

    setTimeout(() => {
        msg.classList.add('d-none');
    }, 3000);
}

function validateName(){
    let regexName = /^[a-z ,.'-]+$/i;

    if(regexName.test(userNameInput.value)){
        userNameInput.classList.remove('is-invalid');
        userNameInput.classList.add('is-valid');
        nameMsg.classList.add('d-none');

        return true;
    }
    else{
        userNameInput.classList.remove('is-valid');
        userNameInput.classList.add('is-invalid');
        nameMsg.classList.remove('d-none');
        nameMsg.innerHTML = 'Name can only contain letters (A–Z or a–z), spaces, and characters';
        return false;
    }
}

function validateEmail(){
    let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(regexEmail.test(userEmailInput.value)){
        userEmailInput.classList.remove('is-invalid');
        userEmailInput.classList.add('is-valid');
        emailMsg.classList.add('d-none');
        return true;
    }
    else{
        userEmailInput.classList.remove('is-valid');
        userEmailInput.classList.add('is-invalid');
        emailMsg.classList.remove('d-none');
        emailMsg.innerHTML = 'Email must be in the format: example@domain.com';
        return false;
    }
}

function validatePassword(){
    let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/;

    if(regexPassword.test(userPasswordInput.value)){
        userPasswordInput.classList.remove('is-invalid');
        userPasswordInput.classList.add('is-valid');
        passwordMsg.classList.add('d-none');

        return true;
    }
    else{
        userPasswordInput.classList.remove('is-valid');
        userPasswordInput.classList.add('is-invalid');
        passwordMsg.classList.remove('d-none');
        passwordMsg.innerHTML = 'Password must be 8–15 characters, include at least 1 uppercase letter, 1 lowercase letter, and 1 number';
        return false;
    }
}
