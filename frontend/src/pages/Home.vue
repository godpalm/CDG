<script setup>
import DefaultLayout from "@/layouts/defaultLayout.vue";
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
</template>
