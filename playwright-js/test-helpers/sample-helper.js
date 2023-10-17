const {applicationURL} = require('../automation-test-config.cjs');
const {WebActions} = require('../keywords/web-actions');
const {LambdaTestObjects} = require('../test-objects/sample-objects');
const {UIActions} = require('../keywords/ui-actions');
const Validations = require('../keywords/validations');
const {Utilities} = require('../keywords/utilities');

const lambda_obj = new LambdaTestObjects();

class SampleHelper {
    constructor(page) {
        this.page = page;
        this.util_action = new Utilities(page);
        this.web_action = new WebActions(page);
        this.validation_action = new Validations(page);
        this.ui_action = new UIActions(page);
    }
    /**
     * Method to load the application URL
     * @author Sanoj Swaminathan
     * @since 21-09-2023
     */
    async loadApplication() {
        await this.web_action.loadWebApplication(applicationURL);
    }

    /**
     * Method to access Login
     * @author Sanoj Swaminathan
     * @since 21-09-2023
     */
    async accessLogin() {
        await this.ui_action.hoverAnElement(lambda_obj.lbl_account);
        await this.ui_action.tap(lambda_obj.txt_login);
        await this.validation_action.verifyEquals('Account Login', await this.web_action.getWebApplicationTitle())
        await this.ui_action.tap(lambda_obj.ico_logo);
    }

    /**
     * Method to access Latest link
     * @author Sanoj Swaminathan
     * @since 21-09-2023
     */
    async accessLatestLink() {
        await this.util_action.delay(2);
        await this.ui_action.tap(lambda_obj.lnk_latest);
    }
}
module.exports = { SampleHelper };


