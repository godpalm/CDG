<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.back(); 
};
</script>

<template>
  <v-btn
    prepend-icon="mdi-arrow-left"
    variant="text"
    color="primary"
    @click="goBack"
  >
    Back
  </v-btn>
</template>