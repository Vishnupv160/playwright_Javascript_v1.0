const { Utilities } = require('./utilities');

class UIActions {
  constructor(page) {
    this.page = page;
    this.util = new Utilities(page);
  }

  /**
  * General method to tap on web element
  * 
  * @author VISHNU PV
  * @since 11-09-2023
  * @param {*} selector 
  */
  async tap(selector) {
    if (await this.util.waitForElementVisible(selector)) {
      await this.page.click(selector);
      console.log(selector);
      console.log("==========================================================");
      console.log("Successfully clicked on " + selector);
    }
  }

  /**
     *This method is to double tap on a element/item.
     * @author VISHNU PV
     * @since 12-09-2023
     * @param {*} selector 
     */
  async doubleTap(selector) {
    const elementHandle = await this.page.$(selector); // Replace with your selector
    if (elementHandle) {
      await elementHandle.dblclick();
      console.log("=============================================");
      console.log('Element double-clicked successfully');
    } else {
      console.log("=============================================");
      console.error('Element not found');
    }
  }

  /**
   * Right click on the given web element
   * @author VISHNU PV
   * @since 12-09-2023
   * @param {*} selector 
   */
  async rightClick(selector) {
    const elementHandle = await this.page.$(selector); // Replace with your selector
    if (elementHandle) {
      await elementHandle.click({ button: 'right' });
      console.log("=============================================");
      console.log('Element left-clicked successfully');
    } else {
      console.log("=============================================");
      console.error('Element not found');
    }
  }

  /**
    * Function to fill in a text input field
    * 
    * @author VISHNU PV
    * @since 11-09-2023
    * @param {*} selector 
    * @param {*} typeValue 
    */
  async type(selector, typeValue) {
    if (await this.util.waitForElementVisible(selector)) {
      await this.page.fill(selector, typeValue);
      console.log(selector, typeValue);
      console.log("==========================================================");
      console.log(typeValue + " Entered Successfully on " + selector);
    }
  }

  /**
    * Clear the edit field and enter data into the same edit field
    * @author VISHNU PV
    * @since 12-09-2023
    * @param {*} selector 
    * @param {*} typeValue 
    */
  async clearAndType(selector, typeValue) {
    if (await this.util.waitForElementVisible(selector)) {
      await selector.focus();
      await selector.press('delete');
      await this.page.fill(selector, typeValue);
      console.log("=============================================");
      console.log('sucessfully updated the field');
    }
  }

  /**
   * Method to clear the text in the input field
   * @author VISHNU PV
   * @since 22-09-2023
   * @param {*} selector 
   */
  async clearTextFromField(selector) {
    const inputElement = await page.$(selector);
    if (inputElement) {
      await inputElement.fill('');
      console.log("=============================================");
      console.log('Input field cleared successfully');
    } else {
      console.log("=============================================");
      console.error('Input element not found');
    }
  }

  /**
   * Method to press any Keyboard button.
   * @author VISHNU PV
   * @since 12-09-2023
   * @param {*} keyName 
   * @param {*} selector 
   */
  async pressAnyKey(selector, keyName) {
    const elementHandle = await this.page.$(selector); // Replace with your selector
    if (elementHandle) {
      await elementHandle.focus();
      await elementHandle.press(keyName);
      console.log("=============================================");
      console.log(`The ${keyName} key pressed successfully`);
    } else {
      console.log("=============================================");
      console.error('Input element not found');
    }
  }

  /**
   * Method to hover on an element
   * @author Sanoj Swaminathan
   * @since 22-09-2023
   * @param {*} selector 
   */
  async hoverAnElement(selector) {
    const inputElement = await this.page.$(selector);
    if (inputElement) {
      await inputElement.hover();
      console.log("=============================================");
      console.log('Moved on ' + selector);
    }
  }
}

module.exports = { UIActions };