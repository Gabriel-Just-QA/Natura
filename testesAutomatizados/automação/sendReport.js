const nodemailer = require('nodemailer');
const path = require('path');

async function sendEmail() {
  const transporter = nodemailer.createTransport({
    host: 'in-v3.mailjet.com', 
    port: 587 , 
    secure: false,
    auth: {
      user: '659ba2fe5b2700a2044c3f226eb96025',
      pass: 'd4a6ebfd44fd6a1252f414b16c987beb',
    },
  });
  const htmlReportPath = path.join(__dirname, '../cypress/reports/html/index.html');
  const pdfReportPath = path.join(__dirname, '../cypress/reports/pdf/test-report.pdf');

  const mailOptions = {
    from: 'gabriel.qa.teste@gmail.com',
    to: 'gabrieljust123@gmail.com,gabriel.qa.teste@gmail.com',//  Lista de emails que o relatorio é mandadao
    subject: 'Relatório de Testes', 
    text: 'Enviando os relatórios de teste.',
    html: `<h1>Relatório de Testes e2e</h1>
           <p>Data: ${new Date().toLocaleString()}</p>
           <p>O relatório dos testes estão em anexo!</p>`,
    attachments: [
      {
        filename: 'index.html',
        path: htmlReportPath,
      },
      {
        filename: 'test-report.pdf',
        path: pdfReportPath,
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado: %s', info.messageId);
  } catch (error) {
    console.error('Erro ao enviar o email:', error);
  }
}

sendEmail();
