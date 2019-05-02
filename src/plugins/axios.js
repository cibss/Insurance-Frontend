import axios from 'axios'

const instanceAxios = axios.create({
  baseURL: 'https://api.privilegeclub.id/',
  crossDomain: true
})
export default ({ app, router, Vue }) => {
  Vue.prototype.$axios = instanceAxios
}

export { instanceAxios }
