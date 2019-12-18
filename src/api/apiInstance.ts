import Transmission from '.'

const apiInstance = new Transmission({
  url:
    process.env.REACT_APP_TRANSMISSION_API_URL ||
    'http://localhost:8080/transmission/rpc',
})

export default apiInstance
