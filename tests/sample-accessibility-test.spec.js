import { test } from  './prerequisites';
const {Utilities} = require('../keywords/utilities');

test('should not have any automatically detectable accessibility issues', async ({startApplication},testInfo) => {
  const util_action = new Utilities(startApplication);
  await util_action.startAccessiblityAudit(testInfo,'https://www.saucedemo.com/v1/');
});



