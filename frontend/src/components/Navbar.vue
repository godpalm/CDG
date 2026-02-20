<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { userService } from '@/services/userService';

const router = useRouter();
const drawerLeft = ref(false);  
const drawerRight = ref(false); 
const form = ref(null);
const dataLogin = ref({ email: "", password: "" })

const authMode = ref('');

const handleLoginDrawer = async () => {
  const { valid } = await form.value.validate();
  if (!valid) return;

  try{
  const response = await userService.login(dataLogin.value);
  localStorage.setItem('token', response.data.access_token);
  }
  catch(error){
    console.log(error);
  }
};

const openLoginDrawer = () => {
  authMode.value = 'login';
  drawerRight.value = true;
};

const user = ref({
  name: '',
  email: '',
  password: '',
  phone: ''
});

const registerUser = async () => {
  const { valid } = await form.value.validate();
  if (!valid) return;
  try {
    const response = await userService.register(user.value);
    alert('ลงทะเบียนสำเร็จ! ID: ' + response.data.id);
    user.value = { name: '', email: '', password: '', phone: '' };
    form.value.resetValidation(); 
  } catch (error) {
    console.error('เกิดข้อผิดพลาด:', error);
    alert(error.response?.data?.message || 'เชื่อมต่อเซิร์ฟเวอร์ไม่ได้');
  }
};

const nameRules = [
  v => !!v || 'กรุณากรอกชื่อ-นามสกุล',
  v => (v && v.length >= 3) || 'ชื่อต้องมีความยาวอย่างน้อย 3 ตัวอักษร'
];

const emailRules = [
  v => !!v || 'กรุณากรอกอีเมล',
  v => /.+@.+\..+/.test(v) || 'รูปแบบอีเมลไม่ถูกต้อง' 
];

const passwordRules = [
  v => !!v || 'กรุณากรอกรหัสผ่าน',
  v => (v && v.length >= 8) || 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร'
];

const phoneRules = [
  v => !v || /^[0-9]+$/.test(v) || 'เบอร์โทรศัพท์ต้องเป็นตัวเลขเท่านั้น',
  v => !v || (v && v.length >= 9) || 'เบอร์โทรศัพท์ไม่ถูกต้อง'
];
</script>

<template>
  <v-navigation-drawer v-model="drawerLeft" temporary location="left">
    <v-list-item title="ภาษา" subtitle="Menu" class="pa-4 font-weight-bold"></v-list-item>
    <v-divider></v-divider>
    <v-list>
      <v-list-item title="ภาษาไทย" prepend-icon="mdi-translate" @click="drawerLeft = false"></v-list-item>
      <v-list-item title="English" prepend-icon="mdi-alphabetical" @click="drawerLeft = false"></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-navigation-drawer v-model="drawerRight" temporary location="right" width="350">
    <div v-if="authMode === 'login'" class="pa-6">
      <div class="d-flex justify-space-between align-center mb-6">
        <h2 class="text-h5 font-weight-bold">เข้าสู่ระบบ</h2>
        <v-btn icon="mdi-close" variant="text" @click="drawerRight = false"></v-btn>
      </div>
      <v-form ref="form" @submit.prevent="handleLoginDrawer">
      <v-text-field v-model="dataLogin.email" label="อีเมล" variant="outlined" class="mb-2" density="comfortable"></v-text-field>
      <v-text-field v-model="dataLogin.password" label="รหัสผ่าน" type="password" variant="outlined" density="comfortable"></v-text-field>
      <v-btn color="black" block size="large" class="mt-4" type="submit">Login</v-btn>
      </v-form>

      <p class="text-center mt-6 text-body-2">
        ยังไม่มีบัญชีใช่ไหม? 
        <span class="text-primary cursor-pointer font-weight-bold" @click="authMode = 'register'">สมัครสมาชิก</span>
      </p>
    </div>

    <div v-else class="pa-6">
      <div class="d-flex justify-space-between align-center mb-6">
        <h2 class="text-h5 font-weight-bold">สมัครสมาชิก</h2>
        <v-btn icon="mdi-close" variant="text" @click="drawerRight = false"></v-btn>
      </div>
        <v-form ref="form" @submit.prevent="registerUser">
          <v-text-field v-model="user.name" label="ชื่อ-นามสกุล" variant="outlined" class="mb-2" density="comfortable" :rules="nameRules"></v-text-field>
          <v-text-field v-model="user.email" label="อีเมล" variant="outlined" class="mb-2" density="comfortable" :rules="emailRules"></v-text-field>
          <v-text-field v-model="user.password" label="รหัสผ่าน" type="password" variant="outlined" density="comfortable" :rules="passwordRules"></v-text-field>
          <v-text-field v-model="user.phone" label="เบอร์โทรศัพท์" variant="outlined" class="mb-2" density="comfortable" :rules="phoneRules"></v-text-field>
          <v-btn color="primary" block size="large" class="mt-4" type="submit">สร้างบัญชี</v-btn>
        </v-form>
        <p class="text-center mt-6 text-body-2">
        มีบัญชีอยู่แล้ว? 
        <span class="text-primary cursor-pointer font-weight-bold" @click="authMode = 'login'">เข้าสู่ระบบ</span>
      </p>
    </div>
  </v-navigation-drawer>

  <v-app-bar color="black" elevation="2" absolute>
    <v-btn variant="text" @click="drawerLeft = !drawerLeft" class="ml-2">
      <v-icon start icon="mdi-earth"></v-icon>
      ภาษา
    </v-btn>

    <v-spacer></v-spacer>
    <p class="font-weight-black text-h6" @click="router.push('/home')" style="cursor:pointer">IKEA</p>
    <v-spacer></v-spacer>

    <v-btn variant="text" @click="openLoginDrawer" class="mr-2">
      <v-icon start icon="mdi-account-circle"></v-icon>
      Login
    </v-btn>
  </v-app-bar>

  <v-app-bar color="white" density="compact" elevation="1" absolute style="top: 64px;">
    <v-tabs color="primary" align-tabs="start" fixed-tabs>
      <v-tab to="/home">Home</v-tab>
      <v-tab to="/register">Registering</v-tab>
      <v-tab to="/login">Login</v-tab>
      <v-tab to="/test">Test</v-tab>
      <v-tab to="/pdf">PDF Maker</v-tab>
    </v-tabs>
  </v-app-bar>
</template>