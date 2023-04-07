let button = document.querySelector(".btn-svg");
let whiteSvg = document.querySelector(".white");
let blackSvg = document.querySelector(".black");
button.addEventListener("click", function () {
  if (whiteSvg.classList.contains("white")) {
    colorChangeBlack(whiteSvg);
    colorChangeWhite(blackSvg);
  } else {
    colorChangeWhite(whiteSvg);
    colorChangeBlack(blackSvg);
  }
});
function colorChangeWhite(e) {
  e.classList.add("white");
  e.classList.remove("black");
}
function colorChangeBlack(e) {
  e.classList.add("black");
  e.classList.remove("white");
}
