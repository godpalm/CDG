import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from '@/assets/fonts/th-sarabun.js'

pdfMake.vfs = pdfFonts
pdfMake.fonts = {
  Roboto: {
    normal: 'THSarabun.woff',
    bold: 'THSarabunBold.woff',
  },
  THSarabun: {
    normal: 'THSarabun.woff',
    bold: 'THSarabunBold.woff',
  },
  THSarabunIT9: {
    normal: 'THSarabunIT9.woff',
    bold: 'THSarabunIT9Bold.woff',
  },
}

const primaryStyle = () => {
  return {
    font: 'THSarabun',
    fontSize: 16,
    lineHeight: 1.3,
    columnGap: 20,
  }
}

const tableStyle = () => {
  return {
    font: 'THSarabun',
    fontSize: 16,
    lineHeight: 1.3,
    columnGap: 20,
    bold: true,
    alignment: 'center',
  }
}

const pdfPrintPreview = (content) => {
  const pdfDocGenerator = window.pdfMake.createPdf(content)
  pdfDocGenerator.getBlob((blob) => {
    const pdfPreview = document.getElementById('pdfPreview')
    if (pdfPreview) {
      pdfPreview.remove()
    }
    const iframe = document.createElement('iframe')
    iframe.id = 'pdfPreview'
    iframe.style.display = 'none'
    iframe.src = URL.createObjectURL(blob)
    document.body.appendChild(iframe)
    iframe.contentWindow.focus()
    iframe.contentWindow.print()
  })
}

export const getThaiDate = (dateString) => {
  const months = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];
  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear() + 543;
  return { day, month, year };

};

export default {
  primaryStyle,
  pdfPrintPreview,
  tableStyle,
  getThaiDate,
}
