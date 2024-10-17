//  Compasso@123
// mailgun, sendgrid
// D6JV1LVED927T2C3HQTEU3KF
// W2LVBRT4L9GLU94LNPXA6HVU

// gabriel.qa.teste@gmail.com

// Compasso@Teste!
// b595026b80685ab1cdb17f55d1dc78b3
// 27e165bad6901e5c40879fab47ff84d3


const nodemailer = require('nodemailer');
const path = require('path');

async function sendEmail() {
  const transporter = nodemailer.createTransport({
    host: 'in-v3.mailjet.com', // SMTP server address
    port: 587 , // or 465 for SSL
    secure: false, // true for 465, false for other ports
    auth: {
      user: '659ba2fe5b2700a2044c3f226eb96025', // seu email
      pass: 'd4a6ebfd44fd6a1252f414b16c987beb', // sua senha
    },
  });
  const htmlReportPath = path.join(__dirname, '../cypress/reports/html/index.html');
  const pdfReportPath = path.join(__dirname, '../cypress/reports/pdf/test-report.pdf');

  const mailOptions = {
    from: 'gabriel.qa.teste@gmail.com',
    to: 'gabrieljust123@gmail.com,gabriel.qa.teste@gmail.com',//  
    subject: 'Relatório de Testes', // Assunto do e-mail
    text: 'Enviando os relatórios de teste.', // Texto padrão do e-mail
    html: `<h1>Relatório de Testes e2e</h1>
           <p>Data: ${new Date().toLocaleString()}</p>
           <p>O relatório dos testes estão em anexo!</p>`, // Mensagem em HTML
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
