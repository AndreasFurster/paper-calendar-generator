const fs = require('fs')
const path = require('path')
const generateHtml = require('./generate-html')
const generatePdf = require('./generate-pdf')

const config = require('./config')()

async function generate() {
  const htmlGenerator = new generateHtml(config.templateHtmlFile);
  // TODO: get data
  let data = {
    dates: [
      { day: 10, month: 'January'},
      { day: 11, month: 'January'}
    ]
  }
  htmlGenerator.render(data)
  htmlGenerator.saveResultToFile(config.resultHtmlFile)

  const pdfGenerator = await generatePdf();
  await pdfGenerator.generate(config.resultHtmlFile, config.resultPdfFile)
}

generate()