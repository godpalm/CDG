<script setup>
import { ref, onMounted } from 'vue';
import DefaultLayout from "@/layouts/defaultLayout.vue";
import { userService } from '@/services/userService';
import UserTable from "@/components/UserTable.vue"; 

const users = ref([]);
const loading = ref(true); 

const getAllUsers = async () => {
  try {
    loading.value = true;
    const response = await userService.getAll(); 
    users.value = response.data;
  } catch (error) {
    console.error('ดึงข้อมูลล้มเหลว:', error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getAllUsers();
});
</script>

<template>
  <DefaultLayout>
    <v-container>
      <h1>หน้าแรก</h1>
      <UserTable :userData="users" :isLoading="loading" />
      <br>
      <v-btn color="primary" @click="getAllUsers">Refresh</v-btn>
    </v-container>
  </DefaultLayout>
</template>