import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { VDateInput } from 'vuetify/labs/VDateInput'
import { VMaskInput } from 'vuetify/labs/VMaskInput'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'system',
  },
  components: {
    VDateInput,
    VMaskInput,
  },
})
