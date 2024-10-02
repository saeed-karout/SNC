<template>
  <div class="mt-4">
    <div class="pt-10">
      <section class="py-20">
        <h1 class="text-center mt-10 text-4xl font-bold leading-tight text-[#B38E60]">
          {{ t('contactUs.title') }}
        </h1>
        <hr class="my-4 mt-8 border-t-2 border-gray-300 dark:border-yellow-500 w-1/3 mx-auto">
        <div class="mx-auto mt-5 px-4 sm:px-6 lg:px-8">
          <div class="grid lg:grid-cols-2 grid-cols-1">
            <!-- Contact Information -->
            <div>
              <div class="group w-full h-full min-h-[350px] bg-gray-200 rounded-2xl overflow-hidden relative">
                <img src="../assets/bg-contact.webp" alt="ContactUs section"
                  class="w-full h-full object-cover lg:rounded-l-2xl rounded-2xl">
                <div class="absolute bottom-0 w-full lg:p-11 p-5">
                  <div class="bg-white rounded-lg p-6 shadow-lg">
                    <a href="tel:+966504451484" class="flex items-center mb-6">
                      <font-awesome-icon class="mx-2" icon="fa-solid fa-phone" />
                      <h5 style="direction: ltr;" class="text-black text-base font-normal leading-6 ml-5">
                        {{ t('contactUs.phone') }}
                      </h5>
                    </a>
                    <a href="mailto:infoshamnet@gmail.com" class="flex items-center mb-6">
                      <font-awesome-icon class="mx-2" icon="fa-solid fa-envelope" />
                      <h5 class="text-black text-base font-normal leading-6 ml-5">
                        infoshamnet@gmail.com
                      </h5>
                    </a>
                    <a href="https://goo.gl/maps/your-map-link" target="_blank" class="flex items-center">
                      <font-awesome-icon class="mx-2" icon="fa-solid fa-location-dot" />
                      <h5 class="text-black text-base font-normal leading-6 ml-5">
                        {{ t('contactUs.location') }}
                      </h5>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Contact Form -->
            <div class="bg-gray-50 p-5 lg:p-11 rounded-2xl dark:bg-gray-800 dark:opacity-80">
              <h2 class="text-4xl font-semibold leading-10 mb-12" style="color: #B38E60;">
                {{ t('contactUs.subtitle') }}
              </h2>
              
              <!-- Success Message -->
              <div v-if="successMessage" class="flex justify-between bg-teal-100 border border-teal-400 text-teal-700 px-4 py-3 my-2 rounded" role="alert">
                <span class="block sm:inline">
                  <strong class="font-bold">{{ t('contactUs.success') }}</strong>
                </span>
                <span class="cursor-pointer" @click="successMessage = null">
                  <svg class="fill-current h-6 w-6" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <title>{{ t('contactUs.close') }}</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
                  </svg>
                </span>
              </div>
              
              <!-- Error Message -->
              <div v-if="errorMessage" class="flex justify-between bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-2 rounded" role="alert">
                <span class="block sm:inline">
                  <strong class="font-bold">{{ t('contactUs.error') }}</strong>
                </span>
                <span class="cursor-pointer" @click="errorMessage = null">
                  <svg class="fill-current h-6 w-6" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <title>{{ t('contactUs.close') }}</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
                  </svg>
                </span>
              </div>
              
              <form @submit.prevent="submitForm" class="mt-24">
                <input v-model="formData.name" type="text"
                  class="w-full h-14 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none pl-4 mb-6"
                  :placeholder="t('contactUs.namePlaceholder')" :class="{'border-red-500': errors.name}" />
                <span v-if="errors.name" class="text-red-500">{{ errors.name }}</span>

                <input v-model="formData.email" type="email"
                  class="w-full h-14 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none pl-4 mb-6"
                  :placeholder="t('contactUs.emailPlaceholder')" :class="{'border-red-500': errors.email}" />
                <span v-if="errors.email" class="text-red-500">{{ errors.email }}</span>

                <textarea v-model="formData.feedback" cols="6" rows="4"
                  class="w-full text-gray-600 placeholder-gray-400 bg-transparent text-lg shadow-sm font-normal leading-6 rounded-3xl border border-gray-200 focus:outline-none p-4 mb-6"
                  :placeholder="t('contactUs.messagePlaceholder')" :class="{'border-red-500': errors.feedback}"></textarea>
                <span v-if="errors.feedback" class="text-red-500">{{ errors.feedback }}</span>

                <button type="submit"
                  class="w-full h-14 text-white text-base font-semibold leading-6 rounded-full bg-secondary transition-all duration-700 hover:bg-[#A9947E] hover:text-[#1F2937] shadow-sm">
                  {{ t('contactUs.submit') }}
                </button>

                <div class="flex items-center justify-center align-middle my-12 gap-3">
                  <SocialMediaComponent />
                  <a href="https://wa.me/+966504451484" target="_blank" class="social dark:bg-white">
                    <font-awesome-icon class="text-white hover:text-secondaryDark dark:text-secondaryDark"
                      icon="fa-brands fa-whatsapp" />
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import SocialMediaComponent from '@/components/SocialMediaComponent.vue';
import { useI18n } from 'vue-i18n';
import { BASE_URL } from '@/config';

