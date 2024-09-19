import { defineStore } from 'pinia';
import axios from 'axios';

export const useDataStore = defineStore('dataStore', {
  state: () => ({
    data: [],
    language: 'ar', // اللغة الافتراضية هي العربية
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
              'Accept-Language': this.language, // استخدام اللغة المحددة في المتجر
            },
          });

          console.log('Response data:', response.data);

          if (Array.isArray(response.data)) {
            // استخدم $patch لتحديث الحالة بعد عملية غير متزامنة
            this.$patch({
              data: response.data.map(item => ({
                name: item.name,
                description: item.description,
              })),
            });
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
      // استخدم $patch لتحديث الحالة بشكل متزامن
      this.$patch({
        language: newLanguage,
      });

      // لا حاجة لتخزين اللغة يدويًا في localStorage، حيث يقوم Pinia Persist بذلك
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
        paths: ['language'], // تحديد أن 'language' هي التي يجب تخزينها
      },
    ],
  },
});
