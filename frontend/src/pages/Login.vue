<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const handleLogin = () => {
  sessionStorage.setItem("isLoggedIn", "true");
  router.push("/home");
}
</script>

<template>
  <v-container fluid class="fill-height" style="min-height: 100vh;">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card width="400" class="mx-auto pa-4" elevation="10">
          <v-card-title class="text-center text-h5"> เข้าสู่ระบบ </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                label="อีเมล"
                type="email"
                prepend-inner-icon="mdi-email"
                variant="outlined"
                persistent-placeholder
              ></v-text-field>

              <v-text-field
                label="รหัสผ่าน"
                type="password"
                prepend-inner-icon="mdi-lock"
                variant="outlined"
                persistent-placeholder
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn
              color="primary"
              size="large"
              variant="elevated"
              @click="handleLogin"
            >
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
