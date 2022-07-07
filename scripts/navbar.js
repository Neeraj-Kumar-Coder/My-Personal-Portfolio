let navItems = document.getElementsByClassName("nav-item");
let root = document.querySelector(":root");

Array.from(navItems).forEach((element) => {
    element.addEventListener("mouseover", (event) => {
        let id = event.target.id;
        let idNumber = parseInt(id.charAt(id.length - 1));
        root.style.setProperty(`--nav-item-width-${idNumber}`, "100%");
        element.addEventListener("mouseout", () => {
            root.style.setProperty(`--nav-item-width-${idNumber}`, "0%");
        });
    });
});