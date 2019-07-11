// tslint:disable-next-line:import-name
import Transmission from '.'

const apiInstance = new Transmission({
  url:
    process.env.REACT_APP_TRANSMISSION_API_URL ||
    'http://10.0.1.16:8080/transmission/rpc',
})

export default apiInstance
