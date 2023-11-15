const APIActions = require('../keywords/api-actions');
const APIValidations = require('../keywords/api-validations');
const Validations = require('../keywords/validations');


const api_actions = new APIActions();
const api_validations= new APIValidations();

class APIHelper {

    constructor(request) {
        this.request = request;
        this.validations = new Validations(this.page)
    }

    /**
     * Method to create user
     * @author VISHNU PV
     * @since 29-09-2023
     * @param {*} baseURL 
     * @param {*} resourceEndPoint 
     * @param {*} createUserJsonRequestBody 
     * @returns 
     */
    async createUser(baseURL, resourceEndPoint, createUserJsonRequestBody) {
        const response = await api_actions.apiRequest(`${baseURL}${resourceEndPoint}`, 'POST', {}, createUserJsonRequestBody, false)
        console.log('Request has been POSTED');
        return response;
    }

    /**
     * Method to validate the created user
     * @author VISHNU PV
     * @since 29-09-2023
     * @param {*} response 
     * @returns 
     */
    async validateCreatedUser(response) {
        await api_validations.validateStatusCode(response, 201);
        const body = await response.json();
        const ID = body.id;
        console.log("Create User ID: " + ID);
        return ID;
    }

    /**
     * Method to get the single user details
     * @author VISHNU PV
     * @since 29-09-2023
     * @param {*} baseURL 
     * @param {*} singleuser 
     * @returns 
     */
    async getsingleUserDetails(baseURL, singleuser) {
        const response = await api_actions.apiRequest(`${baseURL}${singleuser}`, 'GET', {}, null, false);
        console.log('Single User details are retrived')
        return response;
    }

    /**
     * Validate the single user details
     * @author VISHNU PV
     * @since 29-09-2023
     * @param {*} response 
     * @param {*} expectedUserDetails 
     */
    async validateSingleUserDetails(response, expectedUserDetails) {
        this.validations.verifyJSONContent(expectedUserDetails, await response.json());
        api_validations.validateStatusText(response, 'OK');
        api_validations.validateStatusCode(response, 200);
        console.log('validation after fetching was successful');
    }

    /**
     * Method to delete the user
     * @author VISHNU PV
     * @since 29-09-2023
     * @param {*} baseURL 
     * @param {*} resourceEndPoint 
     * @param {*} ID 
     * @returns 
     */
    async deleteUser(baseURL, resourceEndPoint, ID) {
        const response = await api_actions.apiRequest(`${baseURL}${resourceEndPoint}/${ID}`, 'DELETE', {}, null, false);
        console.log('Request for DELETE is Successful');
        return response;
    }

    /**
     * Method to validate the deleted user
     * @author VISHNU PV
     * @since 29-09-2023
     * @param {*} response 
     */
    async validateDeleteUserDetails(response) {
        api_validations.validateStatusCode(response, 204);
        api_validations.validateStatusText(response, 'No Content');
        console.log('validation after delete was successful');
    }

    /**
     * Method to validate GraphQL API
     * @author Sanoj Swaminathan
     * @since 29-09-2023
     * @param {*} baseURL 
     * @param {*} endPointPath 
     * @param {*} graphQLQuery 
     */
    async validateGraphQLAPIData(baseURL, endPointPath, graphQLQuery) {
        const response = await api_actions.postRequestWithGraphQL(`${baseURL}${endPointPath}`, graphQLQuery, { 'Content-Type': 'application/json' }, false);
        console.log('Request for GraphQL API is Successful');
    }

    /**
  * Method to validate GraphQL API with query in file path
  * @author Sanoj Swaminathan
  * @since 29-09-2023
  * @param {*} baseURL 
  * @param {*} endPointPath 
  * @param {*} graphQLQueryFilePath 
  */
    async validateGraphQLAPIDataWithFilePath(baseURL, endPointPath, graphQLQueryFilePath) {
        const response = await api_actions.postRequestWithGraphQLFilePath(`${baseURL}${endPointPath}`, graphQLQueryFilePath, { 'Content-Type': 'application/json' }, false);
        console.log('Request for GraphQL API with file path is Successful');
    }
}

module.exports = {APIHelper} ;