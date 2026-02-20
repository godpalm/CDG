import pdfMake from "@/utils/pdf.js";
import { getThaiDate } from "@/utils/pdf.js";
import krut from "@/assets/image.json";
import Swal from "sweetalert2";
import { ref } from "vue";

export const pdfForm = ref({
  project: "โครงการเยาวชนแถวหน้า ครั้งที่ 12",
  projectInfo: "ผลการเรียนดีเด่น และผลงานคลิปสั้น",
  topic:
    'หัวข้อ "พัฒนาอย่างก้าวกระโดด ด้วย Ai เพื่อพัฒนาชีวิตอย่างยั่งยืนในอนาคต"',

  prefix: "นาย",
  name: "ชยพัทร์",
  lastname: "เครือสุคนธ์",
  idCard: "",
  birthDay: "",
  age: "22",
  gpa: "3.10",
  class: "ม.4",
  school: "รร.สตรีวิทยาคม",
  addressId1: "125/14",
  group1: "-",
  alley1: "ตรอก 13 ทดสอบ",
  road1: "นราธิวาส 30",
  district1: "",
  subDistrict1: "",
  province1: "",
  postal1: "",

  addressId2: "125/14",
  group2: "-",
  alley2: "ตรอก 13 ทดสอบ",
  road2: "นราธิวาส 30",
  district2: "",
  subDistrict2: "",
  province2: "",
  postal2: "",

  prefixParent: "นางสาว",
  nameParent: "ทดสอบ",
  lastNameParent: "ใจใจดี",
  idCardParent: "",
  position: "ผู้ใหญ่บ้าน",
  workYear: "1",
  workMonth: "5",
  phoneNumber: "",
  phoneWork: "",
  affiliation: "สังกัดทดสอบ",
  districtParent: "ยานนาวา",
  provinceParent: "",
  postalParent: "10121",

  typeProject: "ผลการเรียนดีเด่น",
  gpax: "4.00",
});

const validateForm = () => {
  const missingFields = [];
  const form = pdfForm.value;

  const requiredKeys = [
    { key: "name", label: "ชื่อ" },
    { key: "lastname", label: "นามสกุล" },
    { key: "idCard", label: "เลขประจำตัวประชาชน" },
    { key: "school", label: "ชื่อสถาบันการศึกษา" },
    { key: "addressId1", label: "บ้านเลขที่" },
    { key: "group1", label: "หมู่ที่" },
    { key: "alley1", label: "ตรอก/ซอย" },
    { key: "road1", label: "ถนน" },
    { key: "subDistrict1", label: "ตำบล/แขวง" },
    { key: "district1", label: "อำเภอ/เขต" },
    { key: "province1", label: "จังหวัด" },
    { key: "postal1", label: "รหัสไปรษณีย์" },
    { key: "addressId2", label: "บ้านเลขที่ (จัดส่งเอกสาร)" },
    { key: "group2", label: "หมู่ที่ (จัดส่งเอกสาร)" },
    { key: "alley2", label: "ตรอก/ซอย (จัดส่งเอกสาร)" },
    { key: "road2", label: "ถนน (จัดส่งเอกสาร)" },
    { key: "subDistrict2", label: "ตำบล/แขวง (จัดส่งเอกสาร)" },
    { key: "district2", label: "อำเภอ/เขต (จัดส่งเอกสาร)" },
    { key: "province2", label: "จังหวัด (จัดส่งเอกสาร)" },
    { key: "postal2", label: "รหัสไปรษณีย์ (จัดส่งเอกสาร)" },
    { key: "nameParent", label: "ชื่อบิดา/มารดา" },
    { key: "lastNameParent", label: "นามสกุลบิดา/มารดา" },
    { key: "idCardParent", label: "เลขประจำตัวประชาชนบิดา/มารดา" },
    { key: "affiliation", label: "สังกัด" },
    { key: "districtParent", label: "อำเภอ/เขต ของบิดา/มารดา" },
    { key: "provinceParent", label: "จังหวัด ของบิดา/มารดา" },
    { key: "postalParent", label: "รหัสไปรษณีย์ ของบิดา/มารดา" },
    { key: "position", label: "ตำแหน่ง" },
    { key: "phoneNumber", label: "โทรศัพท์มือถือ (ส่วนตัว)" },
    { key: "phoneWork", label: "โทรศัพท์ (ที่ทำงาน)" },
    { key: "typeProject", label: "ประเภทผลงานที่สมัคร" },
    { key: "gpax", label: "เกรดเฉลี่ยสะสม" },
  ];

  requiredKeys.forEach((item) => {
    const val = form[item.key];
    if (val === undefined || val === null || val.toString().trim() === "") {
      missingFields.push(item.label);
    }
  });

  const year = parseInt(form.workYear);
  const month = parseInt(form.workMonth);

  if (isNaN(year) || isNaN(month)) {
    missingFields.push("ระยะเวลาปฏิบัติงาน (กรุณาเลือกปีและเดือน)");
  } else if (year === 0 && month === 0) {
    missingFields.push("ระยะเวลาปฏิบัติงาน (ต้องไม่เป็น 0 ปี 0 เดือน)");
  }

  return missingFields;
};

