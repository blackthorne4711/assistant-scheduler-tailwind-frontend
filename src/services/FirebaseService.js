import firebase from 'firebase/compat/app'
import { getAnalytics } from 'firebase/analytics'
import 'firebase/compat/auth'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: 'AIzaSyDiFuVHVuVg1YZTbHytDZvdBR--5hBdLJ4',
  authDomain: 'stallhjalpen.firebaseapp.com',
  //databaseURL: 'https://fir-auth-9fe24.firebaseio.com', TODO change
  projectId: 'stallhjalpen',
  storageBucket: 'stallhjalpen.appspot.com',
  messagingSenderId: '678080177560',
  appId: '1:678080177560:web:4a895fb01ed0076eb237ed',
  measurementId: 'G-WHGZ2RYSBT',
}

export default {
  init(mainStore) {
    console.log('DEBUG - FirebaseService init()')
    getAnalytics(firebase.initializeApp(config))
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

    let currentUser = firebase.auth().currentUser
    console.log(currentUser)
    if (currentUser) {
      console.log('DEBUG - FirebaseService init() - found currentUser - ' + curentUser.email)
      mainStore.setUser({
        name: 'Testuser',
        email: currentUser.email,
        userAuth: currentUser.uid ? true : false,
      })
    }
  },
  loginWithGooglePopup() {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider)
  },
  loginWithBasicAuth(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  },
  logout() {
    console.log('DEBUG - FirebaseService logout()')
    firebase.auth().signOut()
    mainStore.resetUser()
  },
  onAuth(mainStore) {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('DEBUG - onAuthStateChanged')
      user = user ? user : {}

      mainStore.setUser({
        name: 'Testuser',
        email: user.email,
        userAuth: user.uid ? true : false,
      })

      mainStore.setAuthInit()
    })
  },
  getUser() {
    // getAnalytics(firebase.initializeApp(config))
    // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    let user = firebase.auth().currentUser
    return (user = user ? user : {})
  },
}
