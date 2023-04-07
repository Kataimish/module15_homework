let button = document.querySelector(".button"); // получение кнопки

let widthWindow = document.documentElement.clientWidth;
let heightWindow = document.documentElement.clientHeight;
// слушатель на кнопку
button.addEventListener("click", function () {
  alert(`размеры экрана: ширина ${widthWindow}px, высота ${heightWindow}px`);
});
