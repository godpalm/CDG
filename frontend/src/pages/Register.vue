<script setup>
import { ref } from 'vue';
import { userService } from '@/services/userService';

const user = ref({
  name: '',
  email: '',
  password: '',
  phone: ''
});

const registerUser = async () => {
  try {
    const response = await userService.register(user.value);
    alert('ลงทะเบียนสำเร็จ! ID: ' + response.data.id);
    
    user.value = { name: '', email: '', password: '', phone: '' };
  } catch (error) {
    console.error('เกิดข้อผิดพลาด:', error);
    alert(error.response?.data?.message || 'เชื่อมต่อเซิร์ฟเวอร์ไม่ได้');
  }
};
</script>

<template>
  <div class="register-container">
    <h2>สมัครสมาชิก (Register)</h2>
    <form @submit.prevent="registerUser">
      <input v-model="user.name" placeholder="ชื่อ" required /><br />
      <input v-model="user.email" type="email" placeholder="อีเมล" required /><br />
      <input v-model="user.password" type="password" placeholder="รหัสผ่าน" required /><br />
      <input v-model="user.phone" placeholder="เบอร์โทรศัพท์" /><br />
      <button type="submit">บันทึกข้อมูล</button>
    </form>
  </div>
</template>

<style scoped>
.register-container { max-width: 300px; margin: 20px auto; text-align: center; }
input { margin-bottom: 10px; width: 100%; padding: 8px; }
button { width: 100%; padding: 10px; background-color: #42b983; color: white; border: none; cursor: pointer; }
</style>