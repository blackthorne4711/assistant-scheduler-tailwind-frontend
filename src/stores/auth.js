import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/plugins/firebase";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const UserRoles = Object.freeze({
  UNDEFINED: undefined,
  USER: "USER",
  ADMIN: "ADMIN",
})

export default UserRoles

export const useAuthStore = defineStore({
  id: "auth",

  state: () => ({
    user: null,
    userEmail: '',
    userRole: UserRoles.UNDEFINED,
    userName: '',
    isLoggedIn: false,
    accessToken: '',
  }),

  getters: {
    getAccessToken() {
      return this.accessToken
    }
  },

  actions: {
    async getUserProfile () {
      //console.log("DEBUG - getUserProfile - " + this.accessToken)
      const getURL = API_BASE_URL + '/profile'
      //console.log("DEBUG - " + getURL)
      axios.get(API_BASE_URL + '/profile',
        { headers: { 'Authorization': this.accessToken } } )
      .then((res) => {
        console.log(res.data)
        this.userRole = res.data.role
        this.userName = res.data.firstName + res.data.lastName
      })
      .catch((error) => {
        console.error(error)
      })
    },

    register(data) {
      return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
          .then(async (userCredentials) => {
            this.user = userCredentials.user;
            this.router.push("/");
            resolve(userCredentials);
          })
          .catch((error) => {
            console.log("Auth - register - An error happened.", error);
            reject(error);
          });
      });
    },

    login(data) {
      return signInWithEmailAndPassword(auth, data.email, data.password);
    },

    logout() {
      signOut(auth)
        .then(() => {
          console.log("Auth - logout - Successful.");
        })
        .catch((error) => {
          console.log("Auth - logout - An error happened.", error);
        });
    },

    initializeAuthentication() {
      const user = this.getCurrentUser;

      if (user) {
        //console.log('Auth - initializeAuthentication')
        //console.log(user)
        this.userEmail = email
        this.user = user;
        this.isLoggedIn = true;

        userCredentials.user.getIdToken().then(function (idToken) {
          this.accessToken = "Bearer " + idToken
          //console.log("DEBUG - initializeAuthentication - " + this.accessToken)
        }).catch(function (error) {
          console.log("Error in initializeAuthentication - getIdToken")
        });
      } else {
        this.user = null;
        this.isLoggedIn = false;
      }
    },
  },
});
