<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const drawerLeft = ref(false);  // ตัวแปรสำหรับฝั่งซ้าย
const drawerRight = ref(false); // ตัวแปรสำหรับฝั่งขวา
</script>

<template>
  <v-navigation-drawer v-model="drawerLeft" temporary location="left">
    <v-list-item title="ภาษา" subtitle="Left Menu" class="pa-4 font-weight-bold"></v-list-item>
    <v-divider></v-divider>
    <v-list>
      <v-list-item title="ภาษาไทย" @click="drawerLeft = false"></v-list-item>
      <v-list-item title="English" @click="drawerLeft = false"></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-navigation-drawer v-model="drawerRight" temporary location="right">
    <v-list-item title="ภาษา" subtitle="Right Menu" class="pa-4 font-weight-bold"></v-list-item>
    <v-divider></v-divider>
    <v-list>
      <v-list-item title="ภาษาไทย" @click="drawerRight = false"></v-list-item>
      <v-list-item title="English" @click="drawerRight = false"></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar color="black" elevation="2">
    <v-btn variant="text" @click="drawerLeft = !drawerLeft" class="ml-2">
      <v-icon start icon="mdi-earth"></v-icon>
      ภาษา
    </v-btn>

    <v-spacer></v-spacer>
    <p>IHEA</p>
    <v-spacer></v-spacer>

    <v-btn variant="text" @click="drawerRight = !drawerRight" class="mr-2">
      <v-icon end icon="mdi-car"></v-icon>
      ภาษา
    </v-btn>
  </v-app-bar>

  <v-app-bar color="white" density="compact" elevation="1">
    <v-tabs color="primary" align-tabs="start" fixed-tabs>
      <v-tab to="/home">Dashboard</v-tab>
      <v-tab to="/register">Users List</v-tab>
      <v-tab to="/login">Settings</v-tab>
    </v-tabs>
  </v-app-bar>
</template>