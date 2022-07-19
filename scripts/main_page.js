// Custom cursor
let cursor = document.getElementById("cursor");
window.addEventListener("mousemove", (event) => {
    cursor.style.top = event.clientY + "px";
    cursor.style.left = event.clientX + "px";
});

window.addEventListener("click", () => {
    cursor.classList.add("click");
    setTimeout(() => {
        cursor.classList.remove("click");
    }, 500);
});

// Utility Functions
function fireWorks() {
    let canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let ctx = canvas.getContext('2d');

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    let mouse = {
        x: undefined,
        y: undefined
    };

    let particles = [];
    window.addEventListener("click", (event) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
        let particleCount = 100;
        let angleIncrement = (2 * Math.PI) / particleCount;
        let power = 10;
        let radius = 5;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(mouse.x, mouse.y, radius, "red", {
                x: Math.cos(angleIncrement * i) * Math.random() * power,
                y: Math.sin(angleIncrement * i) * Math.random() * power
            }));
        }
        init();
    });


    const gravity = 0.05;
    const friction = 0.99;

    class Particle {
        constructor(x, y, radius, color, velocity) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.radius = radius;
            this.velocity = velocity;
            this.alpha = 1;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }

        update() {
            this.velocity.x *= friction;
            this.velocity.y *= friction;
            this.velocity.y += gravity;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.alpha -= 0.005;
            this.draw();
        }
    };

    function init() {
        particles.forEach((particle) => {
            particle.draw();
        });
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.fillStyle = '#1d1d1d0f';
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        particles.forEach((particle, index) => {
            if (particle.alpha >= 0.005)
                particle.update();
            else
                particles.splice(index, 1);
        });
    }
    animate();
}

