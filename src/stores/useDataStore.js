import { defineStore } from 'pinia';
import axios from 'axios';

export const useDataStore = defineStore('dataStore', {
  state: () => ({
    data: [],
    language: 'ar', // اللغة الافتراضية
  }),
  actions: {
    // جلب البيانات بناءً على اللغة
    async fetchData() {
      const storedData = localStorage.getItem(`data_${this.language}`);
    
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
    
          if (Array.isArray(parsedData)) {
            this.data = parsedData;
            console.log(`Loaded data from localStorage for language: ${this.language}`);
          } else {
            console.error('Invalid data format in localStorage:', parsedData);
          }
        } catch (error) {
          console.error('Error parsing stored data:', error);
        }
      } else {
        try {
          const response = await axios.get('https://snc.shamnet.com.sa', {
            headers: {
              'Accept-Language': this.language,
            },
          });
    
          if (Array.isArray(response.data)) {
            this.$patch({
              data: response.data.map(item => ({
                name: item.name,
                description: item.description,
              })),
            });
    
            localStorage.setItem(`data_${this.language}`, JSON.stringify(this.data));
            console.log(`Fetched and stored data for language: ${this.language}`);
          } else {
            console.error('Expected an array but received:', response.data);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    },
    
    // تغيير اللغة وحفظها
    setLanguage(newLanguage) {
      this.$patch({ language: newLanguage });
      this.fetchData();  // جلب البيانات الجديدة بناءً على اللغة المختارة
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'myAppData',
        storage: localStorage,
        paths: ['language'],  // تخزين اللغة فقط
      },
    ],
  },
});
