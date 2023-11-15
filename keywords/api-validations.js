const jsonpath = require('jsonpath');
const fs = require('fs');

class APIValidations {

    /**
     * Validate the status code from the response
     * 
     * @author VISHNU PV
     * @since 25-09-2023
     * @param {*} response 
     * @param {*} expectedStatusCode 
     * @returns 
     */
    async validateStatusCode(response, expectedStatusCode) {
        try {
            const statusCode = await response.status;
            if (statusCode === expectedStatusCode) {
                console.log("=================================");
                console.log(`The status code ${statusCode} matches the expected status code ${expectedStatusCode}`);
                return true;
            } else {
                console.error(`Error: Expected status code ${expectedStatusCode} but received ${statusCode}`);
                return false;
            }
        } catch (error) {
            console.error('Error reading response');
            throw error;
        }
    }

    /**
     * Validate whether the given text contains in the response
     * 
     * @author VISHNU PV
     * @since 25-09-2023
     * @param {*} response 
     * @param {*} expectedValue 
     * @returns 
     */
    async validateInResponseBody(response, expectedValue) {
        try {
            const responseBody = await response.text;

            if (responseBody.includes(expectedValue)) {
                return true;
            } else {
                throw new Error(`Expected value "${expectedValue}" not found in response body.`);
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    /**
     * Validate entire response data
     * 
     * @author VISHNU PV
     * @since 25-09-2023
     * @param {*} response 
     * @param {*} expectedData 
     * @returns 
     */
    async validateResponseBody(response, expectedData) {
        try {
            const responseBody = await response.text;

            if (responseBody === expectedData) {
                return true;
            } else {
                throw new Error(`Response body is not as expected.`);
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    /**
     * Validate the actual JSON response against the expected JSON data from the file. 
     * 
     * @author VISHNU PV
     * @since 25-09-2023
     * @param {*} response 
     * @param {*} expectedJSONFileName 
     * @returns 
     */
    async validateJsonResponseMatch(response, expectedJSONFileName) {
        try {
            const expectedJSON = JSON.parse(fs.readFileSync(expectedJSONFileName, 'utf8'));
            const responseJSON = await response.json();

            if (JSON.stringify(responseJSON) === JSON.stringify(expectedJSON)) {
                return true;
            } else {
                throw new Error(`JSON response does not match the expected JSON file: ${expectedJSONFileName}`);
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    /**
     * Validate JsonPath from the response. 
     * 
     * @author VISHNU PV
     * @since 25-09-2023
     * @param {*} response 
     * @param {*} jsonPath 
     * @returns 
     */
    async validateJsonPath(response, jsonPath) {
        try {
            const jsonResponse = await response.json();
            const value = jsonpath.query(jsonResponse, jsonPath);

            if (value.length > 0) {
                return true;
            } else {
                throw new Error(`JSONPath expression did not match any elements: ${jsonPath}`);
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    /**
     * Validate JsonPath to string value.
     * 
     * @author VISHNU PV
     * @since 25-09-2023
     * @param {*} response 
     * @param {*} jsonPath
     * @param {*} valueToValidate 
     * @returns 
     */
    async validateJsonPathToStringValue(response, jsonPath, valueToValidate) {
        try {
            const jsonResponse = await response.json();
            const value = jsonpath.query(jsonResponse, jsonPath)[0];

            if (value === valueToValidate) {
                return true;
            } else {
                throw new Error(`Value "${value}" does not match expected value "${valueToValidate}" for JSON path: ${jsonPath}`);
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    /**
     * Validate JsonPath to integer value.
     * 
     * @author VISHNU PV
     * @since 25-09-2023
     * @param {*} response 
     * @param {*} jsonPath 
     * @param {*} valueToValidate 
     * @returns 
     */
    async validateJsonPathToIntegerValue(response, jsonPath, valueToValidate) {
        try {
            const jsonResponse = await response.json();
            const value = jsonpath.query(jsonResponse, jsonPath)[0];

            if (Number.isInteger(value) && value === valueToValidate) {
                return true;
            } else {
                throw new Error(`Value "${value}" is not an integer or does not match expected value "${valueToValidate}" for JSON path: ${jsonPath}`);
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    /**
     * Validate JsonPath to boolean value.
     * 
     * @author VISHNU PV
     * @since 25-09-2023
     * @param {*} response 
     * @param {*} jsonPath 
     * @param {*} valueToValidate 
     * @returns 
     */
    async validateJsonPathToBooleanValue(response, jsonPath, valueToValidate) {
        try {
            const jsonResponse = await response.json();
            const value = jsonpath.query(jsonResponse, jsonPath)[0];

            if (typeof value === 'boolean' && value === valueToValidate) {
                return true;
            } else {
                throw new Error(`Value "${value}" is not a boolean or does not match expected value "${valueToValidate}" for JSON path: ${jsonPath}`);
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    /**
     * Validate JsonPath to null value.
     * 
     * @author VISHNU PV
     * @since 25-09-2023
     * @param {*} response 
     * @param {*} jsonPath 
     * @returns 
     */
    async validateJsonPathToNullValue(response, jsonPath) {
        try {
            const jsonResponse = await response.json();
            const value = jsonpath.query(jsonResponse, jsonPath)[0];

            if (value === null) {
                return true;
            } else {
                throw new Error(`JSONPath does not resolve to null value: ${jsonPath}`);
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    /**
     * Validate the empty response.
     * 
     * @author VISHNU PV
     * @since 25-09-2023
     * @param {*} response 
     * @returns 
     */
    async validateEmptyResponse(response) {
        try {
            const text = await response.text;

            if (text === '') {
                return true;
            } else {
                throw new Error('Response is not empty.');
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    /**
     * Validate the status text from the response.
     * 
     * @author VISHNU PV
     * @since 25-09-2023
     * @param {*} response 
     * @param {*} expectedStatusText 
     * @returns 
     */
    async validateStatusText(response, expectedStatusText) {
        try {
            const statusText = response.statusText;

            if (statusText === expectedStatusText) {
                console.log(`Status Text: ${statusText} - As expected`)
                return true;
            } else {
                throw new Error(`Expected status text "${expectedStatusText}", but received "${statusText}".`);
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    /**
     * Validate the header from the response.
     * 
     * @author VISHNU PV
     * @since 25-09-2023
     * @param {*} response 
     * @param {*} headerName 
     * @param {*} expectedHeaderValue 
     * @returns 
     */
    async validateHeader(response, headerName, expectedHeaderValue) {
        try {
            const headerValue = response.headers()[headerName.toLowerCase()];

            if (headerValue === expectedHeaderValue) {
                return true;
            } else {
                throw new Error(`Expected header value "${expectedHeaderValue}", but received "${headerValue}".`);
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    /**
     * Validate the ContentType from the response.
     * 
     * @author VISHNU PV
     * @since 25-09-2023
     * @param {*} response 
     * @param {*} expectedContentType 
     * @returns 
     */
    async validateContentType(response, expectedContentType) {
        try {
            const contentType = response.headers()['content-type'];

            if (contentType === expectedContentType) {
                return true;
            } else {
                throw new Error(`Expected content type "${expectedContentType}", but received "${contentType}".`);
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

module.exports = APIValidations;