let alphabets = document.getElementsByClassName("popper");
Array.from(alphabets).forEach((element) => {
    element.addEventListener("mouseenter", () => {
        element.classList.add("animateRubberBand");
        setTimeout(() => {
            element.classList.remove("animateRubberBand");
        }, 1000);
    });
});