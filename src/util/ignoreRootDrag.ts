export default function ignoreRootDrag() {
  if (!document) {
    return
  }

  document.addEventListener('dragenter', (event) => {
    event.preventDefault()
  })
  document.addEventListener('dragover', (event) => {
    event.preventDefault()
  })
  document.addEventListener('drop', (event) => {
    event.preventDefault()
  })
}