export const generatePDF = () => {
  const missingFields = validateForm();

  if (missingFields.length > 0) {
    Swal.fire({
      icon: "warning",
      title: "ข้อมูลไม่ครบถ้วน",
      html: `<div style="text-align: left;">กรุณาตรวจสอบช่องต่อไปนี้:<br><ul><li>${missingFields.join("</li><li>")}</li></ul></div>`,
      confirmButtonText: "รับทราบ",
      confirmButtonColor: "#1976D2",
    });
    return;
  }

  const fullPatientName = `${pdfForm.value.prefix}${pdfForm.value.name} ${pdfForm.value.lastname}`;
  const fullParentName = `${pdfForm.value.prefixParent}${pdfForm.value.nameParent} ${pdfForm.value.lastNameParent}`;
  const thaiDate = getThaiDate(new Date());

  let displayBirthDay = pdfForm.value.birthDay;
  if (pdfForm.value.birthDay instanceof Date) {
    const d = getThaiDate(pdfForm.value.birthDay);

    const m = String(new Date(pdfForm.value.birthDay).getMonth() + 1).padStart(2, '0');
    displayBirthDay = `${String(d.day).padStart(2, '0')}/${m}/${d.year}`;
  }

  const documentDefinition = {
    pageSize: "A4",
    pageMargins: [60, 60, 60, 60],

    styles: {
      primary: pdfMake.primaryStyle(), 
    },

    content: [

      { image: krut.logo, width: 80, absolutePosition: { x: 40, y: 40 } },

      { text: pdfForm.value.project, style: "primary", bold: true, alignment: "center" },
      { text: pdfForm.value.projectInfo, style: "primary", bold: true, alignment: "center" },
      { text: pdfForm.value.topic, style: "primary", bold:true, alignment: "center", lineHeight: 1.8 },
      {
        text: [
          `วันที่ `,
          { text: `${thaiDate.day} `, bold: true },
          { text: `${thaiDate.month} `, bold: true },
          `พ.ศ. `,
          { text: `${thaiDate.year}`, bold: true },
        ],
        alignment: "right",
        lineHeight: 1.8,
        style: "primary",
      },
      {//1
        style: "primary",
        columnGap: 0,  
        columns: [
          {
            text: [`ชื่อ-นามสกุล  `, { text: fullPatientName, bold: true }],
            width: 270,
            leadingIndent: 60,
          },
          {
            text: [
              `เลขประจำตัวประชาชน `,
              { text: pdfForm.value.idCard, bold: true },
            ],
            width: 195,
          },
        ],
      },
      {//2
        style: "primary",
        columnGap: 0,
        columns: [
          {
            text: [`วัน/เดือน/ปี พ.ศ. เกิด  `, { text: displayBirthDay, bold: true }],
            width: 270,
            leadingIndent: 20,
          },
          {
            text: [
              `อายุ `,
              { text: pdfForm.value.age, bold: true },
              ` ปี (นับตาม พ.ศ.เกิด)`,
            ],
            width: "*",
          },
        ],
      },
      {//3
        style: "primary",
        columnGap: 10,
        columns: [
          {
            text: [`เกรดผลการเรียน `, { text: pdfForm.value.gpa, bold: true }],
            leadingIndent: 20,
            width: 120,
          },
          {
            text: [
              `ระดับชั้นที่เรียน `,
              { text: pdfForm.value.class, bold: true },
            ],
            width: 90,
          },
          {
            text: [
              `ชื่อสถาบันการศึกษา `,
              { text: pdfForm.value.school, bold: true },
            ],
            width: "auto",
          },
        ],
      },
      {//4
        style: "primary",
        columns: [
          {
            text: [`ที่อยู่ตามภูมิลำเนาของผู้สมัครผู้รับทุน`],
            width: 230,
            leadingIndent: 60,
          },
          {
            text: [
              `บ้านเลขที่ `
            ],
            width: 50,
          },
          {
            text: pdfForm.value.addressId1, bold: true,
            width: 45,
          },
          {
            text: [
              `หมู่ที่`
            ],
            width: "auto",
          },
          {
            text: pdfForm.value.group1, bold: true,
            width: "auto",
          },
        ],
      },
      {//5
        style: "primary",
        columnGap: 0,
        columns: [
          {
            text: [
              `ตรอก/ซอย `
            ],
            width: 100,
            leadingIndent: 20,
          },
          {
            text: pdfForm.value.alley1, bold: true,
            width: 150,
          },
          {
            text: [`ถนน      `, { text: pdfForm.value.road1, bold: true }],
            width: 115,
          }
        ],
      },
      {//6
        style: "primary",
        columnGap: 0,
        columns: [
          {
            text: [
              `ตำบล/แขวง `,
              { text: pdfForm.value.subDistrict1, bold: true },
            ],
            width: 170,
            leadingIndent: 20,
          },
          {
            text: [`อำเภอ/เขต `, { text: pdfForm.value.district1, bold: true }],
            width: 150,
          },
          {
            text: [`จังหวัด `, { text: pdfForm.value.province1, bold: true }],
            width: 115,
          },
          { text: pdfForm.value.postal1, bold: true, width: 40},
        ],
      },
      {//7
        style: "primary",
        columns: [
          {
            text: [`ที่อยู่สำหรับจัดส่งเอกสารของผู้สมัครผู้รับทุน`],
            width: 230,
            leadingIndent: 60,
          },
          {
            text: [
              `บ้านเลขที่ `
            ],
            width: 50,
          },
          {
            text: pdfForm.value.addressId2, bold: true,
            width: 45,
          },
          {
            text: [
              `หมู่ที่`
            ],
            width: "auto",
          },
          {
            text: pdfForm.value.group2, bold: true,
            width: "auto",
          },
        ],
      },
      {//8
        style: "primary",
        columnGap: 0,
        columns: [
          {
            text: [
              `ตรอก/ซอย `
            ],
            width: 100,
            leadingIndent: 20,
          },
          {
            text: pdfForm.value.alley2, bold: true,
            width: 150,
          },
          {
            text: [`ถนน      `, { text: pdfForm.value.road2, bold: true }],
            width: 115,
          }
        ],
      },
      {//9
        style: "primary",
        columnGap: 0,
        columns: [
          {
            text: [
              `ตำบล/แขวง `,
              { text: pdfForm.value.subDistrict2, bold: true },
            ],
            width: 170,
            leadingIndent: 20,
          },
          {
            text: [`อำเภอ/เขต `, { text: pdfForm.value.district2, bold: true }],
            width: 150,
          },
          {
            text: [`จังหวัด `, { text: pdfForm.value.province2, bold: true }],
            width: 115,
          },
          { text: pdfForm.value.postal2, bold: true, width: 40},
        ],
      },
      {//10-12
        style: "primary",
        margin: [20, 0, 0, 0],
        columns: [
          { text: `ข้อมูลของบิดาหรือมารดา (บุคลากรประเภทข้าราชการ ลูกจ้างประจำ พนักงานราชการ สมาชิกกองอาสารักษาดินแดน กำนัน ผู้ใหญ่บ้าน และลูกจ้างเหมาบริการ ที่ปฏิบัติงานติดต่อกันมาแล้วไม่น้อยกว่า 1 ปี นับถึงวันปิดรับสมัครของกรมการปกครอง)`,
            leadingIndent: 40,
            width: 466,
          },
        ],
      },
      {//13
        style: "primary",
        columns: [
          {
            text: [`ชื่อ-สกุล  `, { text: fullParentName, bold: true }],
            width: 210,
            leadingIndent: 20,
          },
          {
            text: [
              `เลขประจำตัวประชาชน `,
              { text: pdfForm.value.idCardParent, bold: true },
            ],
            width: "*",
            leadingIndent: 20,
          },
        ],
      },
      {//14
        style: "primary",
        columns: [
          {
            text: [`ปัจจุบันดำรงตำแหน่ง     `, { text: pdfForm.value.position, bold: true }],
            width: 230,
            leadingIndent: 20,
          },
          {
            text: [
              `ระยะเวลาปฏิบัติงาน `,
            ],
            width: 95,
          },
          { 
            text: [{text: pdfForm.value.workYear, bold: true},` ปี `, {text: pdfForm.value.workMonth, bold: true}, ` เดือน`],
          },
        ],
      },
      {//15
        style: "primary",
        columns: [
          {
            text: [`โทรศัพท์มือถือ (ส่วนตัว)  `, { text: pdfForm.value.phoneNumber, bold: true }],
            width: 270,
            leadingIndent: 20,
          },
          {
            text: [`โทรศัพท์ (ที่ทำงาน)         `, { text: pdfForm.value.phoneWork, bold: true }],
            width: "auto",
          },
        ],
      },
      {//16
        style: "primary",
        columnGap: 0,
        columns: [
          {
            text: [
              `สังกัด `,
              { text: pdfForm.value.affiliation, bold: true },
            ],
            width: 170,
            leadingIndent: 20,
          },
          {
            text: [`อำเภอ/เขต `, { text: pdfForm.value.districtParent, bold: true }],
            width: 150,
          },
          {
            text: [`จังหวัด `, { text: pdfForm.value.provinceParent, bold: true }],
            width: 115,
          },
          { text: pdfForm.value.postalParent, bold: true, width: 40},
        ],
      },
      {//17
        style: "primary",
        leadingIndent: 20,
        lineHeight: 5.4,
        columns: [
          { 
            text: [`ประสงค์สมัครและส่งผลงานประกวดประเภท `,{ text: `${pdfForm.value.typeProject}`, bold: true }, ` เกรดเฉลี่ยสะสม `,{ text: `${pdfForm.value.gpax}`, 
            bold: true }] 
          },
        ],
      },
      [{//stack signature
        bold: true,
        style: "primary",
        stack: [
          {
            width: '*', 
            stack: [
              { text: `ลายมือชื่อ .............................................. ผู้สมัคร`},
              { text: `(${fullPatientName})`}
            ],
            alignment: 'center'
          },
          {
            width: '*', 
            stack: [
              { text: `ลายมือชื่อ ................................................... เจ้าหน้าที่ผู้รับคำขอ`, leadingIndent: 50 },
              { text: `(นางสาวเจ้าหน้าที่ ทดสอบ)`},
              { text: `เจ้าหน้าที่อำเภอ`}
            ],
            alignment: 'center'
          }
          ]
        }
      ],
    ]
  };

  pdfMake.pdfPrintPreview(documentDefinition);
};

