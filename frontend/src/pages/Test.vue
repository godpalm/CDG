<script setup>
import { userService } from "@/services/userService";
import { ref, onMounted } from "vue";
import BackButton from "@/components/BackButton.vue";

const users = ref([]);
const topic = [
  { title: "ID", key: "id", align: "start" },
  { title: "Name", key: "name" },
  { title: "Email", key: "email" },
  { title: "Phone", key: "phone" },
  { title: "Manage", key: "actions" },
];

const deleteUser = async (id) => {
  try {const response = await userService.deleteUser(id);
  console.log(response);
  getUserName();
  } catch (error) {
    console.error(error);
  }
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
  <v-container class="fill height" fluid>
    <center>Test Page</center>
    <BackButton />
    <v-card>
      <v-data-table
        :headers="topic"
        :items="users"
        no-data-text="No users found"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon size="small" color="red" @click="deleteUser(item.id)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
