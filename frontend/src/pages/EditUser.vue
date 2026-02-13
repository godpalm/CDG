<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { userService } from "@/services/userService";
import BackButton from "@/components/BackButton.vue";
import DefaultLayout from "@/layouts/defaultLayout.vue";
import { validations as v } from "@/utils/validations";

const route = useRoute();
const router = useRouter();
const form = ref(null);
const loading = ref(false);

const user = ref({
  name: "",
  email: "",
  password: "",
  phone: "",
});

const nameRules = [v.required("ชื่อห้ามว่าง"), v.minLength(3)];
const emailRules = v.email;
const phoneRules = [v.numeric(), v.phone()];

const updateUser = async () => {
  const { valid } = await form.value.validate();
  if (!valid) return;
  try {
    loading.value = true;
    const userId = route.params.id;
    await userService.editUser(userId, user.value);
    alert("แก้ไขข้อมูลสำเร็จ!");
    router.push("/test");
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "แก้ไขข้อมูลไม่สำเร็จ");
  } finally {
    loading.value = false;
  }
};

const getOldUser = async () => {
  try {
    const userId = route.params.id;
    const response = await userService.getById(userId);
    user.value = {
      name: response.data.name,
      email: response.data.email,
      phone: response.data.phone,
      password: "",
    };
  } catch (error) {
    console.error(error);
    alert("ไม่พบข้อมูลผู้ใช้");
    router.push("/test");
  }
};

onMounted(getOldUser);
</script>

<template>
  <DefaultLayout>
    <v-container class="fill-height" fluid>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="pa-4 shadow-lg">
            <BackButton />
            <v-card-title class="text-h5 text-center">
              Edit User <v-icon>mdi-account-edit</v-icon>
            </v-card-title>
            <v-card-text>
              <v-form ref="form" @submit.prevent="updateUser">
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
                  hint="อีเมลแก้ไขไม่ได้"
                  persistent-hint
                ></v-text-field>

                <v-text-field
                  v-model="user.password"
                  label="รหัสผ่านใหม่ (ปล่อยว่างถ้าไม่เปลี่ยน)"
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
                  :loading="loading"
                >
                  บันทึกการแก้ไข
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </DefaultLayout>
</template>
