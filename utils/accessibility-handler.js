const ExcelJS = require('exceljs');
const fs = require('fs');
const AxeBuilder = require('@axe-core/playwright').default;

class AccessibilityHandler {

  constructor(page) {
    this.page = page;
  }

  /**
   * Method for accessibility testing for entire page
   * @author VISHNU PV
   * @since 09-11-2023
   * @param {*} URL 
   * @param {*} testInfo 
   */
  async trackViolations(testInfo, URL = null) {
    const accessibilityScanResults = await new AxeBuilder({ page: this.page }).analyze();
    const violations = accessibilityScanResults.violations;

    if (violations.length > 0) {
      console.log('Accessibility violations found:');
      console.log(`violations count: ${violations.length}`);
      for (const violation of violations) {
        console.log('****************************************************************')
        console.log(`Violation ID : ${violation.id}`);
        console.log(`Violation description : ${violation.description}`);
        console.log(`Violation impact : ${violation.impact}`);
        console.log(`Violation solution : ${violation.help}`);
        console.log(`Violation solution URL : ${violation.helpUrl}`);
        console.log(`Violation tags : ${violation.tags}`);
        console.log('****************************************************************')
      }
    } else {
      console.log('No accessibility violations found.');
    }
    await testInfo.attach('accessibility-audit-results', {
      body: JSON.stringify(violations, null, 2),
      contentType: 'application/json'
    });
    await this.violationInExcel(accessibilityScanResults,testInfo)
  }

 async violationInExcel(accessibilityScanResults,testInfo,pagename='AccessibilityResults'){
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(pagename);
  worksheet.columns = [
    { header: 'Violation ID', key: 'rule', width: 20 },
    { header: 'Violation Description', key: 'description', width: 40 },
    { header: 'Violation Impact', key: 'impact', width: 15 },
    { header: 'Violation solution', key: 'solution', width: 35 },
    { header: 'Violation solution URL', key: 'solutionURL', width: 20 },

  ];

  accessibilityScanResults.violations.forEach(violation => {
    worksheet.addRow({
      rule: violation.id,
      description: violation.description,
      impact: violation.impact,
      solution: violation.help,
      solutionURL: violation.helpUrl
    });
  });
  const reportDir = './test-results/accessibility-audit/Summary/'
  const excelFileName = reportDir + 'AccessibilityResults.xlsx';
  await fs.mkdirSync(reportDir, { recursive: true });
  await workbook.xlsx.writeFile(excelFileName);

  console.log(`Accessibility results saved to ${excelFileName}`);
  await testInfo.attach(pagename, {
    path: excelFileName,
    contentType: 'text/plain'
  });
 }

}
module.exports = { AccessibilityHandler };