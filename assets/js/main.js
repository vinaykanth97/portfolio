gsap.registerPlugin(ScrollToPlugin)
let reviewSwiper = new Swiper(".swiper-container", {
    spaceBetween: 30,
    slidesPerView: 3,
    centeredSlides: true,
    loop: true,
    autoplay: true,
    roundLengths: true,
});


// Header on scroll
let headerMenu = document.querySelectorAll('header li')
const HeaderScroll = (e) => {
    e.target.classList.add('active')
    headerMenu.forEach(menu => {
        if (e.target !== menu) {
            menu.classList.remove('active')
        }
    })
    gsap.to(window, {
        duration: 1.5,
        ease: "back.inOut(1.7)",
        scrollTo: {
            y: `#${e.target.getAttribute('data-id')}`,
            offsetY: document.querySelector('header').offsetHeight
        }
    });
}
headerMenu.forEach(menu => menu.addEventListener('click', HeaderScroll))
