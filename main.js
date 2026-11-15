const yearEl = document.getElementById("year");
const heading = document.getElementById('heroHeading');
const phoneLink = document.getElementById("phoneLink");
const ctaBtn = document.getElementById("ctaBtn");
const callBtn = document.getElementById("callBtn");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById('mobileMenu');
const featureGrid = document.getElementById('featureGrid');
const nav = document.getElementById('nav');
const siteHeader = document.querySelector('.site-header');


// used for both the desktop nav and the mobile menu
const navLinks = [
    {label: 'Home', href: '#hero'},
    {label: 'Services', href: '#features'},
    {label: 'Book', href: '#cta'},
    {label: 'Contact', href: '#footer'}
];

const services = [
    {
        title: 'Classic Haircut',
        text: 'Timeless cuts with modern precision tailored to your style.',
        img: 'feature-1.jpeg',
        imgPosition: 'center 28%' // shift the crop up so the face sits in the middle
    },
    {
        title: "Beard Trim",
        text: 'Shape and line up your beard for a clean, sharp finish.',
        img: 'feature-2.jpeg'
    },
    {
        title: 'Straight Razor Shave',
        text: 'Hot towel treatment with a smooth traditional shave.',
        img: 'feature-3.jpeg'
    },
    {
        title: 'Spray-On Hairlines',
        text: 'Making miracles happen by bringing back that line.',
        img: 'feature-4.jpeg',
        imgPosition: 'center 30%' // shift the crop up so the face (and hairline) stays in view
    }
];

function renderNavigation(){
    //use map to iterate through our nav array
    //link = elements of the array map is being ran on
    //link = {label: 'Home', href: '#hero'}
    if (nav){
        const navHTML = navLinks.map((link) => {
            return `
            <a href='${link.href}' class='nav-link'>
            ${link.label}
            </a>
            `;
        }).join('');
        nav.innerHTML = navHTML;
    }

    //mobile menu
    if (mobileMenu){
        const mobileMenuLinksHTML = navLinks.map((link) => {
            return `
            <a href='${link.href}' class='mobile-link'>
            ${link.label}
            </a>
            `;
        }).join('');
        mobileMenu.innerHTML = mobileMenuLinksHTML;
    }
}

renderNavigation();

function renderFeatures(){
    if(!featureGrid) return;

    services.forEach(function(service){

        const card = document.createElement('article');
        card.classList.add('feature-card');

        card.innerHTML = `
        <img src="${service.img}" alt="${service.title}" class="feature-img" style="object-position: ${service.imgPosition || 'center'}">
        <h3 class="feature-title">${service.title}</h3>
        <p class="feature-text">${service.text}</p>
        `;

        featureGrid.appendChild(card);

    });
}

function setCurrentYear() {
    const now = new Date();
    yearEl.textContent = now.getFullYear();
}
function updateHeadingText(newText){
    heading.textContent = newText;
}

let isMenuOpen = false;

function toggleMobileMenu(){
    if (isMenuOpen === false) {
        mobileMenu.classList.add("is-open");
        isMenuOpen = true;
    } else {
        mobileMenu.classList.remove("is-open");
        isMenuOpen = false;
    }
    menuBtn.setAttribute("aria-expanded", isMenuOpen);
}

function closeMobileMenu(){
    mobileMenu.classList.remove("is-open");
    isMenuOpen = false;
    menuBtn.setAttribute("aria-expanded", false);
}

setCurrentYear();

ctaBtn.addEventListener("click", function() {
    updateHeadingText(
        "Booking coming next - great choice!"
    );
});


callBtn.addEventListener('click', function(){

    if (phoneLink){

        updateHeadingText(
            'Call us at ' + phoneLink.textContent
        );

    }else {

        updateHeadingText(
            'Call feature coming next!'
        );

    }

});

menuBtn.addEventListener("click", function(){
    toggleMobileMenu();
});

mobileMenu.addEventListener("click", function(event){
    if (event.target.tagName === "A"){
        closeMobileMenu();
    }

});

renderFeatures();

function handleHeaderOnScroll(){
    if(!siteHeader) return;

    if(window.scrollY > 10){
        siteHeader.classList.add('is-scrolled');
    }else{
        siteHeader.classList.remove('is-scrolled');
    }
}

// pass the function itself (no parentheses) so it runs on every scroll
window.addEventListener('scroll', handleHeaderOnScroll);
handleHeaderOnScroll();
