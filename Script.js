
/////////////////// Main Image & Para Changes ///////////////////////

const images = document.querySelectorAll(".mainImage img");
const para = document.querySelectorAll(".mainpicture-para p");
let container = document.querySelector(".mainpicture-para");
let current = 0;
let current1 = 0;

function changeImage() {
    let previous = current;
    let previous1 = current1;
    current = (current + 1) % images.length;
    current1 = (current1 + 1) % para.length;

    images[previous].classList.remove("active");
    para[previous1].classList.remove("active");
    images[previous].classList.add("previous");
    para[previous1].classList.add("previous");

    images[current].classList.add("active");
    para[current1].classList.add("active");

    // container.style.width = "1000px"
    setTimeout(() => {
        images[previous].classList.remove("previous");
        para[previous1].classList.remove("previous");
        // container.style.width = "700px"
    }, 4000); // Reset previous image after transition
}

setInterval(changeImage, 4000);


///////////////////////////Animation Counter ////////////////////////////

function animateCounter(counter) {
    const duration = parseInt(counter.getAttribute("data-duration"), 10);
    const toValue = parseInt(counter.getAttribute("data-to-value"), 10);
    const fromValue = parseInt(counter.getAttribute("data-from-value"), 10);
    const delimiter = counter.getAttribute("data-delimiter") || "";
    
    let startTime = null;

    function updateCounter(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const currentValue = Math.floor(progress * (toValue - fromValue) + fromValue);

        counter.textContent = delimiter 
            ? currentValue.toLocaleString() 
            : currentValue;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    requestAnimationFrame(updateCounter);
}

// Intersection Observer to trigger animation on scroll
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            counter.style.opacity = 1; // Fade in effect
            animateCounter(counter);
            observer.unobserve(counter); // Stop observing after animation starts
        }
    });
}, { threshold: 0.5 }); // Trigger when 50% of the element is visible

// Observe all counters
document.querySelectorAll(".counter").forEach(counter => {
    observer.observe(counter);
});


/////////////////////////////Scroll Button/////////////////////////////

window.onscroll = function () {
    let button = document.getElementById("scrollTopBtn");
    if (document.documentElement.scrollTop > 100) {
        button.style.display = "block";
    } else {
        button.style.display = "none";
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}