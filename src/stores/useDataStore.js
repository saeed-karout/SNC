import { defineStore } from 'pinia';
import axios from 'axios';

export const useDataStore = defineStore('dataStore', {
  state: () => ({
    data: [],
    language: JSON.parse(localStorage.getItem('myAppData'))?.language || 'en', // Default language is English
  }),

  actions: {
    async fetchData() {
      const storedData = localStorage.getItem(`data_${this.language}`);

      if (storedData) {
        this.data = JSON.parse(storedData);
        console.log(`Loaded data from localStorage for language: ${this.language}`);
      } else {
        try {
          const response = await axios.get('https://snc.shamnet.com.sa', {
            headers: {
              'Accept-Language': this.language,
            },
          });

          console.log('Response data:', response.data);

          if (Array.isArray(response.data)) {
            this.data = response.data.map(item => ({
              name: item.name,
              description: item.description,
            }));
          } else {
            console.error('Expected an array but received:', response.data);
          }

          localStorage.setItem(`data_${this.language}`, JSON.stringify(this.data));
          console.log(`Fetched and stored data for language: ${this.language}`);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    },
    setLanguage(newLanguage) {
      this.language = newLanguage;
      localStorage.setItem('myAppData', JSON.stringify({
        ...JSON.parse(localStorage.getItem('myAppData') || '{}'),
        language: newLanguage,
      }));

      // إعادة تحميل البيانات للغة الجديدة
      this.fetchData();
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'myAppData',
        storage: localStorage,
      },
    ],
  },
});
