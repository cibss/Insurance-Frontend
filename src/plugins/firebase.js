import firebase from 'firebase/app'

import 'firebase/messaging'
// import something here

let fbConfig = {
  apiKey: 'AIzaSyBeDdwpaheYry5uMaCQJcbzz02ivTt4kKQ',
  authDomain: 'platinum-f4e5e.firebaseapp.com',
  databaseURL: 'https://platinum-f4e5e.firebaseio.com',
  projectId: 'platinum-f4e5e',
  storageBucket: 'platinum-f4e5e.appspot.com',
  messagingSenderId: '817906426394'
}

let fb = firebase.initializeApp(fbConfig)
let messaging = fb.messaging()

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  messaging.requestPermission()
    .then(function () {
      console.log('Have Access')

      messaging.getToken().then(function (currentToken) {
        console.log(currentToken, 'hai')
      }).catch(function (err) {
        console.log(err)
      })
    })
    .catch(function () {
      console.log('Error Bro')
    })

  Vue.prototype.$firebase = fb
  Vue.prototype.$messaging = messaging
}

export { messaging }
