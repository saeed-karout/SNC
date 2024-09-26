// videoStore.js
import { defineStore } from 'pinia';
import { openDB } from 'idb';

export const useVideoStore = defineStore('videoStore', {
  state: () => ({
    videoBlobUrl: null,
  }),
  actions: {
    async loadVideo(videoUrl) {
      // فتح قاعدة البيانات
      const db = await openDB('videoDB', 1, {
        upgrade(db) {
          db.createObjectStore('videos');
        },
      });

      // التحقق مما إذا كان الفيديو مخزنًا مسبقًا
      const storedBlob = await db.get('videos', 'mainVideo');

      if (storedBlob) {
        // إنشاء Object URL من الـ Blob المخزن
        this.videoBlobUrl = URL.createObjectURL(storedBlob);
      } else {
        try {
          const response = await fetch(videoUrl);
          if (!response.ok) throw new Error('Failed to fetch video');

          const blob = await response.blob();
          this.videoBlobUrl = URL.createObjectURL(blob);

          // تخزين الـ Blob في IndexedDB
          await db.put('videos', blob, 'mainVideo');
        } catch (error) {
          console.error('Error loading video:', error);
        }
      }
    },
  },
});
