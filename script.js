const root = document.querySelector(':root')
const body = document.querySelector('body')
const hero = document.querySelector('.hero')
const myWork = document.querySelector('.my-work')

let scrolling = false
let lastKnownScrollPosition = 0
let workScrollDist = 0

window.addEventListener('scroll', (e) => {
  const scrollHeight = window.scrollY
  root.style.setProperty('--scroll-height', `${scrollHeight}px`)
  workTransition(scrollHeight)
  requestAnimationFrame(() => workHorizontalScroll(scrollHeight, e))
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

const workHorizontalScroll = (scrollHeight) => {
  const myWorkContainer = myWork.querySelector('.my-work-container')
  const workScrollMax = myWorkContainer.clientWidth
  const threshold = 612
  if (threshold - scrollHeight > 0) body.style.top = `0px`
  if (
    scrollHeight > threshold &&
    threshold - scrollHeight > window.innerWidth - workScrollMax
  ) {
    myWorkContainer.style.left = `-${scrollHeight - threshold}px`
    body.style.top = `${scrollHeight - threshold}px`
  }
}

// const workHorizontalScroll = (scrollHeight) => {
//   const myWorkContainer = myWork.querySelector('.my-work-container')
//   const myWorkItem = myWorkContainer.querySelector('.item')
//   const workScrollMax =
//     myWorkContainer.clientWidth - myWorkItem.clientWidth * 3 + 180
//   const threshold = 612
//   scrolling = 0 < workScrollDist && workScrollDist < workScrollMax
//   if (scrollHeight > threshold && scrolling) {
//     document.documentElement.scrollTop = threshold
//     if (scrollHeight > lastKnownScrollPosition) {
//       //scroll down
//       console.log('down')
//       workScrollDist += 10
//     } else if (scrollHeight < lastKnownScrollPosition) {
//       //scroll up
//       console.log('up')
//       workScrollDist -= 10
//     }
//   }

//   workScrollDist < 0 ? (workScrollDist = 0) : null
//   workScrollDist > workScrollMax ? (scrolling = false) : null
//   myWorkContainer.style.left = `-${workScrollDist}px`
//   lastKnownScrollPosition = window.scrollY
// }
