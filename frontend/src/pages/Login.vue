<script setup>
import { userService } from "@/services/userService";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { validations as v } from "@/utils/validations"

const router = useRouter();
const loginData = ref({ email: "", password: "" });
const form = ref(null);

const handleLogin = async () => {
  const { valid } = await form.value.validate();
  if (!valid) return;
  
  try{
  const response = await userService.login(loginData.value);
  localStorage.setItem("token", response.data.access_token);
  router.push("/home");
  } catch(error) {
    console.log(error);
  }
};
</script>

<template>
  <v-container fluid class="fill-height" style="min-height: 100vh">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card width="400" class="mx-auto pa-4" elevation="10">
          <v-card-title class="text-center text-h5"> Login </v-card-title>
          <v-card-text>

            <v-form ref="form" @submit.prevent="handleLogin">
              <v-text-field
                v-model="loginData.email"
                label="อีเมล"
                type="email"
                prepend-inner-icon="mdi-email"
                variant="outlined"
                persistent-placeholder
                :rules="v.email"
              ></v-text-field>
              <v-text-field
                v-model="loginData.password"
                label="รหัสผ่าน"
                type="password"
                prepend-inner-icon="mdi-lock"
                variant="outlined"
                persistent-placeholder
                :rules="v.minLength(10)"
              ></v-text-field>

              <v-btn
                justify="center"
                type="submit"
                color="primary"
                size="large"
                variant="elevated"
              >
                Login
              </v-btn>
            </v-form>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
