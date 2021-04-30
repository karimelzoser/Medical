const togglerMenu = document.querySelector('.toggler-menu');
const header = document.querySelector('.header');
const logoImg = document.querySelector('.logo-img')
const navLink = document.querySelectorAll('.nav-link');
const navList = document.querySelector('.nav-list');
const prevBtn = document.querySelector('.control-left');
const nextBtn = document.querySelector('.control-right');
const card = document.querySelectorAll('.card');
const accordion = document.querySelector('.accordion');
const faq = document.querySelectorAll('.single-faq');
const backToTop = document.querySelector('.back');
const section = document.querySelectorAll('section');
const loader = document.querySelector('.loader-overlay');


// REMOVE LOADER WHEN PAGE LOADED
window.addEventListener('load', () => {
    loader.classList.add('loaded');
    document.body.style.overflowY = 'scroll';
}, 3000)


// ADD/REMOVE CLASS "OPEN-MENU" WHEN CLICKING TOGGELER MENU
togglerMenu.addEventListener('click', () => {
    header.classList.toggle('menu-open');
})
// REMOVE "OPEN-MENU" WHEN RESIZING
window.addEventListener('resize', () => {
    if (window.innerWidth > 991) {
        header.classList.remove('menu-open');
    }
})
const logoImgSrc = logoImg.getAttribute('src');

// ADD/REMOVE CLASS "SCROLLED" TO HEADER WHEN SCROLLING
window.addEventListener('scroll', () => {
    const logoImgSrcN = logoImgSrc.replace("logo.svg", "logo-2.svg");
    if (window.scrollY > 10) {
        header.classList.add('scroll');
        // REPLACE LOGO IMAGE WHEN SCROLLING
        logoImg.setAttribute('src', logoImgSrcN);
    }
    else {
        header.classList.remove('scroll');
        logoImg.setAttribute('src', logoImgSrc);
    }
    const position = window.offsetTop || document.documentElement.scrollTop
        || document.body.scrollTop;

    navLink.forEach((link) => {
        let currLink = link;
        let linkHref = currLink.getAttribute('href');
        let elements = document.querySelector(linkHref);
        if (elements.offsetTop <= position &&
            (elements.offsetTop + elements.offsetHeight > position)) {
            document.querySelector('.nav-link').classList.remove('active');
            currLink.classList.add('active');
        } else {
            currLink.classList.remove('active');
        }
    })
})
// ADD SMOOTH SCROLLING WHEN SELECT THE NAV LINK
// FIRST ADD CLICK EVENT TO ALL LINKS
navLink.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        const offsetTop = document.querySelector(href).offsetTop - 80;
        scroll({
            top: offsetTop,
            behavior: "smooth"
        })
        // REMOVE "OPEN-MENU" WHEN TAGRET A LINK
        header.classList.remove('menu-open');
        navList.querySelector('.active').classList.remove('active');
        link.classList.add('active');
    })

})

// LOOP THROW FAQ ACCORDION 
for (let i = 0; i < faq.length; i++) {
    faq[i].addEventListener('click', function () {
        const notElement = (!this);
        this.classList.toggle('active');
    })
}

// TESTIMONIALS SLIDER

// RESET THE SLIDER IMAGES
function reset() {
    for (let i = 0; i < card.length; i++) {
        card[i].style.display = "none";
    }
}

// INITIAL THE SLIDER IMAGE
function startSlider() {
    reset();
    card[0].style.display = "block";
}
startSlider();
let current = 0;
// prevBtn
function slideLeft() {

    reset();
    card[current - 1].style.display = "block";
    current--;
}
// nextBtn
function slideRight() {
    reset();
    card[current + 1].style.display = "block";
    current++;
}

prevBtn.addEventListener('click', function () {

    if (current === 0) {
        current = card.length;
    }
    slideLeft();
})

nextBtn.addEventListener('click', function () {
    if (current === card.length - 1) {
        current = -1;
    }
    slideRight();
})
// ADD/REMOVE CLASS TO BACK TO TOP BTN
window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
})

// SCROLL TO TOP 
backToTop.addEventListener('click', () => {
    const headerOffset = document.querySelector('.header').offsetTop;
    scroll({
        top: headerOffset,
        behavior: 'smooth'
    });
})