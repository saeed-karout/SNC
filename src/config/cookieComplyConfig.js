// src/config/cookieComplyConfig.js
export default {
  position: 'bottom-right', // الموقع: bottom-right, bottom-left, top-right, top-left
  theme: 'dark', // الثيم: light, dark, auto
  style: 'classic', // النمط: classic, pill, bar
  message: 'نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقعنا. بالاستمرار في التصفح، فإنك توافق على استخدامها.',
  link: {
    label: 'تعرف على المزيد',
    href: '/privacy-policy', // رابط سياسة الخصوصية
  },
  button: {
    label: 'موافق',
  },
  categories: [
    {
      label: 'الأساسية',
      description: 'هذه الملفات ضرورية لتشغيل الموقع بشكل صحيح.',
      required: true,
    },
    {
      label: 'التسويق',
      description: 'هذه الملفات تساعد في تتبع زياراتك وتحليل استخدامك للموقع.',
      required: false,
    },
    // يمكنك إضافة فئات أخرى حسب الحاجة
  ],
}
