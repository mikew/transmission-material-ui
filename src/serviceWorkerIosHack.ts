export default function serviceWorkerIosHack() {
  if (!navigator.userAgent.match(/iPhone|iPad|iPod/)) {
    return
  }

  if (process.env.NODE_ENV !== 'production') {
    return
  }

  const buildVersion = process.env.REACT_APP_BUILD_VERSION
  const storedVersion = localStorage.getItem('storedVersion')

  if (buildVersion === storedVersion) {
    return
  }

  localStorage.setItem('storedVersion', String(buildVersion))
  window.location.reload()
}
