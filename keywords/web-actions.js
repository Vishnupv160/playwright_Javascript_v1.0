const { Utilities }  = require('./utilities');

class WebActions {

   constructor(page) {
      this.page = page;
      this.util = new Utilities(page);
   }

   /**
    * Load the web application
    * 
    * @author VISHNU PV
    * @since 06-07-2023
    * @param {*} webApplicationUrl 
    */
   async loadWebApplication(webApplicationUrl) {
      try {
         await this.page.goto(webApplicationUrl);
         console.log(`Navigated to the ${webApplicationUrl}`)
      } catch (error) {
         console.log(error.name)
      }
   }

   /**
      * This method is to get the title of the web application
      * 
      * @author VISHNU PV
      * @since 08-07-2023
      * @parameter NA
      * @return
      */
   async getWebUrl() {
      try {
         const currentURL = await this.page.url();
         console.log('Page URL is : ', currentURL);
         return currentURL;
      } catch (error) {
         console.log(error)
      }
   }

   /**
      * This method is to get the title of the web application
      * 
      * @author VISHNU PV
      * @since 08-07-2023
      * @parameter NA
      * @return
      */
   async getWebApplicationTitle() {
      try {
         const title = await this.page.title();
         console.log('Page Title : ', title);
         return title;
      } catch (error) {
         console.log(error)
      }
   }

   /**
    * This method navigates back in the browser history
    * 
    * @author VISHNU PV
    * @since 08-07-2023
    * @parameter NA
    */
   async navigateBack() {
      try {
         await this.page.goBack();
         console.log("================================");
         console.log('Navigated back to');
      } catch (err) {
         console.log(err)
      }
   }

   /**
       * This method navigates forward in the browser history.
       * 
       * @author VISHNU PV
       * @since 08-07-2023
       * @parameter NA
       */
   async navigateForward() {
      try {
         await this.page.goForward();
         console.log("================================");
         console.log('Navigated forward to');
      } catch (err) {
         console.log(err)
      }
   }

   /**
       * This method hard reloaded from the server without using the browser cache.
       * 
       * @author VISHNU PV
       * @since 08-07-2023
       * @parameter NA
       */
   async refreshPage() {
      try {
         await page.reload({ waitUntil: 'load', timeout: 0 });
         console.log("================================");
         console.log('Reloaded the page');
      } catch (err) {
         console.log(err)
      }
   }

   /**
   * This method is for soft reload of the web application.
   * 
   * @author VISHNU PV
   * @since 08-07-2023
   * @parameter NA
   */
   async reload() {
      try {
         await this.page.reload();
         console.log("================================");
         console.log('Reloaded the page');
      } catch (err) {
         console.log(err)
      }
   }

   /**
       * This method will pause the script execution.
       * 
       * @author VISHNU PV
       * @since 08-07-2023
       * @parameter NA
       */
   async pausePage() {
      try {
         await this.page.pause();
         console.log("================================");
         console.log('Existing page is paused');
      } catch (err) {
         console.log(err)
      }
   }

   /**
    * Method to set the browser screen size with different resolutions.
    * 
    * @author VISHNU PV
    * @since 08-07-2023
    * @param {number} [_height=800] 
    * @param {number} [_width=1200] 
    */
   async setBrowserScreenSize(_width = 1200, _height = 800) {
      try {
         await page.setViewportSize({ width: _width, height: _height });
         console.log("================================");
         console.log(`Browser screen is set to ${_width} and ${_height}`);
      } catch (err) {
         console.log(err)
      }
   }

   /**
       * Get the list of window handles
       * @author VISHNU PV
       * @since 11-09-2023
       */
   async getWindowHandles() {
      const pages = await context.pages();
      return pages;
   }

   /**
      * Method to bring to Upfront the window by index
      * @author VISHNU PV
      * @since 11-09-2023
      * @param {number} [index=0] 
      */
   async switchToBrowserTab(index = 0) {
      await this.getWindowHandles()[index].bringToFront();
   }

   /**
      * Method to bring to Upfront the window by element.
      * @author VISHNU PV
      * @since 11-09-2023
      * @param {*} selector 
      */
   async switchToFrame(selector) {
      const frame = this.page.frame(selector);
      console.log("================================");
      console.log('switched Into the frame');
      return frame;
   }

   /**
   * Method to bring to Upfront the window by index
   * @author VISHNU PV
   * @since 11-09-2023
   * @param {*} index 
   */
   async switchToFrame(index) {
      const frame = this.page.frames()[index]
      console.log("================================");
      console.log('switched Into the frame');
      return frame;
   }

   /**
      * Method to switch out from the frame.
      * @author VISHNU PV
      * @since 11-09-2023
      * 
      */
   async switchOutFromFrame() {
      await this.page.bringToFront();
      console.log("================================");
      console.log('switched out of the frame');
   }

   /**
      * Method to handle the dialog box
      * @author VISHNU PV
      * @since 11-09-2023
      * @param {string} [alert_type='alert'] - alert/confirm/prompt
      * @param {boolean} [flag=true] - for accepting the dialog box
      */
   async dialogHandler(alert_type = 'alert', flag = true) {
      // Set up a listener for dialog events
      this.page.on('dialog', async dialog => {
         // Check if the dialog is an alert (confirm and prompt dialogs are also possible)
         if (dialog.type() === alert_type) {
            console.log('Dialog message:', dialog.message());
            if (flag)
               await dialog.accept(); // Accept the alert
            else
               await dialog.dismiss();// Dismiss the alert
         }
      });
   }

   /**
  * This method is to close the page.
  * 
  * @author Sanoj Swaminathan
  * @since 06-07-2023
  */
   async closePage() {
      try {
         await this.page.close();
      } catch (error) {
         console.log(error)
      }
   }
}

module.exports = { WebActions };