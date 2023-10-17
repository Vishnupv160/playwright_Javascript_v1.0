import { SampleHelper } from '../test-helpers/sample-helper.js';
import { test } from  './prerequisites'

test.describe('LambdaTest Cases', async () => {    
    test('Navigate to URL and click ', async ({ startApplication }) => {
        const sample_helper = new SampleHelper(startApplication);
        await sample_helper.accessLogin();
    });

    test('click on Latest link on the page', async ({ startApplication }) => {
        const sample_helper = new SampleHelper(startApplication);
        await sample_helper.accessLatestLink();
    });
});