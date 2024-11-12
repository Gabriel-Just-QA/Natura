const puppeteer = require('puppeteer');
const path = require('path');

async function convertHtmlToPdf() {
  const reportHtmlPath = path.join(__dirname, '../cypress/reports/html/index.html');
  const pdfPath = path.join(__dirname, '../cypress/reports/pdf/test-report.pdf');

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto(`file://${reportHtmlPath}`, { waitUntil: 'networkidle0' });

  await page.evaluate(() => {
    const header = document.querySelector('header'); 
    if (header) {
      header.style.display = 'none'; 
    }
  });

  const bodyHandle = await page.$('body');
  const boundingBox = await bodyHandle.boundingBox();
  const contentHeight = boundingBox.height;

  const adjustedHeight = contentHeight + 10; 

  await page.pdf({
    path: pdfPath,
    width: '210mm', 
    height: `${adjustedHeight}px`, 
    printBackground: true,
    margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
  });

  await browser.close();
  console.log('Relatório PDF gerado com sucesso sem páginas em branco ou cabeçalhos indesejados!');
}

convertHtmlToPdf();
