const root = document.querySelector(':root')
const body = document.querySelector('body')
const hero = document.querySelector('.hero')
const myWork = document.querySelector('.my-work')
const projects = document.querySelectorAll('.project')

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
  root.style.setProperty('--x', `${e.pageX}px`)
  root.style.setProperty('--y', `${e.pageY}px`)
})

const workTransition = (scrollHeight) => {
  const threshold = 400
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
      console.log(project)
      // project.target.children[0].style.left = `-400px`
      // project.target.children[1].style.left = `400px`
      project.target.children[0].animate(
        [{ left: `0px` }, { left: '-400px' }],
        animationOptions
      )
      project.target.children[1].animate(
        [{ left: `0px` }, { left: '400px' }],
        animationOptions
      )
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