const { t } = useI18n();

const formData = ref({
  name: '',
  email: '',
  feedback: '',
});

const errors = ref({
  name: null,
  email: null,
  feedback: null,
});

const successMessage = ref(null);
const errorMessage = ref(null);

const validateForm = () => {
  let isValid = true;

  if (!formData.value.name) {
    errors.value.name = t('contactUs.validation.nameRequired');
    isValid = false;
    hideErrorAfterDelay('name');
  } else {
    errors.value.name = null;
  }

  if (!formData.value.email) {
    errors.value.email = t('contactUs.validation.emailRequired');
    isValid = false;
    hideErrorAfterDelay('email');
  } else if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
    errors.value.email = t('contactUs.validation.emailInvalid');
    isValid = false;
    hideErrorAfterDelay('email');
  } else {
    errors.value.email = null;
  }

  if (!formData.value.feedback) {
    errors.value.feedback = t('contactUs.validation.messageRequired');
    isValid = false;
    hideErrorAfterDelay('feedback');
  } else {
    errors.value.feedback = null;
  }

  return isValid;
};

const hideErrorAfterDelay = (field) => {
  setTimeout(() => {
    errors.value[field] = null;
  }, 5000);
};

const submitForm = async () => {
  if (!validateForm()) {
    return;
  }

  try {
    const response = await axios.post(`${BASE_URL}/feedbacks`, formData.value);

    successMessage.value = t('contactUs.success');

    // Reset form values after successful submission
    formData.value.name = '';
    formData.value.email = '';
    formData.value.feedback = '';

    // Clear the success message after a few seconds
    setTimeout(() => {
      successMessage.value = null;
    }, 5000);

  } catch (error) {
    handleError(error);
  }
};

const handleError = (error) => {
  if (error.response) {
    console.error('Server responded with an error:', error.response.data);
    errorMessage.value = `Error: ${error.response.data.message || t('contactUs.error')}`;
  } else if (error.request) {
    console.error('No response received:', error.request);
    errorMessage.value = t('contactUs.error');
  } else {
    console.error('Error setting up request:', error.message);
    errorMessage.value = `${t('contactUs.error')} ${error.message}`;
  }

  // Clear the error message after a few seconds
  setTimeout(() => {
    errorMessage.value = null;
  }, 5000);
};
</script>

<style scoped>
/* Add your custom styles here */
    .social {
        display: flex;

        justify-content: center;
        align-items: center;

        width: 2.50rem;
        height: 2.50rem;
        border-radius: 50%;
        background-color: #374151;

    }

    .social:hover {
        background-color: #dcdbe2;
        color: #000;
        border: 1px solid #000;
    }
</style>
