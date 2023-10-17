const config = {
    testMethodology: 'TDD',    //values will be BDD or TDD
    bddTags: '@smoke',          //'@Regression','@smoke','@Regression and @smoke','@Regression or @smoke'
    applicationURL: 'https://ecommerce-playground.lambdatest.io/',
    browserName: 'chromium', //values will be chromium, firefox, webkit, Mobile Chrome, Mobile Safari, Microsoft Edge, Google Chrome
    testcase: "sample-api-tests.spec.js sample-ui-tests.spec.js",
    needHeadlessExecution: false,
    needParallelExecution: false,
    needVideoRecording: false,
    needVisualStepsInReport: false,
    needScreenshotOnTestFailure: true,
    needAllureReport: false,
    slowExecutionSpeed: 3,
    actionTimeOut: 30,
    testTimeOut: 60,
    locale: 'en-US',
    timeZone: 'Asia/Kolkata',
    longitude: 0,
    latitude: 0,
    reportType: 'html',
};
module.exports = config