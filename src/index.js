const fs = require('fs')
const path = require('path')
const generateHtml = require('./generate-html')
const generatePdf = require('./generate-pdf')
const Moment = require('moment')
const MomentRange = require('moment-range');

const config = require('./config')()

const moment = MomentRange.extendMoment(Moment);
moment.locale('nl')

const year = 2021;

async function generate() {
  let startDate = moment(year, 'YYYY')
  let endDate = moment(year + 1, 'YYYY')

  const range = moment().range(startDate, endDate)
  const days = range.by('days');

  let datesInfo = [...days].map((date, index) => {
    return {
      dayName: date.format('dddd'), // Saturday
      day: date.format('DD'), // 10
      monthName: date.format('MMMM'), // January,
      year: date.format('YYYY'), // 2020
      oddOrEven: (index + 1) % 2 == 0 ? 'even' : 'odd' // odd/even
    }
  })

  const htmlGenerator = new generateHtml(config.templateHtmlFile);
  let data = {
    dates: datesInfo
  }
  htmlGenerator.render(data)
  htmlGenerator.saveResultToFile(config.resultHtmlFile)

  const pdfGenerator = await generatePdf();
  await pdfGenerator.generate(config.resultHtmlFile, config.resultPdfFile)
}

generate()