const { WebActions } = require('./web-actions');
const { expect } = require("@playwright/test");
const assert = require('assert');
const fs = require('fs');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');

class Validations {
    constructor(page) {
        this.page = page;
        this.web_actions = new WebActions(this.page)
    }

    /**
     * Method to verify element is visible
     * @author VISHNU PV
     * @since 14-09-2023
     * @param {*} selector 
     * @returns 
     */
    async verifyElementVisible(selector) {
        try {
            const elementHandle = await this.page.$(selector);
            if (elementHandle) {
                const isVisible = await elementHandle.isVisible();
                expect(isVisible).toBe(true);
                console.log("==========================================================");
                console.log('Element is currently visible on the page');
            }
        }
        catch (error) {
            console.log("==========================================================");
            console.error('Error verifying element visibility:', error);
            return false;
        }
    }

    /**
     * Method to verify element is not visible
     * @author VISHNU PV
     * @since 14-09-2023
     * @param {*} selector 
     * @returns 
     */
    async verifyElementNotVisible(selector) {
        try {
            const element = await this.page.$(selector);
            const isVisible = await element.isVisible();
            expect(isVisible).toBe(false);
            console.log("==========================================================");
            console.log('Element is currently not visible on the page');
        } catch (error) {
            console.error('Error verifying element visibility:', error);
        }
    }

    /**
     * Method to verify the element text
     * @author VISHNU PV
     * @since 14-09-2023 
     * @param {*} selector 
     * @param {*} expectedText 
     */

    async verifyElementText(selector, expectedText) {
        if (verifyElementisVisible(selector)) {
            const element = await this.page.$(selector);
            const actualText = await element.innerText();
            expect(actualText).toBe(expectedText);
            console.log('Text validation successful');
        } else {
            console.error('Element not found');
        }
    }

    /**
     * Verify that the element contains text
     * @author VISHNU PV
     * @since 14-09-2023 
     * @param {*} selector 
     * @param {*} expectedText 
     */
    async verifyElementTextContains(selector, expectedText) {
        if (verifyElementisVisible(selector)) {
            const element = await this.page.$(selector);
            const actualText = await element.innerText();
            expect(actualText).toContain(expectedText);
            console.log("==========================================================");
            console.log('Text validation successful');
        } else {
            console.log("==========================================================");
            console.error('Element not found');
        }
    }

    /**
     * Verify that the checkbox is selected or not
     * @author VISHNU PV
     * @since 14-09-2023 
     * @param {*} selector 
     * @returns 
     */
    async verifyCheckboxSelected(selector) {
        if (verifyElementisVisible(selector)) {
            const checkbox = await this.page.$(selector);
            const isSelected = await checkbox.isChecked();
            if (expect(isSelected).toBe(true)) {
                console.log("==========================================================");
                console.log('Checkbox is selected');
                return true;
            } else {
                console.log("==========================================================");
                console.log('Checkbox is not selected');
                return false;
            }
        }
        else {
            console.log("==========================================================");
            console.error('Checkbox element not found');
        }
    }

    /**
    * Verify that the element is enabled or not
    * @author VISHNU PV
    * @since 21-09-2023 
    * @param {*} selector 
    * @returns 
    */
    async verifyElementEnableorNot(selector) {
        if (verifyElementisVisible(selector)) {
            const element = await this.page.$(selector);
            const isEnabled = await element.isEnabled();
            if (expect(isEnabled).toBe(true)) {
                console.log("==========================================================");
                console.log('Element is enable');
                return true;
            } else {
                console.log("==========================================================");
                console.log('Element is disable');
                return false;
            }
        }
        else {
            console.log("==========================================================");
            console.error('Element not found');
        }
    }

    /**
     * Verify that the element is editable or not
     * @author VISHNU PV
     * @since 21-09-2023 
     * @param {*} selector 
     * @returns 
     */
    async verifyElementEditableorNot(selector) {
        if (verifyElementisVisible(selector)) {
            const element = await this.page.$(selector);
            const isEditable = await element.isEditable();
            if (expect(isEditable).toBe(true)) {
                console.log("==========================================================");
                console.log('Element is editable');
                return true;
            } else {
                console.log("==========================================================");
                console.log('Element is not editable');
                return false;
            }
        }
        else {
            console.log("==========================================================");
            console.error('Element not found');
        }
    }

    /**
      * Verify that the element has expected attributes and value
      * @author VISHNU PV
      * @since 21-09-2023 
      * @param {*} selector 
      * @param {*} attributeName 
      * @param {*} expectedValue 
      * @returns 
      */
    async verifyElementHasAttribute(selector, attributeName, expectedValue) {
        if (verifyElementisVisible(selector)) {
            const element = await this.page.$(selector);
            const attributeValue = await element.getAttribute(attributeName);
            assert.strictEqual(attributeValue, expectedValue, `Attribute ${attributeName} has unexpected value: ${attributeValue}`);
        }
        else {
            console.log("==========================================================");
            console.error('Element not found');
        }
    }

