
particlesJS("particles-js", {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#0ff0fc" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#0ff0fc", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 3, direction: "none", random: true, straight: false, out_mode: "out" }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" }
        }
    }
});


const logo = document.querySelector('.logo');
logo.addEventListener('mouseover', () => {
    logo.classList.add('glitch-effect');
    setTimeout(() => logo.classList.remove('glitch-effect'), 500);
});
