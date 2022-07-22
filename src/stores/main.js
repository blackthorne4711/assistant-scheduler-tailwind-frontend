import { defineStore } from 'pinia'
import axios from 'axios'

export const UserRoles = Object.freeze({
  UNDEFINED: undefined,
  USER: "user",
  ADMIN: "admin",
})

export default UserRoles

export const useMainStore = defineStore('main', {
  state: () => ({
    /* User */
    userName: '',
    userEmail: '',
    userAvatar: 'https://avatars.dicebear.com/api/avataaars/example.svg?options[top][]=shortHair&options[accessoriesChance]=93',
    userAuth: false,
    userRole: UserRoles.UNDEFINED,
    authInit : false,
  }),
  actions: {
    setAuthInit () {
      console.log('DEBUG - setAuthInit')
      this.authInit = true
    },
    setUser (payload) {
      console.log('DEBUG - setUser')
      if (payload.name) {
        this.userName = payload.name
      }
      if (payload.email) {
        this.userEmail = payload.email
      }
      if (payload.avatar) {
        this.userAvatar = payload.avatar
      }
      if (payload.auth) {
        this.userAuth = payload.auth
      }
      if (payload.role) {
        this.userRole = payload.role
      }
    },
    resetUser () {
      console.log('DEBUG - resetUser')
      this.userName = ''
      this.userEmail = ''
      this.userAvatar = 'https://avatars.dicebear.com/api/avataaars/example.svg?options[top][]=shortHair&options[accessoriesChance]=93'
      this.userAuth = false
      this.userRole = UserRoles.UNDEFINED
    },
  },
})
