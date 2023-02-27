const root = document.querySelector(':root')
const body = document.querySelector('body')
const cursorTrail = document.querySelector('.cursor-trail')
const hero = document.querySelector('.hero')
const myWork = document.querySelector('.my-work')
const aboutMe = document.querySelector('.about-me')
const projects = document.querySelectorAll('.project')
const radioBtns = document.querySelectorAll('[type=radio]')
const projectBtns = document.querySelectorAll(
  '.btn-primary, .btn-secondary, [type=radio], label'
)

let scrolling = false
let lastKnownScrollPosition = 0
let workScrollDist = 0

window.addEventListener('scroll', (e) => {
  const scrollHeight = window.scrollY
  root.style.setProperty('--scroll-height', `${scrollHeight}px`)
  workTransition(scrollHeight)
  // requestAnimationFrame(() => workHorizontalScroll(scrollHeight, e))
})

window.addEventListener('mousemove', (e) => {
  root.style.setProperty('--x', `${e.clientX}px`)
  root.style.setProperty('--y', `${e.clientY}px`)
  cursorTrail.animate([{ top: `${e.clientY}px`, left: `${e.clientX}px` }], {
    duration: 100,
    fill: 'forwards',
  })
})

projectBtns.forEach((btn) => {
  btn.addEventListener('mouseenter', () => {
    cursorTrail.style.width = '30px'
  })
  btn.addEventListener('mouseleave', () => {
    cursorTrail.style.width = '10px'
  })
})

const workTransition = (scrollHeight) => {
  const threshold = 330
  if (scrollHeight > threshold) {
    body.style.setProperty('background-color', 'var(--clr-bg-2)')
    hero.style.setProperty(
      'box-shadow',
      '0px 60px 100px rgba(255, 155, 252, 0.5)'
    )
    myWork.style.setProperty('opacity', 1)
  } else {
    body.style.setProperty('background-color', 'var(--clr-bg-1)')
    hero.style.setProperty(
      'box-shadow',
      '0px 60px 100px rgba(255, 155, 252, 1)'
    )
    myWork.style.setProperty('opacity', 0)
  }
}

/* Intersection Observer */
const options = {
  rootMargin: '-25% 0px',
}

const callback = (projects, observer) => {
  const animationOptions = {
    duration: 1500,
    fill: 'forwards',
    easing: 'ease-in-out',
    delay: 400,
  }
  projects.forEach((project) => {
    if (project.isIntersecting) {
      project.target.children[0].animate(
        [{ left: `0px` }, { left: '-400px' }],
        animationOptions
      )
      project.target.children[1].animate(
        [{ left: `0px` }, { left: '400px' }],
        animationOptions
      )
      if (project.target.querySelector('#baytown-image')) {
        project.target.querySelector('#baytown-image').animate(
          [
            { transform: 'rotate(0deg)', left: '0rem', top: '0rem' },
            { transform: 'rotate(-3deg)', left: '-4rem', top: '-2rem' },
          ],
          animationOptions
        )
      }
      if (project.target.querySelector('#portfolio-image')) {
        project.target.querySelector('#portfolio-image').animate(
          [
            { transform: 'rotate(0deg)', left: '0rem', top: '0rem' },
            { transform: 'rotate(3deg)', left: '4rem', top: '2rem' },
          ],
          animationOptions
        )
      }
      observer.unobserve(project.target)
    }
  })
}

const observer = new IntersectionObserver(callback, options)

projects.forEach((project) => observer.observe(project))

// const workHorizontalScroll = (scrollHeight) => {
//   const myWorkContainer = myWork.querySelector('.my-work-container')
//   const workScrollMax = myWorkContainer.clientWidth
//   const threshold = 612
//   if (threshold - scrollHeight > 0) body.style.top = `0px`
//   if (
//     scrollHeight > threshold &&
//     threshold - scrollHeight > window.innerWidth - workScrollMax
//   ) {
//     myWorkContainer.style.left = `-${scrollHeight - threshold}px`
//     body.style.top = `${scrollHeight - threshold}px`
//   }
// }
