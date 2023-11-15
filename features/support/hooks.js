const config = require('../../automation-test-config.cjs');
const { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout, AfterStep } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('playwright');

let browser;
const screenshotsDir = 'test-results/screenshot-video/'

setDefaultTimeout(config.testTimeOut*1000);
BeforeAll(async function () {
const commonBrowserOptions = {
  headless: config.needHeadlessExecution,
  slowMo: config.slowExecutionSpeed,
};
switch (config.browserName) {
  case 'firefox':
    browser = await firefox.launch({
      ...commonBrowserOptions,
      firefoxUserPrefs: {
        'media.navigator.streams.fake': true,
        'media.navigator.permission.disabled': true,
      },
    });
    break;
  case 'webkit':
    browser = await webkit.launch(commonBrowserOptions);
    break;
  default:
    browser = await chromium.launch({
      ...commonBrowserOptions,
      args: [
        '--use-fake-ui-for-media-stream',
        '--use-fake-device-for-media-stream',
        '--no-sandbox',
        '--disable-dev-shm-usage',
      ],
    });
    console.log('*************************************************');
}

});
Before({ tags: '@ignore' }, async function () {
  console.log('ignored as per the tag setup');
  return 'skipped';
});

Before({ tags: '@debug' }, async function () {
  console.log('debug mode is enabled as per the tag setup');
  this.debug = true;
});

Before(async function ({ pickle }) {
this.startTime = new Date();
this.testName = pickle.name.replace(/\W/g, '-');
console.log('*********************************************************************************************');
this.context = await browser.newContext({
  acceptDownloads: true,
  recordVideo: config.needVideoRecording ? { dir: screenshotsDir } : undefined,
  viewport: { width: 1200, height: 800 },
});

this.page = await this.context.newPage();
this.page.on('console', async (msg) => {
  if (msg.type() === 'log') {
    await this.attach(msg.text());
  }
});

this.feature = pickle;
});

AfterStep(async function(){
  if(config.needVisualStepsInReport){
    const image = await ((_b = this.page) === null || _b === void 0 ? void 0 : _b.screenshot());
    image && ( await this.attach(image, 'image/png'));
  }
})

After(async function ({ result }) {
var _a, _b, _c, _d, _e, _f;
if (result) {
  await this.attach(
    `Status: ${result === null || result === void 0 ? void 0 : result.status}. Duration:${
      (_a = result.duration) === null || _a === void 0 ? void 0 : _a.seconds
    }s`,
  );

  if (result.status !== Status.PASSED && config.needScreenshotOnTestFailure) {
    const image = await ((_b = this.page) === null || _b === void 0 ? void 0 : _b.screenshot());
    image && (await this.attach(image, 'image/png'));
  }
}
await ((_e = this.page) === null || _e === void 0 ? void 0 : _e.close());
await ((_f = this.context) === null || _f === void 0 ? void 0 : _f.close());
});

AfterAll(async function () {
await browser.close();
});