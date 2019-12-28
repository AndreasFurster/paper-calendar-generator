const puppeteer = require('puppeteer');

const pdfOptions = {
  printBackground: true,
  scale: 1,
  format: 'a4'
}

module.exports = pdfGenerator;

async function pdfGenerator() {
  this._browser = await puppeteer.launch({
    headless: true
  });

  this._page = await this._browser.newPage();

  var requestCounter = 0;
  this._page.on('requestfinished', request => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`Requests finished: ${++requestCounter}`);
  });

  this._page.on('requestfailed', request => {
    console.log(`Request failed: ${request.url()}`);
  });

  this.generate = async function(htmlFile, pdfPath) {
    await this._page.goto(htmlFile, {
      waitUntil: 'networkidle0',
      timeout: 0
    });
    console.log('');

    pdfOptions.path = pdfPath

    console.log('Generating and storing pdf...');
    await this._page.pdf(pdfOptions);
    console.log('Generated and stored pdf.');
  
    console.log('Closing browser...');
    await this._browser.close();
    console.log('Browser closed.');
  }

  return this
}