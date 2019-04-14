import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://api.privilegeclub.id/',
  crossDomain: true
})
export default ({ app, router, Vue }) => {
  Vue.prototype.$axios = instance
}
