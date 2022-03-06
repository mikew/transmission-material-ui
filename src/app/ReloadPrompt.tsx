import { useEffect } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'

function ReloadPrompt() {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(registration) {
      if (registration) {
        setTimeout(() => {
          registration.update()
        }, 60 * 60 * 1000)
      }
    },
  })

  useEffect(() => {
    if (needRefresh) {
      updateServiceWorker(true)
    }
  }, [needRefresh, updateServiceWorker])

  return null
}

export default ReloadPrompt
