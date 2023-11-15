const { test } = require('@playwright/test');
const { APIHelper } = require('../test-helpers/api-helper');
import createUserJsonRequestBody from '../resources/api-testing/request-payload/createUserRequestBody.json';
import getSingleUser from '../resources/api-testing/response-data/getSingleUser.json';

const resourceEndPoint = '/api/users'
const baseURL = 'https://reqres.in'
let UserID = null;

test.describe('create user and delete user endpoints', () => {

  test('create user', async ({ request }) => {
    const api_helper = new APIHelper(request);
    const createresponse = await api_helper.createUser(baseURL, resourceEndPoint, createUserJsonRequestBody);
    const UserID = await api_helper.validateCreatedUser(createresponse);
    console.log('Testcase 1 is completed- POST');
  });

  test('fetch user details', async ({ request }) => {
    const singleuser = '/api/users/12'
    const api_helper = new APIHelper(request);
    const singleUserresponse = await api_helper.getsingleUserDetails(baseURL, singleuser);
    await api_helper.validateSingleUserDetails(singleUserresponse, getSingleUser);
    console.log('Testcase 2 is completed- GET');
  });

  test('create and Delete user endpoint', async ({ request }) => {
    const api_helper = new APIHelper(request);
    const deleteResponse = await api_helper.deleteUser(baseURL, resourceEndPoint, UserID);
    await api_helper.validateDeleteUserDetails(deleteResponse);
    console.log('Testcase 3 is completed');
  });

  test('validate GraphQL test', async ({ request }) => {
    const api_helper = new APIHelper(request);
    const query = `query{
            products(id: "7") {
              name
              price
              category {
                name
              }
              vendor {
                name
                id
              }
            }
          }`;
    await api_helper.validateGraphQLAPIData("https://www.predic8.de", "/fruit-shop-graphql?", query);
    console.log('Validate GraphQL test is completed');
  });

  test('validate GraphQL test by reading query from file path', async ({ request }) => {
    const api_helper = new APIHelper(request);
    const sampleQueryFilePath = '../resources/api-testing/graphql/sample_query.txt';
    await api_helper.validateGraphQLAPIDataWithFilePath("https://www.predic8.de", "/fruit-shop-graphql?", sampleQueryFilePath);
    console.log('Validate GraphQL test is completed');
  });

});