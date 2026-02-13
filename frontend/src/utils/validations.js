export const validations = {
  required: (msg = 'กรุณากรอกข้อมูล') => v => !!v || msg,
  minLength: (min, msg) => v => (v && v.length >= min) || msg || `ต้องมีความยาวอย่างน้อย ${min} ตัวอักษร`,
  email: (msg = 'รูปแบบอีเมลไม่ถูกต้อง') => v => /.+@.+\..+/.test(v) || msg,
  numeric: (msg = 'ต้องเป็นตัวเลขเท่านั้น') => v => !v || /^[0-9]+$/.test(v) || msg,
  phone: (msg = 'เบอร์โทรศัพท์ไม่ถูกต้อง') => v => !v || (v && v.length >= 9) || msg,
};