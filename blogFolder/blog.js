// Add interactivity for navigation menu (mobile responsiveness)
// Toggle navigation on small screens
function toggleNav() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('active');
    // Toggle menu icon between hamburger and close
    const navButton = document.querySelector('.nav-toggle');
    if (nav.classList.contains('active')) {
        navButton.innerHTML = '&#10005;'; // X icon
    } else {
        navButton.innerHTML = '&#9776;'; // Hamburger icon
    }
}

// Responsive navigation button
const navButton = document.createElement('button');
navButton.className = 'nav-toggle';
navButton.innerHTML = '&#9776;'; // Hamburger icon
navButton.onclick = toggleNav;

document.addEventListener('DOMContentLoaded', function() {
    // Insert nav button before nav for mobile
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    if (header && nav) {
        header.insertBefore(navButton, nav);
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            const targetId = link.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                // Close nav on mobile after click
                if (window.innerWidth <= 768) {
                    nav.classList.remove('active');
                    navButton.innerHTML = '&#9776;';
                }
            }
        });
    });

    // Highlight active section in nav
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('nav a');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Slider functionality for post.html
    // Shows one slide at a time and navigates with buttons
    const slidesPost = document.querySelectorAll('.slide');
    const prevBtnPost = document.querySelector('.slider-btn.prev');
    const nextBtnPost = document.querySelector('.slider-btn.next');
    let currentSlidePost = 0;

    function showSlidePost(index) {
        slidesPost.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    prevBtnPost.addEventListener('click', function() {
        currentSlidePost = (currentSlidePost - 1 + slidesPost.length) % slidesPost.length;
        showSlidePost(currentSlidePost);
    });

    nextBtnPost.addEventListener('click', function() {
        currentSlidePost = (currentSlidePost + 1) % slidesPost.length;
        showSlidePost(currentSlidePost);
    });

    // Show the first slide initially
    showSlidePost(currentSlidePost);

    // Slider functionality for index.html
    // Shows one slide at a time, auto-slides every 5s, and allows manual navigation
    const slidesIndex = document.querySelectorAll('.slider-section .slide');
    const prevBtnIndex = document.querySelector('.slider-section .slider-btn.prev');
    const nextBtnIndex = document.querySelector('.slider-section .slider-btn.next');
    let currentSlideIndex = 0;
    let autoSlideInterval;

    function showSlide(index) {
        slidesIndex.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % slidesIndex.length;
        showSlide(currentSlideIndex);
    }

    function prevSlide() {
        currentSlideIndex = (currentSlideIndex - 1 + slidesIndex.length) % slidesIndex.length;
        showSlide(currentSlideIndex);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    prevBtnIndex.addEventListener('click', function() {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });

    nextBtnIndex.addEventListener('click', function() {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    showSlide(currentSlideIndex);
    startAutoSlide();
});

// Add more interactive features as needed below
// Example: Show/hide testimonials, toggle features, etc.
