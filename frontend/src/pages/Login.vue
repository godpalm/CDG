<template>
  <v-container class="fill-height">
    <v-card width="400" class="mx-auto">
      <v-card-title>เข้าสู่ระบบ</v-card-title>
      <v-btn color="primary" @click="handleLogin">Login</v-btn>
    </v-card>
  </v-container>
</template>

<script setup>

import { useRouter } from 'vue-router';
const router = useRouter();

function handleLogin() {

  localStorage.setItem('isLoggedIn', 'true');
  router.push('/');
}

</script>