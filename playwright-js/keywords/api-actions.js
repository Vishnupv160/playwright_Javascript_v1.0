const APIUtilities = require('./api-utilities');

class APIActions {

  /**
    * Perform simple HTTP Get request
    * 
    * @author VISHNU PV
    * @since 25-09-2023
    * @param {*} baseURL
    * @param {*} endPointPath
    * @returns 
    */
  async getRequest(baseURL, endPointPath) {
    try {
      const response = await fetch(`${baseURL}${endPointPath}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  /**
   * The method uses the fetch API internally to make the request and then returns 
   * the parsed JSON data from the response. The request method can be 'GET', 'POST', 'PATCH', 'DELETE'.
   * 
   * @author VISHNU PV
   * @since 25-09-2023
   * @param {*} apiURL 
   * @param {string} [requestMethod='POST'] 
   * @param {{}} [headers={}]  
   * @param {*} requestBody 
   * @param {boolean} [JSONreturn=true] 
   * @returns 
   */
  async apiRequest(apiURL, requestMethod = 'POST', headers = {}, requestBody = null, JSONreturn = true) {
    try {
      const response = await fetch(apiURL, {
        method: requestMethod,
        headers: headers,
        body: requestBody ? JSON.stringify(requestBody) : null,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (JSONreturn) {
        const data = await response.json();
        return data;
      }
      else {
        return response;
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  /**
  * Perform HTTP Post request with direct GraphQL data
  * 
  * @author Sanoj Swaminathan
  * @since 03-10-2023
  * @param {*} apiURL
  * @param {*} graphQLQuery 
  * @param {{}} [headers={}] 
  * @param {boolean} [JSONreturn=true] 
  * @returns 
  */
  async postRequestWithGraphQL(apiURL, graphQLQuery, headers = {}, JSONreturn = true) {
    try {
      const graphqlRequest = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ query: graphQLQuery }),
      };
      const response = await fetch(apiURL, graphqlRequest);
      if (JSONreturn) {
        const data = await response.json();
        console.log('The respons is ' + data);
        return data;
      }
      else {
        console.log('The respons is ' + response);
        return response;
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  /**
 * Perform HTTP Post request with GraphQL data from the given file path. 
 * The file format should be in .txt
 * 
 * @author Sanoj Swaminathan
 * @since 03-10-2023
 * @param {*} apiURL
 * @param {*} graphQLQueryFilePath 
 * @param {{}} [headers={}] 
 * @param {boolean} [JSONreturn=true] 
 * @returns 
 */
  async postRequestWithGraphQLFilePath(apiURL, graphQLQueryFilePath, headers = {}, JSONreturn = true) {
    try {
      this.api_utilities = new APIUtilities();
      const graphqlRequest = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ query: await this.api_utilities.getGraphQLData(graphQLQueryFilePath) }),
      };
      const response = await fetch(apiURL, graphqlRequest);
      if (JSONreturn) {
        const data = await response.json();
        console.log('The respons is ' + data);
        return data;
      }
      else {
        console.log('The respons is ' + response);
        return response;
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}

module.exports = APIActions