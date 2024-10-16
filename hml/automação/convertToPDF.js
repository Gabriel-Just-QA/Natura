const puppeteer = require('puppeteer');
const path = require('path');

async function convertHtmlToPdf() {
  const reportHtmlPath = path.join(__dirname, '../cypress/reports/html/index.html');
  const pdfPath = path.join(__dirname, '../cypress/reports/pdf/test-report.pdf');

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Carregue a página HTML
  await page.goto(`file://${reportHtmlPath}`, { waitUntil: 'networkidle0' });

  // Remova o cabeçalho se necessário
  await page.evaluate(() => {
    const header = document.querySelector('header'); // Altere 'header' para o seletor correto
    if (header) {
      header.style.display = 'none'; // Oculta o cabeçalho
    }
  });

  // Pegue o tamanho total do conteúdo da página
  const bodyHandle = await page.$('body');
  const boundingBox = await bodyHandle.boundingBox();
  const contentHeight = boundingBox.height;

  // Adicione 10 pixels à altura calculada
  const adjustedHeight = contentHeight + 10; // Ajuste a altura com 10 pixels extras

  await page.pdf({
    path: pdfPath,
    width: '210mm', // largura A4
    height: `${adjustedHeight}px`, // ajusta a altura
    printBackground: true,
    margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
  });

  await browser.close();
  console.log('Relatório PDF gerado com sucesso sem páginas em branco ou cabeçalhos indesejados!');
}

convertHtmlToPdf();
