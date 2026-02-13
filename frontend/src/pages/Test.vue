<script setup>
import { userService } from "@/services/userService";
import { ref, onMounted } from "vue";
import BackButton from "@/components/BackButton.vue";
import DefaultLayout from "@/layouts/defaultLayout.vue";
import router from "@/router";

const users = ref([]);
const topic = [
  { title: "ID", key: "id", align: "start" },
  { title: "Name", key: "name" },
  { title: "Email", key: "email" },
  { title: "Phone", key: "phone" },
  { title: "Manage", key: "actions" },
];
const selectedId = ref(null);
const dialog = ref(false);

const openDialog = (id) => {
  selectedId.value = id;
  dialog.value = true;
};

const deleteUser = async () => {
  try {
    const response = await userService.deleteUser(selectedId.value);
    console.log(response);
    getUserName();
    dialog.value = false;
  } catch (error) {
    console.error(error);
  }
};

const editUser = async (id) => {
  router.push(`/edit/${id}`);
};

const getUserName = async () => {
  try {
    const response = await userService.getAll();
    console.log(response);
    users.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getUserName();
});
</script>

<template>
  <DefaultLayout>
    <v-container>
      <UserTable 
        :userData="users" 
        :isLoading="false" 
        show-manage 
        @edit="editUser" 
        @delete="openDialog" 
      />

      <v-dialog v-model="dialog" max-width="400">
        <v-card>
          <v-card-title class="text-h5">ยืนยันการลบ</v-card-title>
          <v-card-text>
            คุณแน่ใจหรือไม่ที่จะลบรายการนี้? ข้อมูลจะหายไปจากระบบทันที
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey" variant="text" @click="dialog = false">ยกเลิก</v-btn>
            <v-btn color="red" variant="elevated" @click="deleteUser">ยืนยันการลบ</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </DefaultLayout>
</template>