let userEmail = document.getElementById('email');
let userPassword = document.getElementById('password');
let loginBtn = document.getElementById('loginBtn');
let loginMsg = document.getElementById('loginMsg');


loginBtn.addEventListener('click' , function(){

    let usersList = JSON.parse(localStorage.getItem('usersList')) || [];

    let success = false;
    let loggedUser = null;

    if(userEmail.value == "" || userPassword.value == ""){
        showMessage('All inputs is required');
        return;
    }

    for(let i = 0 ; i < usersList.length ; i++){
        if(userEmail.value == usersList[i].email && userPassword.value == usersList[i].password){
            loggedUser = usersList[i];
            success = true;
            break;
        }
    }
    if(loggedUser){
        let helloMsg = `Welcome ${loggedUser.name}`;
        localStorage.setItem('helloMsg', helloMsg);
        window.location.href = 'home.html';
        clearForm();
    }
    else{
        showMessage('Incorrect email or password');
    }
});


function clearForm(){
    userEmail.value = "";
    userPassword.value = "";
}

function showMessage(message){
    loginMsg.classList.remove('d-none');
    loginMsg.innerHTML = message;

    setTimeout(function(){
    loginMsg.classList.add('d-none');
    loginMsg.innerHTML = '';
    clearForm();
    }, 2000);
}