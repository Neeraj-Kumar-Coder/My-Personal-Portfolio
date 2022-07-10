let hamburger = document.querySelector(".nav-res");
let navigationBar = document.querySelector(".navbar-aside");

hamburger.addEventListener("click", () => {
    navigationBar.classList.toggle("visible");
});