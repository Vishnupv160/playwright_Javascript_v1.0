class Utilities {

  constructor(page) {
    this.page = page;
  }

  /**
   * Wait till the element is found in DOM/Wait for the element to be visible
   * @author VISHNU PV
   * @since 11-09-2023
   * @param {*} selector 
   * @returns 
   */
  async waitForElementVisible(selector) {
    if (await this.page.waitForSelector(selector, { visible: true })) {
      console.log("==========================================================");
      console.log('The element is visible.');
      return true;
    }
    else {
      console.log("==========================================================");
      console.log('The element is not visible.');
      return false;
    }
  }

  /**
   * Method to wait for the element is hidden, the opposite of visible.
   * @author VISHNU PV
   * @since 11-09-2023
   * @param {*} selector 
   * @returns 
   */
  async waitForElementHidden(selector) {
    const element = await this.page.$(selector);
    if (await element.isHidden()) {
      return true;
    }
    else {
      return false;
    }
  }

  /**
   * Wait for the element to exist
   * @author VISHNU PV
   * @since 11-09-2023
   * @param {*} selector 
   * @returns 
   */
  async waitForElementExist(selector) {
    if (await this.page.waitForSelector(selector)) {
      return true;
    }
    else {
      return false;
    }
  }

  /**
  * Returns when the element satisfies the state. The state value cane be "visible", "hidden", "stable",
  * "enabled", "disabled", "editable".
  * @author Sanoj Swaminathan
  * @since 20-09-2023
  * @param {string} [state="visible"] 
  * @param {*} selector 
  * @returns 
  */
  async waitForElementWithState(selector, state = "visible") {
    const elementHandle = await this.page.$(selector)
    if (await elementHandle.waitForElementState(state)) {
      return true;
    }
    else {
      return false;
    }
  }

  /**
   * Method to wait for the element is checked. Throws if the element is not a
   * checkbox or radio input.
   * @author VISHNU PV
   * @since 11-09-2023
   * @param {*} selector 
   * @returns 
   */
  async waitForElementChecked(selector) {
    const element = await this.page.$(selector);
    if (await element.isChecked()) {
      return true;
    }
    else {
      return false;
    }
  }

  /**
 * Method to wait for the element is enabled.
 * @author VISHNU PV
 * @since 11-09-2023
 * @param {*} selector 
 * @returns 
 */
  async waitForElementEnabled(selector) {
    const element = await this.page.$(selector);
    if (await element.isEnabled()) {
      return true;
    }
    else {
      return false;
    }
  }

  /**
* Method to wait for the element is disabled.
* @author VISHNU PV
* @since 11-09-2023
* @param {*} selector 
* @returns 
*/
  async waitForElementDisabled(selector) {
    const element = await this.page.$(selector);
    if (await element.isDisabled()) {
      return true;
    }
    else {
      return false;
    }
  }

  /**
  * Method to wait for the element is editable.
  * @author VISHNU PV
  * @since 11-09-2023
  * @param {*} selector 
  * @returns 
  */
  async waitForElementEditable(selector) {
    const element = await this.page.$(selector);
    if (await element.isEditable()) {
      return true;
    }
    else {
      return false;
    }
  }

  /**
* Method to Wait for the element's text to be present.
* @author VISHNU PV
* @since 11-09-2023
* @param {*} selector 
* @param {*} expectedText 
* @returns 
*/
  async waitForTextPresent(selector, expectedText) {
    const element = await this.page.$(selector);
    const actualText = await element.innerText();
    if (actualText.eql(expectedText)) {
      return true;
    }
    else {
      return false;
    }
  }

  /**
  * This method to update the default navigation timeout
  * 
  * @author VISHNU PV
  * @since 08-07-2023
  * @param {number} [Timeout=60000] 
  */
  async waitForPageNavigationComplete(Timeout = 60000) {
    await this.page.setDefaultNavigationTimeout(Timeout);
    console.log("==========================================================");
    console.log('Default Navigation Timout has been updated to', Timeout)
  }

  /**
  * This method waits for a navigation event to complete. It's useful when you want to wait for a page to load after an action like a click.
  * is typically used when you expect a specific user action to trigger a page navigation.
  * @author VISHNU PV
  * @since 08-07-2023
  * @param {string} [option='domcontentloaded']
  */
  async waitForDOMLoadComplete(option = 'domcontentloaded') {
    try {
      await this.page.waitForNavigation({ waitUntil: option });
      console.log("==========================================================");
      console.log('Page navigation Completed');
    } catch (error) {
      console.log(error)
    }
  }

  /**
  * This method waits for state ton vary, can be used to wait for various states, 
  * not just navigations caused by user interactions.
  * @author VISHNU PV
  * @since 08-07-2023
  * @param {string} [option='load']
  */
  async waitForPageLoadComplete(option = 'load') {
    try {
      await this.page.waitForLoadState(option);// Wait for the page to fully load
      console.log("==========================================================");
      console.log('Page navigation Completed');
    } catch (err) {
      console.log(err)
    }
  }

  /**
  * Wait for a certain  amount of seconds
  * @author VISHNU PV
  * @since 11-09-2023
  * @param {number} [delayInSeconds=3] 
  * @returns 
  */
  async delay(delayInSeconds = 3) {
    await this.page.waitForTimeout(delayInSeconds * 1000);
  }

  /**
* Method to get the attribute value of the web element
* @author VISHNU PV
* @since 11-09-2023
* @param {*} selector 
* @param {*} attributeName 
* @returns 
*/
  async getElementAttributeValue(selector, attributeName) {
    const element = await this.page.$(selector);
    const attributeValue = await element.getAttribute(attributeName);
    return attributeValue;
  }

  /**
* Method to generates a PDF with "screen" media type. The file will be generated in 'generated-pdf' folder.
* @author VISHNU PV
* @since 11-09-2023
* @param {*} fileName 
* @returns 
*/
  async generatePDF(fileName) {
    await this.page.emulateMedia({ media: 'screen' });
    const pdfPath = `./generated-pdf/${fileName}.pdf`;
    await this.page.pdf({ path: pdfPath });
    return pdfPath;
  }

  /**
 * This method is to find the locator and perform click action
 * @author VISHNU PV
 * @since 12-09-2023
 * @param {*} selector //CSS selector or XPath expression
 * @returns 
 */
  async findLocator(selector) {
    try {
      var headingLocator = await findLocator(this.page, selector);
      console.log("==========================================================");
      console.log(`Selector ${selector} is located`);
    }
    catch (err) {
      console.log(err)
    }
    return headingLocator;
  }

  /**
    * The method helps to get the text value from a web element
    * @author VISHNU PV
    * @since 12-09-2023
    * @param {*} selector 
    */
  async getElementText(selector) {
    const elementHandle = await page.$(selector);
    if (elementHandle) {
      await elementHandle.scrollIntoView();
      console.log("==========================================================");
      console.log('Element is now in view');
    } else {
      console.log("==========================================================");
      console.error('Element not found');
    }
  }

  /**
   * Method to get the Count of the elements from the Web element list
   * @author VISHNU PV
   * @since 12-09-2023
   * @param {*} selector 
   * @returns 
   */
  async countOfElementsFromList(selector) {
    try {
      // Wait for the elements to be present on the page
      await this.page.waitForSelector(selector);

      // Get the count of elements matching the selector
      const elementsCount = await this.page.$$eval(selector, elements => elements.length);
      return elementsCount;
    } catch (error) {
      console.log("==========================================================");
      console.error(`Error counting elements for selector ${selector}:`, error);
      return -1;
    }
  }

  /**
    * Method to drag and drop an element to a target location
    * @author VISHNU PV
    * @since 12-09-2023
    * @param {*} sourceSelector
    * @param {*} targetSelector  
    */
  async dragAndDrop(sourceSelector, targetSelector) {
    // Locate the source element you want to drag
    const sourceElement = await page.$(sourceSelector); // Replace with your source selector
    // Locate the target element where you want to drop the source element
    const targetElement = await page.$(targetSelector); // Replace with your target selector
    if (sourceElement && targetElement) {
      await sourceElement.dragAndDrop(targetElement);
      console.log("==========================================================");
      console.log('Drag-and-drop completed successfully');
    } else {
      console.log("==========================================================");
      console.error('Source or target element not found');
    }
  }

  /**
   * Drag and and drop an element to a specified offset
   * @author VISHNU PV
   * @since 22-09-2023
   * @param {*} sourceSelector 
   * @param {*} xOffSet 
   * @param {*} yOffSet 
   */
  async dragAndDrop(sourceSelector, xOffSet, yOffSet) {
    // Locate the source element you want to drag
    const sourceElement = await page.$(sourceSelector); // Replace with your source selector  
    if (sourceElement) {
      await sourceElement.dragAndDropTo({ x: xOffSet, y: yOffSet });
      console.log("==========================================================");
      console.log('Drag-and-drop completed successfully');
    } else {
      console.log("==========================================================");
      console.error('Source element not found');
    }
  }

  /**
  * Scroll to element to a specified postion 
  * @author VISHNU PV
  * @since 12-09-2023
  * @param {*} targetPositionX 
  * @param {*} targetPositionY 
  */
  async scrollToPosition(targetPositionX, targetPositionY) {
    await this.page.evaluate((targetPositionX, targetPositionY) => {
      window.scrollTo(targetPositionX, targetPositionY);
    }, targetPositionX, targetPositionY);
    console.log("==========================================================");
    console.log('Scrolled to ' + targetPositionX + ' and ' + targetPositionY);
  }

  /**
   * Method to scroll to the bottom of the web page
   * @author Sanoj Swaminathan
   * @since 13-07-2023
   */
  async scrollToBottomOfPage() {
    const scrollToBottom = ClientFunction(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await scrollToBottom();
    console.log("==========================================================");
    console.log('Scrolled to the bottom of the web page');
  }

  /**
     * Method to scroll to the top of the web page
     * @author Sanoj Swaminathan
     * @since 13-07-2023
     */
  async scrollToTopOfPage() {
    const scrollToTop = ClientFunction(() => {
      window.scrollTo(0, 0);
    });
    await scrollToTop();
    console.log("==========================================================");
    console.log('Scrolled to the top of the web page');
  }

  /**
    * To select a value from dropdown using visbile text
    * @author VISHNU PV
    * @since 12-09-2023
    * @param {*} selector 
    * @param {*} visibleText 
    */
  async selectDropDownValueByVisibleText(selector, visibleText) {
    const dropdown = await this.page.$(selector); // Replace with your selector
    if (dropdown) {
      // Select an option by its visible text
      await dropdown.selectOption({ label: visibleText });
      console.log("==========================================================");
      console.log('Option selected successfully');
    } else {
      console.log("==========================================================");
      console.error('Dropdown element not found');
    }
  }

  /**
     * To select a value from dropdown using index value
     * @author VISHNU PV
     * @since 12-09-2023
     * @param {*} selector 
     * @param {*} indexValue  
     */
  async selectDropDownValueByIndex(selector, indexValue) {
    const dropdown = await this.page.$(selector);
    if (dropdown) {
      await dropdown.selectOption({ index: indexValue });
      console.log("==========================================================");
      console.log('Option selected successfully');
    } else {
      console.log("==========================================================");
      console.error('Dropdown element not found');
    }
  }

  /**
     * To select a value from dropdown using value
     * @author VISHNU PV
     * @since 12-09-2023
     * @param {*} selector 
     * @param {*} valueToBeSelected  
     */
  async selectDropDownValueByValue(selector, valueToBeSelected) {
    const dropdown = await this.page.$(selector);
    if (dropdown) {
      await dropdown.selectOption({ value: valueToBeSelected });
      console.log("==========================================================");
      console.log('Option selected successfully');
    } else {
      console.log("==========================================================");
      console.error('Dropdown element not found');
    }
  }

  /**
   * The Method is used for getting the Cordinate
   * @author VISHNU PV
   * @since 12-09-2023
   * @param {string} [coordinate='Y'] 
   * @returns 
   */
  async getCoordinate(selector, coordinate = 'Y') {
    // Select an element using a selector
    const elementHandle = await this.page.$(selector); // Replace with your selector
    if (elementHandle) {
      // Get the bounding box of the element
      const boundingBox = await elementHandle.boundingBox();
      if (boundingBox) {
        if (coordinate == 'X') {
          const xCoordinate = boundingBox.x;
          console.log('X-coordinate:', xCoordinate);
          return xCoordinate;
        }
        else {
          const yCoordinate = boundingBox.y;
          console.log('Y-coordinate:', yCoordinate);
          return yCoordinate;
        }
      }
      else {
        console.log("=============================================");
        console.error('Element is not visible or not in the DOM.');
      }
    } else {
      console.log("=============================================");
      console.error('Element not found.');
    }
  }

  /**
 * Method to release the depressed left mouse button at the current mouse
 * location
 * 
 * @author VISHNU PV
 * @since 06-07-2023
 * @returns
 */
  async releaseMouse() {
    await this.page.mouse.up();
    console.log("=============================================");
    console.error('Mouse released');
  }

  /** 
  * Capture screenshot of the web page and it will store in to the 'screenshot-captured' folder 
  * in the project
  * @author Sanoj Swaminathan
  * @since 20-09-2023
  * @param {*} fileName 
  * @param {boolean} [needFullPage=true] 
  */
  async captureScreenshot(fileName, needFullPage = true) {
    await this.page.screenshot({ path: `./screenshot-captured/${fileName}.png`, fullPage: needFullPage });
    return `./screenshot-captured/${fileName}.png`;
  }

  /** 
 * Capture screenshot of the web element and it will store in to the 'screenshot-captured' folder 
 * in the project
 * @author Sanoj Swaminathan
 * @since 20-09-2023
 * @param {*} fileName 
 * @param {*} selector 
 */
  async captureElementScreenshot(selector, fileName) {
    await this.page.locator(selector).screenshot({ path: `./screenshot-captured/${fileName}.png` });
    return `./screenshot-captured/${fileName}.png`;
  }

  /**
  * Method is to capture screenshot and returns a byte array for visible screen
  * @author Sanoj Swaminathan
  * @since 20-09-2023
  * @returns 
  */
  async captureScreenshotAsByteArray() {
    const screenshot = await this.page.screenshot();
    const screenshotData = await screenshot.toString('base64');
    return screenshotData;
  }

  /**
   * This method to generate time stamp
   * 
   * @author VISHNU PV
   * @since 06-07-2023
   * @returns
   */
  async generateTimestamp() {
    const now = new Date();
    const timestamp = now.toISOString().replace(/[-:.T]/g, '').slice(0, -4);
    return timestamp;
  }

  /**
   * Get the current date
   * @author Nilin Pramod
   * @since 03-07-2023
   * @returns 
   */
  async getCurrentDate() {
    const date = new Date();
    let currentDay = String(date.getDate()).padStart(2, '0');
    let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
    let currentYear = date.getFullYear();
    let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
    return currentDate;
  }

  /**
   * Get the current date in ddMMMyyy
   * @author Nilin Pramod
   * @since 04-07-2023
   * @returns 
   */
  async getCurrentDateInFormatddMMMyyyy() {
    const date = new Date();
    let currentDay = date.toLocaleDateString("en-US", { day: 'numeric' })
    let currentMonth = date.toLocaleDateString("en-US", { month: 'short' })
    let currentYear = date.toLocaleDateString("en-US", { year: 'numeric' })
    let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
    return currentDate;
  }

  /**
   * Get the current day
   * @author Nilin Pramod
   * @since 04-07-2023
   * @returns Get the current day
   */
  async getDayFromCurrentDate() {
    const date = new Date();
    let currentDay = String(date.getDate()).padStart(2, '0');
    return currentDay;
  }

  /**
   * Get random number based on lower and upper bounds
   * @author Nilin Pramod
   * @since 04-07-2023
   * @param {*} lowerBound 
   * @param {*} upperBound 
   * @returns Random Number
   */
  async getRandomNumber(lowerBound, upperBound) {
    return Math.floor(Math.random() * (upperBound - lowerBound)) + 1;
  }

  /**
   * Get random number based on given length
    * @author Nilin Pramod
    * @since 04-07-2023
    * @param {*} length 
    * @returns Random Number
    */
  async getRandomNumber(length) {
    return Math.floor(Math.random() * length + 1);
  }

  /**
   * Get random string based on given length
    * @author Nilin Pramod
    * @since 04-07-2023
    * @param {*} length 
    * @returns Random String
    */
  async getRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  /**
   * Convert value to integer
    * @author Nilin Pramod
    * @since 04-07-2023
    * @param {*} value 
    * @returns integer value
    */
  async convertToInteger(value) {
    return parseInt(value);
  }

  /**
   * Convert value to float
   * @author Nilin Pramod
   * @since 05-07-2023
   * @param {*} value 
   * @returns Float value
   */
  async convertToFloat(value) {
    return parseFloat(value);
  }

  /**
   * Convert value to string
    * @author Nilin Pramod
    * @since 05-07-2023
    * @param {*} value 
    * @returns String value
    */
  async convertToString(value) {
    return toString(value)
  }

  /**
   * Base64-encoded ASCII string from a string of binary data
   * @author Nilin Pramod
   * @since 05-07-2023
   * @param {*} stringValue 
   * @returns encoded string
   */
  async encodeString(stringValue) {
    let encodedString = btoa(stringValue);
    return encodedString;
  }

  /**
   * Base64-decode string
   * @author Nilin Pramod
   * @since 05-07-2023
   * @param {*} encodedString 
   * @returns 
   */
  async decodeString(encodedString) {
    let decodedString = atob(encodedString);
    return decodedString;
  }

  /**
* Method to upload file. Target element must be an <input> with the type="file" attribute.
* @author Sanoj Swaminathan
* @since 21-09-2023
* @param {*} selector 
* @param {*} filePath 
*/
  async uploadFile(selector, filePath) {
    const fileInput = await page.$(selector);
    await fileInput.setInputFiles(filePath);
    console.log(`${filePath} uploaded successfully`);
  }

  /**
* Method to delete file
* @author Sanoj Swaminathan
* @since 20-09-2023
* @param {*} filePath 
*/
  async deleteFile(filePath) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      } else {
        console.log('File deleted successfully.');
      }
    });
  }
}

module.exports = { Utilities };