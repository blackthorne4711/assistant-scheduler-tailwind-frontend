import { defineStore } from "pinia";
import axios from "axios";

import { useAuthStore } from '@/stores/auth.js'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const usePeriodStore = defineStore('period',
{
  state: () => ({
    initialised: false,
    periods: [],
    authStore: useAuthStore(),
  }),

  getters: {
    getPeriods() {
    	console.log('getPeriods')
    	return this.periods
    },
    async getPeriodsOld() {
    	console.log('getPeriodsOld')
    	if (!this.initialised) {
    		await this.fetchPeriods()
    		this.initialised = true
    	}
    	return this.periods
    }
  },

  actions: {
    async fetchPeriods () {
    	console.log('fetchPeriods')
		axios.get(API_BASE_URL + '/periods',
		{ headers: { 'Authorization': this.authStore.getAccessToken } } )
		.then((res) => {
			console.log('Done fetchPeriods')
			console.log(res.data)
			this.periods = res.data
			return res.data
		})
		.catch((error) => {
			console.error(error)
			return error
		})
    },
    async directfetchPeriods () {
    	console.log('directfetchPeriods')
		axios.get(API_BASE_URL + '/periods',
		{ headers: { 'Authorization': this.authStore.getAccessToken } } )
		.then((res) => {
			console.log('Done directfetchPeriods')
			console.log(res.data)
			return (res.data)
		})
		.catch((error) => {
			console.error(error)
			return (error)
		})
    },
  }
})
