import Transmission from '.'

const apiInstance = new Transmission({
  url: process.env.NEXT_PUBLIC_TRANSMISSION_RPC_PATH,
})

export default apiInstance
