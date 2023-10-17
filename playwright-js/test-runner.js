const config = require('./automation-test-config.cjs');
const { rename } = require('fs');
const { execSync } = require('child_process');
let command
const reportDir = './test-results/';
const oldFilePath = reportDir + 'test-execution-reports/index.html';
if(config.testMethodology == 'TDD' && config.needAllureReport == true){
    command= `npx playwright test  ${config.testcase} --project=${config.browserName} && allure generate ./test-results/allure/allure-results/ -o ./test-results/allure/allure-report --clean && allure open ./test-results/allure/allure-report`;
    console.log ('allure report is generated')
}
else if(config.testMethodology == 'TDD' && (config.needAllureReport == false)) {
    command = `npx playwright test  ${config.testcase} --project=${config.browserName} `;
}
else {
    command = `cucumber-js --tags ${config.bddTags}`;
}
const reportName = `test_automation_report_${new Date().toISOString().replace(/[-:.T]/g, '').slice(0, -4)}.html`;
const newFilePath = reportDir + 'test-execution-reports/' + reportName;

try {
    console.log(command);
    execSync(command, { stdio: 'inherit' });
} catch (error) {
    console.error('Error:', error);
}

rename(oldFilePath, newFilePath, (err) => {
    if (err) throw err;
    console.log('Report File Path ', newFilePath)
});


