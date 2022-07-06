// Alphabets rubberband effect handler
let alphabets = document.getElementsByClassName("popper");
root = document.querySelector(":root");
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
let btn = document.querySelector('.btn');
btn.addEventListener("mouseover", (event) => {
    root.style.setProperty("--btn-overlay-width", "131%");
    event.target.addEventListener("mouseout", () => {
        root.style.setProperty("--btn-overlay-width", "0%");
    });
});

// Mouse trail effect
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
    mouse.x = event.x + 50;
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
    hue = (hue + 1) % Number.MAX_SAFE_INTEGER;
    requestAnimationFrame(animate);
}

animate();