import { instanceAxios } from 'plugins/axios'
import { messaging } from 'plugins/firebase'

const instance = {
  dateFormat: v => {
    if (v) {
      let dateObj = new Date(v)
      let date = dateObj.getDate().toString()
      let month = dateObj.getMonth().toString()
      if (month.length === 1) {
        month = '0' + month
      }
      if (date.length === 1) {
        date = '0' + date
      }
      dateObj = dateObj.getFullYear() + '-' + month + '-' + date
      return dateObj
    } else {
      return '-'
    }
  },
  onMessage: (cb = () => { }) => {
    console.log('platinum ON Message')
    function getTokenAndSave () {
      messaging.getToken().then(function (token) {
        console.log('TOKEN : ', token)
        let fd = new FormData()
        fd.append('fcm', token)
        instanceAxios.put('/admin/updatefcm', fd, {
          headers: {
            Authorization: JSON.parse(localStorage.getItem('authorization')),
            'Content-Type': 'multipart/form-data'
          }
        })
      }).catch(function (err) {
        console.error('GET TOKEN ERROR ', err)
      })
    }
    getTokenAndSave()

    messaging.onTokenRefresh(function () {
      getTokenAndSave()
    })

    messaging.onMessage(cb)
  }
}
export default ({ app, router, Vue }) => {
  Vue.prototype.$pl = instance
}
