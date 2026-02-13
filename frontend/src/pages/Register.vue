<script setup>
import { ref } from 'vue';
import { userService } from '@/services/userService';
import BackButton from '@/components/BackButton.vue';
import DefaultLayout from '@/layouts/defaultLayout.vue';
import { validations as v } from "@/utils/validations";
import { useRouter } from 'vue-router';

const router = useRouter();

const user = ref({
  name: '',
  email: '',
  password: '',
  phone: ''
});

const form = ref(null); 

const nameRules = [v.required("ชื่อห้ามว่าง"), v.minLength(3)];
const emailRules = v.email;
const passwordRules = [v.minLength(8, "ถ้าจะเปลี่ยน รหัสต้อง 8 ตัวขึ้นไป")];
const phoneRules = [v.numeric(), v.phone()];

const registerUser = async () => {
  const { valid } = await form.value.validate();
  if (!valid) return;
  try {
    const response = await userService.register(user.value);
    alert('ลงทะเบียนสำเร็จ! ID: ' + response.data.id);
    user.value = { name: '', email: '', password: '', phone: '' };
    form.value.resetValidation(); 
    router.push('/home');

  } catch (error) {
    console.error('เกิดข้อผิดพลาด:', error);
    alert(error.response?.data?.message || 'เชื่อมต่อเซิร์ฟเวอร์ไม่ได้');
  }
};

</script>

<template>
  <DefaultLayout>
  <v-container class="fill-height" fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="pa-4 shadow-lg">
          <BackButton />
          <v-card-title class="text-h5 text-center">สมัครสมาชิก</v-card-title>
          <v-card-text>
            <v-form ref="form" @submit.prevent="registerUser">
              
              <v-text-field
                v-model="user.name"
                label="ชื่อ"
                :rules="nameRules"
                prepend-inner-icon="mdi-account"
                variant="outlined"
              ></v-text-field>

              <v-text-field
                v-model="user.email"
                label="อีเมล"
                type="email"
                :rules="emailRules"
                prepend-inner-icon="mdi-email"
                variant="outlined"
              ></v-text-field>

              <v-text-field
                v-model="user.password"
                label="รหัสผ่าน"
                type="password"
                :rules="passwordRules"
                prepend-inner-icon="mdi-lock"
                variant="outlined"
              ></v-text-field>

              <v-text-field
                v-model="user.phone"
                label="เบอร์โทรศัพท์"
                :rules="phoneRules"
                prepend-inner-icon="mdi-phone"
                variant="outlined"
              ></v-text-field>

              <v-btn
                type="submit"
                color="success"
                block
                size="large"
                class="mt-4"
              >
                บันทึกข้อมูล
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  </DefaultLayout>
</template>