    /**
     * Verify  whether the attribute contains the expected value
     * @author VISHNU PV
     * @since 21-09-2023 
     * @param {*} element 
     * @param {*} attributeName 
     * @param {*} expectedValue 
     * @returns 
     */
    async verifyElementHasAttributeContains(element, attributeName, expectedValue) {
        const attributeValue = await element.getAttribute(attributeName);
        if (attributeValue.includes(expectedValue)) {
            console.log("==========================================================");
            console.log(`The attribute ${attributeName} contains the expecturted value: ${expectedValue}`);
            return true;
        } else {
            console.log("==========================================================");
            console.log(`The attribute ${attributeName} does not contain the expected value: ${expectedValue}`);
            return false;
        }
    }

    /**
     * Assertion to check if actual and expected are equal
     * @author VISHNU PV
     * @since 21-09-2023
     * @param {*} expectedResult 
     * @param {*} actualResult 
     */
    async verifyEquals(expectedResult, actualResult) {
        await expect(actualResult).toEqual(expectedResult);
        console.log(`Actual result ${actualResult} matches the expected ${expectedResult}`);
    }

    /**
     * Assertion to check if actual and expected are not equal
     * @author VISHNU PV
     * @since 21-09-2023
     * @param {*} expectedResult 
     * @param {*} actualResult 
     */
    async verifyNotEquals(expectedResult, actualResult) {
        await expect(actualResult).not.toEqual(expectedResult);
        console.log(`Actual result ${actualResult} is not matches the expected ${expectedResult}`);
    }

    /**
 * verify whether the expected and actual value has silimar contents
 * @author VISHNU PV
 * @since 21-09-2023 
 * @param {*} expectedValue 
 * @param {*} actualValue 
 * @returns 
 */
    async VerifyExpectedActualValueContains(expectedValue, actualValue) {
        const expectedValueLower = expectedValue.toLowerCase();
        const actualValueLower = actualValue.toLowerCase();
        if (actualValueLower.includes(expectedValueLower) && expectedValueLower.includes(actualValueLower)) {
            console.log('Both expected and actual values contain each other (case-insensitive).');
            return true;
        } else {
            console.log('One of the values does not contain the other.');
            return false;
        }
    }

    /**
     * Verify if the expected value matches with regular expression
     * @author VISHNU PV
     * @since 21-09-2023
     * @param {*} expectedValue 
     * @param {*} regularExpression 
     * @returns 
     */
    async validateIfRegularExpressionIsMatching(expectedValue, regularExpression) {
        const regex = new RegExp(regularExpression);
        if (regex.test(expectedValue)) {
            console.log(`The expected value "${expectedValue}" matches the regular expression.`);
            return true;
        } else {
            console.log(`The expected value "${expectedValue}" does not match the regular expression.`);
            return false;
        }
    }

    /**
     * Verify that the URL contains text or label
     * @author Sanoj Swaminathan
     * @since 17-07-2023
     * @param {*} expectedText 
     * @returns 
     */
    async verifyURLContainsText(expectedText) {
        const webURL = await this.web_actions.getWebUrl();
        await this.VerifyExpectedActualValueContains(expectedText, webURL);
    }

    /**
     * To compare and verify the JSON files
     * @author Sanoj Swaminathan
     * @since 17-07-2023
     * @param {*} expectedJSONPath 
     * @param {*} actualJSONPath 
     */
    async verifyJSONFileContent(expectedJSONPath, actualJSONPath) {
        const expectedJSONContent = fs.readFileSync(expectedJSONPath, 'utf8');
        const actualJSONContent = fs.readFileSync(actualJSONPath, 'utf8');
        const expected = JSON.parse(expectedJSONContent);
        const actual = JSON.parse(actualJSONContent);
        await this.verifyEquals(expected, actual);
    }

    /**
     * Method to validate the JSON content
     * @author Sanoj Swaminathan
     * @since 03-10-2023
     * @param {*} expectedJSONContent 
     * @param {*} actualJSONContent 
     */
    async verifyJSONContent(expectedJSONContent, actualJSONContent) {
        const _verification = JSON.stringify(expectedJSONContent) === JSON.stringify(actualJSONContent);
        await this.verifyEquals(true, _verification);
    }

    /**
     * Verify the file downloaded or not
     * @author Sanoj Swaminathan
     * @since 17-07-2023
     * @param {*} filePath 
     * @returns 
     */
    async verifyFileDownload(filePath) {
        try {
            fs.accessSync(filePath, fs.constants.F_OK);
            return true;
        } catch (err) {
            return false;
        }
    }

    /**
     * Compares two images that send by the user and will return the percentage value for assertion
     * @author Sanoj Swaminathan
     * @since 17-07-2023
     * @param {*} expectedImage 
     * @param {*} actualImage 
     * @returns 
     */
    async compareImages(expectedImage, actualImage) {
        const expectImg = PNG.sync.read(fs.readFileSync(expectedImage));
        const actualImg = PNG.sync.read(fs.readFileSync(actualImage));
        const { width, height } = expectImg;
        const diff = new PNG({ width, height });
        const mismatchedPixels = pixelmatch(
            expectImg.data,
            actualImg.data,
            diff.data,
            width,
            height,
            { threshold: 0.1 }
        );
        const matchPercentage = ((width * height - mismatchedPixels) / (width * height)) * 100;
        return matchPercentage.toFixed(2);
    }
}

module.exports =  Validations ;