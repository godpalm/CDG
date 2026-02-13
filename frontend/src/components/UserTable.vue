<!-- <script setup>

const props = defineProps({
  userData: {
    type: Array,
    required: true,
    default: () => []
  },
  isLoading: {
    type: Boolean,
    default: false
  }
});

const headers = [
  { title: 'ID', key: 'id', align: 'center' },
  { title: 'ชื่อ-นามสกุล', key: 'name', align: 'center' },
  { title: 'อีเมล', key: 'email', align: 'center' },
  { title: 'เบอร์โทรศัพท์', key: 'phone', align: 'center' },
];
</script>

<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="userData" 
      :loading="isLoading"
      no-data-text="ไม่พบข้อมูลผู้ใช้งาน"
      class="elevation-1"
    >
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@5"></v-skeleton-loader>
      </template>
    </v-data-table>
  </v-card>
</template> -->

<script setup>
const props = defineProps({
  userData: { type: Array, required: true, default: () => [] },
  isLoading: { type: Boolean, default: false },
  showManage: { type: Boolean, default: false } 
});

// 2. ประกาศ Emits เพื่อยิง ID กลับไปหาหน้าแม่
const emit = defineEmits(['edit', 'delete']);

const headers = [
  { title: 'ID', key: 'id', align: 'center' },
  { title: 'ชื่อ-นามสกุล', key: 'name', align: 'center' },
  { title: 'อีเมล', key: 'email', align: 'center' },
  { title: 'เบอร์โทรศัพท์', key: 'phone', align: 'center' },
];

// 3. ถ้าสั่งให้โชว์ Manage ให้ยัด header เข้าไปเพิ่ม
if (props.showManage) {
  headers.push({ title: 'Manage', key: 'actions', align: 'center', sortable: false });
}
</script>

<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="userData" 
      :loading="isLoading"
      no-data-text="ไม่พบข้อมูลผู้ใช้งาน"
      class="elevation-1"
    >
      <template v-if="showManage" v-slot:item.actions="{ item }">
        <div class="d-flex justify-center">
          <v-btn icon="mdi-pencil" variant="text" size="small" color="blue" 
            @click="emit('edit', item.id)"></v-btn>
          <v-btn icon="mdi-delete" variant="text" size="small" color="red" 
            @click="emit('delete', item.id)"></v-btn>
        </div>
      </template>

      <template v-slot:loading>
        <v-skeleton-loader type="table-row@5"></v-skeleton-loader>
      </template>
    </v-data-table>
  </v-card>
</template>