gsap.registerPlugin(ScrollToPlugin)
gsap.registerPlugin(ScrollTrigger)
// Preloader
let preloaderTimeLine = gsap.timeline({})
preloaderTimeLine.to('.preloader .line', 1.5, {
    width: '100%',
})
preloaderTimeLine.to('.preloader .block-top', 0.5, {
    y: "-100%"
})
preloaderTimeLine.to('.preloader .line', {
    opacity: 0,
    delay: -0.5,
})
preloaderTimeLine.to('.preloader .block-bottom', 0.5, {
    y: "100%",
    delay: -0.5,

})

// Header on scroll
let headerMenu = document.querySelectorAll('header li')
const HeaderScroll = (e) => {
    e.target.classList.add('active')
    document.querySelector('.menu-ess').classList.remove('active')
    document.querySelector('.hamburger').classList.remove('is-active')
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
let defaultScrollTrigger = {
    start: `top 50%`,
    end: "bottom 80%",
    // markers: true
}





// Banner Timeline
preloaderTimeLine.to('.anim-block', {
    y: "-100%",
    stagger: 1.3,
    duration: 1,
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
preloaderTimeLine.fromTo('.banner figure', 1, {
    opacity: 0,
}, {
    opacity: 0.2,
})




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
    x: -200,
    stagger: 0.5,
}, {
    opacity: 1,
    x: -1,
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
aboutMeTimeLine.fromTo('.about-wrap svg', 1, {
    opacity: 0
}, {
    opacity: 1
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


let testimonialTimeLine = gsap.timeline({
    scrollTrigger: {
        trigger: '#testimonial',
        ...defaultScrollTrigger,
    }
})
titleTimeline(testimonialTimeLine, '#testimonial h2.centered-title')
testimonialTimeLine.fromTo('.review .review-slide', {
    opacity: 0,
    stagger: 0.1
}, {
    opacity: 1,
    stagger: 0.1
})
let reviewWrap = document.querySelector('.review')
gsap.matchMedia().add("(min-width: 768px)", () => {
    let reviewTimeLine = gsap.timeline({
        scrollTrigger: {
            trigger: '.review',
            pin: true,
            start: 'top 10%',
            scrub: 2,
            end: () => "+=" + (reviewWrap.scrollWidth - innerWidth),
            // markers: true
        }
    })

    reviewTimeLine.to('.review', {
        x: () => -1 * (reviewWrap.scrollWidth - document.querySelector('.container').offsetWidth),
    })
})

let getInTouchTimeLine = gsap.timeline({

    scrollTrigger: {
        trigger: '.review',
        start: 'top 90%',
        end: 'bottom bottom'
    }
})
getInTouchTimeLine.fromTo(document.querySelectorAll('.getin-touch *,footer'), {
    y: 20,
    stagger: 0.1,
    opacity: 0
}, {
    y: 0,
    stagger: 0.1,
    opacity: 1
})

// Banner wobble
let bannerFigure = document.querySelector('.banner figure')
gsap.to(bannerFigure, {
    rotation: 360,
    repeat: -1,
    duration: 10,
    ease: "none",

})
document.querySelector('.banner').addEventListener('mousemove', function (e) {
    let lMouseX = Math.max(-100, Math.min(100, document.querySelector('.banner-wrap').offsetWidth / 3 - e.clientX));
    let lMouseY = Math.max(-100, Math.min(100, document.querySelector('.banner-wrap').offsetHeight / 3 - e.clientY));
    gsap.to('.banner figure', {
        y: lMouseY,
        x: lMouseX
    })
})


document.querySelector('.hamburger').addEventListener('click', function () {
    this.classList.toggle('is-active')
    document.querySelector('.menu-ess').classList.toggle('active')
})