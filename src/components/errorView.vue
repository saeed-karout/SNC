<template>
  <div class="bg-container">
    <!-- محتوى الصفحة هنا -->
    <div class="content-container">
      <!-- زر العودة إلى الصفحة الرئيسية في أسفل الصورة -->
      <router-link to="/"
        class="return-button">
        {{ t('buttons.GoHome') }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style scoped>
/* تحسين التخطيط للشاشات الصغيرة */
.bg-container {
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('@/assets/404-1.jpg'); /* الصورة الافتراضية لأحجام الشاشات الكبيرة */
}

.dark .bg-container {
  background-image: url('@/assets/404-2.jpg'); /* صورة الوضع الداكن لأحجام الشاشات الكبيرة */
}

/* تعديل صورة الخلفية على الشاشات الصغيرة */
@media (max-width: 640px) {
  .bg-container {
    background-image: url('@/assets/404_Mobile_Light.jpg'); /* الصورة الخاصة بالموبايل */
  }

  .dark .bg-container {
    background-image: url('@/assets/404_Mobile_Dark.jpg'); /* صورة الوضع الداكن للموبايل */
  }
}

.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  /* لون الخلفية مع الشفافية */
 
  padding: 0 1rem; /* إضافة بعض الهوامش الجانبية */
}

.return-button {
  margin-bottom: 2rem;
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem; /* حجم الخط */
  background-color: #BE9B76;
  color: white;
  border-radius: 0.375rem; /* زوايا دائرية للزر */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: block;
  width: 100%;
  max-width: 15rem; /* عرض أقصى للزر */
}

/* تغيير لون الخلفية للزر عند التبديل إلى الوضع الداكن */
.dark .return-button {
  background-color: #BE9B76;
}

/* تحسين تصميم الزر عند التفاعل */
.return-button:hover {
  background-color: #a67c4e; /* لون الخلفية عند المرور بالماوس */
}

/* تحسين تصميم الزر عند التفاعل في الوضع الداكن */
.dark .return-button:hover {
  background-color: #16273a;
}
</style>
