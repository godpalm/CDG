<script setup>
import Navbar from "../components/Navbar.vue"; // เช็ก Path ให้ถูกนะครับ
import AppFooter from "../components/AppFooter.vue";
</script>

<template>
  <Navbar />
  <v-main> <slot /> </v-main>
  <AppFooter />
</template>
