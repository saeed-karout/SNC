import { defineStore } from 'pinia';

export const useVideoStore = defineStore('videoStore', {
  state: () => ({
    videoBlobUrl: null,
  }),
  actions: {
    async loadVideo(videoUrl) {
      const storedBlob = localStorage.getItem('videoBlobBase64');

      if (storedBlob) {
        // تحويل الـ Base64 المخزن إلى Blob ثم إلى Object URL
        const blob = this.base64ToBlob(storedBlob, 'video/mp4');
        this.videoBlobUrl = URL.createObjectURL(blob);
      } else {
        try {
          const response = await fetch(videoUrl);
          if (!response.ok) throw new Error('Failed to fetch video');

          const blob = await response.blob();
          this.videoBlobUrl = URL.createObjectURL(blob);

          // تحويل الـ Blob إلى Base64 وتخزينه في localStorage
          const base64Data = await this.blobToBase64(blob);
          localStorage.setItem('videoBlobBase64', base64Data);
        } catch (error) {
          console.error('Error loading video:', error);
        }
      }
    },
    blobToBase64(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    },
    base64ToBlob(base64, type) {
      const binary = atob(base64);
      const array = [];
      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], { type });
    },
  },
});
