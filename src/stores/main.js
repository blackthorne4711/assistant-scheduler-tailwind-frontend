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
    userAvatar: 'https://avatars.dicebear.com/api/avataaars/example.svg?options[top][]=shortHair&options[accessoriesChance]=93',
    userRole: UserRoles.UNDEFINED,
  }),
  actions: {
  },
})
