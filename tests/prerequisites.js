const { test, expect } = require("@playwright/test");
import { WebActions } from '../keywords/web-actions';
import { applicationURL } from "../automation-test-config.cjs";

exports.expect =expect
exports.test = test.extend({
    startApplication: async ({page},use)=>{
        const web_action = new WebActions(page);
        await web_action.loadWebApplication(applicationURL);
        await use(page);
    },
})