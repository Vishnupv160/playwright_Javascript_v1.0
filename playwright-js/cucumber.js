const common = `
  --require features/**/*.js
  --format json:test-results/test-execution-reports/report.json 
  --format message:test-results/test-execution-reports/report.json
  --format html:test-results/test-execution-reports/index.html
  --format summary 
  --format progress-bar 
  --format @cucumber/pretty-formatter
  --format-options ${JSON.stringify({ snippetInterface: 'async-await' })}
  `;
module.exports = {
  default: `${common} `,
};