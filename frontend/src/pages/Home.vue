<!-- <script setup>
import DefaultLayout from "@/layouts/defaultLayout.vue";
import { userService } from '@/services/userService';

const getUserName = async () => {
  try {
    const response = await userService.getUserName();
    
  }
  

}
</script>


<template>
  <DefaultLayout>
    <h1>ยินดีต้อนรับคุณปาล์ม!</h1>
    <p>วันนี้มีโปรเจกต์อะไรให้ลุยบ้างครับ?</p>
    
    <v-text-field 
      label="สิ่งที่คุณปาล์มต้องการทำ" 
      placeholder="เช่น เรียน NestJS"
      variant="outlined"
      class="mt-4"
    ></v-text-field>

    <v-btn color="success" class="mt-4"> บันทึก</v-btn>
  </DefaultLayout>
</template> -->

<script setup>
import { ref, onMounted } from 'vue';
import DefaultLayout from "@/layouts/defaultLayout.vue";
import { userService } from '@/services/userService';

const users = ref([]);
const loading = ref(true); 

const headers = [
  { title: 'ID', key: 'id', align: 'start' },
  { title: 'ชื่อ-นามสกุล', key: 'name' },
  { title: 'อีเมล', key: 'email' },
  { title: 'เบอร์โทรศัพท์', key: 'phone' },
];

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
      <v-calendar></v-calendar>
      <h1 class="mb-4">รายชื่อสมาชิกในระบบ</h1>

      <v-card>
        <v-data-table
          :headers="headers"
          :items="users"
          :loading="loading"
          no-data-text="ไม่พบข้อมูลผู้ใช้งาน"
          class="elevation-1"
        >
          <template v-slot:loading>
            <v-skeleton-loader type="table-row@5"></v-skeleton-loader>
          </template>
        </v-data-table>
      </v-card>

      <v-btn color="primary" class="mt-4" @click="getAllUsers">
        <v-icon start>mdi-refresh</v-icon> รีเฟรชข้อมูล
      </v-btn>
    </v-container>
  </DefaultLayout>
</template>