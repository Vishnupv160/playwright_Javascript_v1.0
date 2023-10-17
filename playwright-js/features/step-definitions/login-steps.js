const { Given, When, Then } = require('@cucumber/cucumber');
const { SampleHelper } = require('../../test-helpers/sample-helper');

Given('I am on Home page', async function () {
  const sample_helper = new SampleHelper(this.page);
  await sample_helper.loadApplication();
});

When('Access My Account and Login option', async function () {
  const sample_helper = new SampleHelper(this.page);
  await sample_helper.accessLogin();

});

Then('I See Login page', async function () {
});
