const jsonpath = require('jsonpath');
const fs = require('fs');
const path = require('path');

class APIUtilities {

  /**
     * Method to get the response code
     * 
     * @author Sanoj Swaminathan
     * @since 03-10-2023
     * @param {*} response 
     * @returns 
     */
  async getResponseCode(response) {
    try {
      const statusCode = await response.status;
      console.log("=================================");
      console.log(`Status code is ${statusCode}`);
      return statusCode;
    } catch (error) {
      console.error('Error reading response code');
      throw error;
    }
  }

  /**
   * Method to get entire response body
   * 
   * @author Sanoj Swaminathan
   * @since 03-10-2023
   * @param {*} response 
   * @returns 
   */
  async getResponseBody(response) {
    try {
      const responseBody = await response.text;
      console.log("=================================");
      console.log(`Response body is ${responseBody}`);
      return responseBody;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Method to get the value from the response based on give JSON path
   * @author Sanoj Swaminathan
   * @since 03-10-2023
   * @param {*} response 
   * @param {*} jsonPath 
   * @returns 
   */
  async getValueFromResponse(response, jsonPath) {
    try {
      const jsonResponse = await response.json();
      const value = jsonpath.query(jsonResponse, jsonPath)[0];
      console.log("=================================");
      console.log(`The value is ${value}`);
      return value;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Method to get the status text
   * @author Sanoj Swaminathan
   * @since 03-10-2023
   * @param {*} response 
   * @returns 
   */
  async getStatusText(response) {
    try {
      const statusText = response.statusText;
      console.log("=================================");
      console.log(`The status text is ${statusText}`);
      return statusText;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Method to get the header details
   * @author Sanoj Swaminathan
   * @since 03-10-2023
   * @param {*} response 
   * @returns 
   */
  async geteHeader(response) {
    try {
      const headerValue = response.headers()[headerName.toLowerCase()];
      console.log("=================================");
      console.log(`The header is ${headerValue}`);
      return headerValue;
    } catch (error) {
      console.error(error);
    }
  }

  /**
  * Validate the get Content-Type from the response
  * 
  * @author Sanoj Swaminathan
  * @since 25-09-2023
  * @param {*} response 
  * @returns 
  */
  async getContentType(response) {
    try {
      const contentType = response.headers()['content-type'];
      console.log("=================================");
      console.log(`The content type is ${contentType}`);
      return contentType;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * The Method will reads the content of the GraphQL query file specified by queryFilePath. 
   * 
   * @author VISHNU PV
   * @since 25-09-2023
   * @param {*} queryFilePath 
   * @returns 
   */

  async getGraphQLData(queryFilePath) {
    try {
      const finalFilePath = path.join(__dirname, queryFilePath);
      const query = fs.readFileSync(finalFilePath, 'utf-8');
      console.log("=================================");
      console.log('Data is retrieved sucessfully');
      return query;
    } catch (error) {
      console.error('Error reading GraphQL query file:', error);
      throw error;
    }
  }

  /**
   * Get array values from JSON file 
   * 
   * @author VISHNU PV
   * @since 29 SEP 2023
   * @param {*} filePath 
   * @param {*} key 
   * @returns 
   */

  async getArrayValuesFromJSONFile(filePath, key) {
    try {
      const jsonData = fs.readFileSync(filePath);
      const jsonContent = JSON.parse(jsonData);
      if (jsonContent[key] && Array.isArray(jsonContent[key])) {
        return jsonContent[key];
      } else {
        throw new Error(`Key "${key}" does not exist or is not an array in the JSON file.`);
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Method to update the JSON path value in the given JSON payload file.
   * 
   * @author VISHNU PV
   * @since 29 Sep 2023
   * @param {*} filePath 
   * @param {*} jsonPath 
   * @param {*} newValue 
   */

  async updateJSONDataWithGivenFilePath(filePath, jsonPath, newValue) {
    try {
      const jsonData = fs.readFileSync(filePath);
      const jsonObject = JSON.parse(jsonData);
      const pathElements = jsonPath.split('.');
      let currentNode = jsonObject;

      for (let i = 0; i < pathElements.length - 1; i++) {
        const pathElement = pathElements[i];
        if (currentNode[pathElement] instanceof Array) {
          const index = parseInt(pathElement, 10);
          currentNode = currentNode[pathElement][index];
        } else {
          currentNode = currentNode[pathElement];
        }
      }
      const lastPathElement = pathElements[pathElements.length - 1];
      currentNode[lastPathElement] = newValue;
      // Write the updated JSON back to the file
      fs.writeFileSync(filePath, JSON.stringify(jsonObject, null, 2));
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Method to update the JSON path value in the given response.
   * 
   * @author Sanoj Swaminathan
   * @since 29 Sep 2023
   * @param {*} response 
   * @param {*} jsonPath 
   * @param {*} newValue 
   */

  async updateJSONDataInResponse(response, jsonPath, newValue) {
    try {
      const jsonObject = JSON.parse(response);
      const pathElements = jsonPath.split('.');
      let currentNode = jsonObject;

      for (let i = 0; i < pathElements.length - 1; i++) {
        const pathElement = pathElements[i];
        if (currentNode[pathElement] instanceof Array) {
          const index = parseInt(pathElement, 10);
          currentNode = currentNode[pathElement][index];
        } else {
          currentNode = currentNode[pathElement];
        }
      }
      const lastPathElement = pathElements[pathElements.length - 1];
      currentNode[lastPathElement] = newValue;
      // Write the updated JSON back to the file
      const timestamp = new Date().toISOString().replace(/:/g, '-');
      const fileName = `payload-${timestamp}.json`;
      const filePath = path.join('../resources/RequestPayload/', fileName);
      fs.writeFileSync(filePath, JSON.stringify(jsonObject, null, 2));
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = APIUtilities;