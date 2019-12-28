const path = require("path")

module.exports = function() {
  global.log = console.log

  return {
    templateHtmlFile: path.join(process.cwd(), 'src', 'template.html'),
    resultHtmlFile: path.join(process.cwd(), 'dist', 'result.html'),
    resultPdfFile: path.join(process.cwd(), 'dist', 'result.pdf'),
  }
}