<script setup>
import { ref } from "vue";
const drawer = ref(false);
const menuItems = [
  { title: "Home", icon: "mdi-home", to: "/" },
  { title: "Book", icon: "mdi-phone", to: "/login" },
  { title: "Register", icon: "mdi-cart", to: "/register" },
];
</script>

<template>
  <v-navigation-drawer v-model="drawer" temporary>
    <v-list>
      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        v-bind="item"
        link
      />
    </v-list>
  </v-navigation-drawer>

  <v-app-bar color="black" elevation="2">
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>godpalm is here kub</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon="mdi-magnify"></v-btn>
  </v-app-bar>
</template>
