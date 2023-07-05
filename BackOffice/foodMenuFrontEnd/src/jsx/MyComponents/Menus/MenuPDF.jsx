import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const MenuPDF = () => {
  const generatePDF = () => {
    const documentDefinition = {
      content: [
        {
          text: 'Customized PDF',
          style: 'header',
        },
        {
          text: 'Hello, World!',
          style: 'content',
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          marginBottom: 10,
        },
        content: {
          fontSize: 12,
          marginBottom: 8,
        },
      },
    };

    pdfMake.createPdf(documentDefinition).open();
  };

  return (
    <div>
      <h1>Generate Customized PDF</h1>
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default MenuPDF;