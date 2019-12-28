const handlebars = require('handlebars');
const helpers = require('handlebars-helpers')();
const fs = require('fs');

handlebars.registerHelper(helpers)

module.exports = function(templateFile) {
  this._html = null
  this._template = null
  
  let source = fs.readFileSync(templateFile, 'utf-8');
  this._template = handlebars.compile(source);
  console.log('Template loaded and compiled.');

  this.render = function(data) {
    this._html = this._template(data);
    console.log('Rendered template with data.');
  }

  this.saveResultToFile = function(resultFile) {
    fs.writeFileSync(resultFile, this._html);
    console.log('Finished writing html to file.');
  }
}