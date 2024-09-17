import { defineStore } from 'pinia'

export const useDarkModeStore = defineStore('darkMode', {
  state: () => ({
    isDarkMode: false,
  }),
  actions: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
      this.saveDarkModePreference()
    },
    loadDarkModePreference() {
      const savedPreference = localStorage.getItem('isDarkMode')
      this.isDarkMode = savedPreference ? JSON.parse(savedPreference) : false
      this.applyDarkMode()
    },
    saveDarkModePreference() {
      localStorage.setItem('isDarkMode', JSON.stringify(this.isDarkMode))
      this.applyDarkMode()
    },
    applyDarkMode() {
      if (this.isDarkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  },
  persist: true
})