function mouseTrail() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    window.addEventListener("mouseout", () => {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    let spots = [];
    let hue = 0;

    let mouse = {
        x: undefined,
        y: undefined
    };

    window.addEventListener("mousemove", (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
        for (let i = 0; i < 3; i++)
            spots.push(new Particle());
    });

    class Particle {
        constructor() {
            this.x = mouse.x;
            this.y = mouse.y;
            this.size = Math.random() * 2 + 0.1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = "hsl(" + hue + ", 100%, 50%)";
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.size > 0.1)
                this.size -= 0.01;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    function handleParticle() {
        for (let i = 0; i < spots.length; i++) {
            spots[i].update();
            spots[i].draw();
            for (let j = i; j < spots.length; j++) {
                const dx = spots[i].x - spots[j].x;
                const dy = spots[i].y - spots[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 90) {
                    ctx.beginPath();
                    ctx.strokeStyle = spots[i].color;
                    ctx.lineWidth = spots[i].size / 10;
                    ctx.moveTo(spots[i].x, spots[i].y);
                    ctx.lineTo(spots[j].x, spots[j].y);
                    ctx.stroke();
                }
            }

            if (spots[i].size <= 0.3) {
                spots.splice(i, 1);
                i--;
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleParticle();
        hue = (hue + 1) % 361;
        requestAnimationFrame(animate);
    }

    animate();
}

// Effects Array
let effects = [mouseTrail, fireWorks];

// Onload
window.onload = () => {
    navBarHighlighter();
};

// Managing navbar section highlighting
let mainpage = document.querySelector(".title");
let about = document.querySelector("#about");
let skills = document.querySelector("#skills");
let contact = document.querySelector("#contact");
root = document.querySelector(":root");

let items = [mainpage, about, skills, contact];
function navBarHighlighter() {
    items.forEach((element, index) => {
        let windowHeight = window.innerHeight;
        let revealTop = element.getBoundingClientRect().top;
        let revealBottom = element.getBoundingClientRect().bottom;
        if (revealTop <= windowHeight / 2 && revealBottom >= windowHeight / 2) {
            document.getElementById(`nav-item-${index + 1}`).classList.add("active-nav-item");
            root.style.setProperty(`--nav-item-width-${index + 1}`, "100%");
        }
        else {
            document.getElementById(`nav-item-${index + 1}`).classList.remove("active-nav-item");
            root.style.setProperty(`--nav-item-width-${index + 1}`, "0%");
        }
    });
}

// Alphabets rubberband effect handler
let alphabets = document.getElementsByClassName("title-head");
let timeout = 100;

Array.from(alphabets).forEach((element) => {
    setTimeout(() => {
        element.style.transform = "scale(1)";
    }, timeout += 50);

    element.addEventListener("mouseenter", () => {
        element.classList.add("animateRubberBand");
        setTimeout(() => {
            element.classList.remove("animateRubberBand");
        }, 1000);
    });
});

// Know more button background on hover handler
let btns = document.querySelectorAll('.btn');
Array.from(btns).forEach((element) => {
    element.addEventListener("mouseover", (event) => {
        root.style.setProperty("--btn-overlay-width", "150%");
        event.target.addEventListener("mouseout", () => {
            root.style.setProperty("--btn-overlay-width", "0%");
        });
    });
});

// Random interactive effects
let numberOfEffects = 2;
let index = Math.round(Math.random() * 1000) % numberOfEffects;
effects[index].call();


// Skills Chart
function meterFiller() {
    let meters = document.getElementsByClassName("meter");
    let value = 95;
    let decrementer = 10;

    Array.from(meters).forEach((element) => {
        if (element.style.width == "0%") {
            element.style.width = `${value}%`;
            value -= decrementer;
            decrementer += 3;
        }
    });
}

// Reveal on scroll
window.addEventListener("scroll", scrollHandler);
let elements = document.getElementsByClassName("reveal");
let aboutAlphabets = document.getElementsByClassName("about-head");
let skillsAlphabets = document.getElementsByClassName("skills-head");
let skillsChart = document.getElementById("skills-chart");
let contactAplhabets = document.getElementsByClassName("contact-head");
let formItems = document.getElementsByClassName("form-item");

function scrollHandler() {
    navBarHighlighter();
    let windowHeight = window.innerHeight;
    let revealTop = skillsChart.getBoundingClientRect().top;
    let revealPoint = windowHeight / 2;
    if (revealTop < windowHeight - revealPoint)
        meterFiller();

    timeout = 100;
    Array.from(aboutAlphabets).forEach((element) => {
        let windowHeight = window.innerHeight;
        let revealTop = element.getBoundingClientRect().top;
        let revealPoint = 100;
        if (revealTop < windowHeight - revealPoint) {
            setTimeout(() => {
                element.style.transform = "scale(1)";
            }, timeout += 50);
        }
        element.addEventListener("mouseenter", () => {
            element.classList.add("animateRubberBand");
            setTimeout(() => {
                element.classList.remove("animateRubberBand");
            }, 1000);
        });
    });

    timeout = 100;
    Array.from(skillsAlphabets).forEach((element) => {
        let windowHeight = window.innerHeight;
        let revealTop = element.getBoundingClientRect().top;
        let revealPoint = 100;
        if (revealTop < windowHeight - revealPoint) {
            setTimeout(() => {
                element.style.transform = "scale(1)";
            }, timeout += 50);
        }
        element.addEventListener("mouseenter", () => {
            element.classList.add("animateRubberBand");
            setTimeout(() => {
                element.classList.remove("animateRubberBand");
            }, 1000);
        });
    });

    timeout = 100;
    Array.from(contactAplhabets).forEach((element) => {
        let windowHeight = window.innerHeight;
        let revealTop = element.getBoundingClientRect().top;
        let revealPoint = 100;
        if (revealTop < windowHeight - revealPoint) {
            setTimeout(() => {
                element.style.transform = "scale(1)";
            }, timeout += 50);
        }
        element.addEventListener("mouseenter", () => {
            element.classList.add("animateRubberBand");
            setTimeout(() => {
                element.classList.remove("animateRubberBand");
            }, 1000);
        });
    });

    Array.from(elements).forEach((element) => {
        let windowHeight = window.innerHeight;
        let revealTop = element.getBoundingClientRect().top;
        let revealPoint = 100;

        if (revealTop < windowHeight - revealPoint) {
            element.classList.add("active");
        }
    });

    Array.from(formItems).forEach((element) => {
        let windowHeight = window.innerHeight;
        let revealTop = element.getBoundingClientRect().top;
        let revealPoint = 100;

        if (revealTop < windowHeight - revealPoint) {
            element.classList.add("active");
        }
    });
}

// Form Submit Button
let fBtn = document.querySelector(".f-btn");
fBtn.addEventListener("mouseover", () => {
    fBtn.innerHTML = "We are just one click away!";
    fBtn.addEventListener("mouseout", () => {
        fBtn.innerHTML = "Send Message!";
    });
});