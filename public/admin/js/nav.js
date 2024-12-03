const btn = document.getElementById('adminBtn');
const menu = document.querySelector(".desplegableUser");

btn.addEventListener('click', () => {
    menu.classList.toggle('active');
});
