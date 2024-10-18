const mainL = document.querySelector('#mainLogin');
const asideLogin = document.getElementById('login');
const asideRegister = document.getElementById('register');
const sectionLogin = document.getElementById('iniciarSesion');
const sectionRegister = document.getElementById('registrarSesion');

const buttonRegis = document.getElementById('btnRegis');
const buttonLogin = document.getElementById('btnLogin');

buttonRegis.addEventListener("click", function() {
    asideLogin.classList.remove("active");
    sectionLogin.classList.remove("active");
    asideRegister.classList.add("active");
    sectionRegister.classList.add("active");
    mainL.classList.remove("inicioA"); 
    mainL.classList.add("registroA"); 
});
buttonLogin.addEventListener("click", function() {
    mainL.classList.remove("registroA"); 
    mainL.classList.add("inicioA"); 
    asideRegister.classList.remove("active");
    sectionRegister.classList.remove("active");
    asideLogin.classList.add("active");
    sectionLogin.classList.add("active");
});
