let welcomeMsg = document.getElementById('welcomeMsg');
let logoutBtn = document.getElementById('logoutBtn');

welcomeMsg.innerHTML = localStorage.getItem('helloMsg');


logoutBtn.addEventListener('click', function(){
    localStorage.removeItem('helloMsg');
    window.location.href = 'index.html';
});