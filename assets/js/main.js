gsap.registerPlugin(ScrollToPlugin)
gsap.registerPlugin(ScrollTrigger)
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


// On Scroll Header
let option = {
    root: null,
    rootMargin: "0px 0px -40% 0px",
    threshold: 0.25,
}
let headerElement = document.querySelector('header')
const section = document.querySelectorAll('section.spc')
const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {
        let currentSectionId = entry?.target?.id
        if (entry.isIntersecting) {
            RemoveActiveMenu()
            document.querySelector(`header ul li[data-id=${currentSectionId}]`)?.classList?.add('active')
        } else {
            RemoveActiveMenu()
        }
    })
}, option)


section.forEach(sec => {
    observer.observe(sec)
})

function RemoveActiveMenu() {
    document.querySelectorAll(`header ul li`).forEach(ul => {
        ul.classList.remove('active')
    })
}

const headerOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            headerElement.classList.remove('active')
        } else {
            headerElement.classList.add('active')
        }
    })

}, {
    threshold: 0.97,
})
headerOnScroll.observe(document.querySelector('section'))


// Typewriter effect
let bannerHeading = document.querySelector('.main-content .role');

let typewriter = new Typewriter(bannerHeading, {
    loop: true
});



let gsapTimeLine = gsap.timeline({})


// Banner Timeline
gsapTimeLine.to('.anim-block', {
    y: -300,
    stagger: 1.3,
    duration: 2,
    onComplete: () => {
        typewriter
            .typeString('<span class="outlined">Frontend</span>')
            .pauseFor(1000)
            .deleteAll()
            .typeString('<b>Frontend</span>')
            .pauseFor(2500)
            .start();
    }
})
gsapTimeLine.to('.banner figure', {
    duration: 0.5,
    opacity: 1,
})


let defaultScrollTrigger = {
    start: `top 30%`,
    end: "bottom 80%",
    markers: true
}

let entryTitleAnimation = {
    start: {
        y: 100,
        opacity: 0,
    },
    end: {
        y: 0,
        opacity: 1,
        stagger: 0.5
    }
}

const titleTimeline = (timeline, selector) => {
    timeline.fromTo(selector, {
        ...entryTitleAnimation.start
    }, {
        ...entryTitleAnimation.end
    })
}

// skillTimeLine
let skillTimeLine = gsap.timeline({
    scrollTrigger: {
        trigger: '#skills',
        ...defaultScrollTrigger
    }
})

titleTimeline(skillTimeLine, '#skills h2')
skillTimeLine.fromTo('#skills .skill-wrap li', 1, {
    opacity: 0,
    rotateX: 0,
    scaleY: -1
}, {
    opacity: 1,
    stagger: 0.3,
    rotateX: 180,
    scaleY: -1,
});

// Experience Timeline
let experienceTimeLine = gsap.timeline({
    scrollTrigger: {
        trigger: '#experience',
        ...defaultScrollTrigger
    }
})
titleTimeline(experienceTimeLine, '#experience h2')
experienceTimeLine.fromTo('#experience .experience', 1, {
    opacity: 0,
    x: "-20%",
}, {
    opacity: 1,
    x: 0,
    stagger: 0.5,
})


// About us Timeline
let squarePath = document.querySelector('.square-cls').getTotalLength()
let aboutMeTimeLine = gsap.timeline({

    scrollTrigger: {
        trigger: '#about',
        ...defaultScrollTrigger
    }
})
titleTimeline(aboutMeTimeLine, '#about h2')
titleTimeline(aboutMeTimeLine, '#about p')

aboutMeTimeLine.fromTo('.square-cls', 2, {
    strokeDashoffset: squarePath,
    strokeDasharray: squarePath,
}, {
    strokeDashoffset: 0,
})

aboutMeTimeLine.fromTo('.eyebrow', 0.5, {

    y: -3,
    repeat: -1,
    yoyo: true,
    stagger: 0.3
}, {
    y: 0,
    repeat: -1,
    yoyo: true,
    stagger: 0.3
})

aboutMeTimeLine.fromTo('.lips', 1, {
    x: 2,
    repeat: -1,
    yoyo: true,
}, {
    x: 0,
    repeat: -1,
    yoyo: true,
})

// Project TimeLine
let projectTimeLine = gsap.timeline({
    scrollTrigger: {
        trigger: '#project',
        ...defaultScrollTrigger
    }
})
titleTimeline(projectTimeLine, '#project h2.centered-title')


document.querySelectorAll('.project').forEach((project, index) => {
    let projectTilesTimeLine = gsap.timeline({
        scrollTrigger: {
            trigger: project,
            ...defaultScrollTrigger
        }
    })
    projectTilesTimeLine.fromTo(project.querySelector('.project-img'), 1, {
        x: index % 2 === 0 ? 100 : -100,
        opacity: 0
    }, {
        x: 0,
        opacity: 1
    })
    projectTilesTimeLine.fromTo(project.querySelectorAll('.project-content *'), 0.8, {
        opacity: 0,
        stagger: 0.3
    }, {
        opacity: 1,
        stagger: 0.3
    })
})
