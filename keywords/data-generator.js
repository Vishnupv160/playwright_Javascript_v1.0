const { faker } = require('@faker-js/faker')

class DataGenerator {
  /**
   * Method to get name prefix
   * 
   * @author Nilin Pramod
   * @since 07-07-2023
   * @returns Prefix
   */
  async getNamePrefix() {
    return faker.person.prefix();
  }
  /**
   * Method to get name Suffix
   * 
   * @author Nilin Pramod
   * @since 07-07-2023
   * @returns suffix
   */
  async getNameSuffix() {
    return faker.person.suffix();
  }
  /**
   * Method to get the First Name
   * @author Nilin Pramod
   * @since 07-07-2023
   * @returns First Name
   */
  async getFirstName() {

    let name = faker.person.firstName();
    return name;

  }

  /**
   * Method to get the Last Name
   * 
   * @author Nilin Pramod
   * @since 07-07-2023
   * @returns Last Name
   */
  async getLastName() {
    return faker.person.lastName();
  }

  /**
   * Method to get the Full Name
   * @author Nilin Pramod
   * @since 10-07-2023
   * @returns Full name
   */

  async getFullName() {
    return faker.person.fullName();
  }

  /**
   * Method to get the Middle Name
   * @author Nilin Pramod
   * @since 10-07-2023
   * @returns Middle Name
   */
  async getMiddleName() {
    return faker.person.middleName();
  }

  /**
   * Method to get the Building Number
   * @author Nilin Pramod
   * @since 10-07-2023
   * @returns Building Number
   */
  async getBuildingNumber() {
    return faker.location.buildingNumber();
  }
  /**
   * Method to get the Street Name
   * @author Nilin Pramod
   * @since 10-07-2023
   * @returns 
   */
  async getStreetName() {
    return faker.location.street();
  }

  /**
   * Method to get the Street Address
   * 
   * @author Nilin Pramod
   * @since 10-07-2023
   * @returns Street Adress
   */
  async getStreetAddress() {
    return faker.location.streetAddress();
  }

  /**
   * Method to get the Secondary Address
   * 
   * @author Nilin Pramod
   * @since 10-07-2023
   * @returns Secondary Address
   */
  async getSecondaryAddress() {
    return faker.location.secondaryAddress();
  }

  /**
   * Method to get the City Name
   * 
   * @author Nilin Pramod
   * @since 10-07-2023
   * @returns City Name
   */
  async getCity() {
    return faker.location.city();
  }

  /**
   * Method to get state
   * @author Nilin Pramod
   * @since 10-07-2023
   * @returns State
   */
  async getState() {
    return faker.location.state();
  }

  /**
   * Method to get Country
   * @author Nilin Pramod
   * @since 10-07-2023
   * @returns Country
   */
  async getCountry() {
    return faker.location.country();
  }

  /**
   * Method to get Country code
   * @author Nilin Pramod
   * @since 10-07-2023
   * @returns Country code
   */
  async getCountryCode() {
    return faker.location.countryCode();
  }

  /**
   * Method to get the Zip code
   * @author Nilin Pramod
   * @since 10-07-2023
   * @returns Zip Code
   */
  async getZipCode() {
    return faker.location.zipCode();

  }

  /**
   * Method to get the Time Zone
   * @author Nilin Pramod
   * @since 11-07-2023
   * @returns Time Zone
   */
  async getTimeZone() {
    return faker.location.timeZone();
  }

  /**
   * Method to get the Latitude
   * @author Nilin Pramod
   * @since 11-07-2023
   * @returns Latitude
   */
  async getLatitude() {
    return faker.location.latitude();
  }


  /**
   * Method to get the Longitude
   * @author Nilin Pramod
   * @since 11-07-2023
   * @returns Longitude
   */
  async getLongitude() {
    return faker.location.longitude();
  }
  /**
   * Method to get Latitude and Longitude
   * @author Nilin Pramod
   * @since 11-07-2023
   * @returns Lattitude and Longitude
    */
  async getLatitudeLongitude() {
    const latlong = [];
    latlong[0] = faker.location.latitude();
    latlong[1] = faker.location.longitude();
    return latlong;
  }

  /**
   * Method to get Cell Phone number
   * @author Nilin Pramod
   * @since 11-07-2023
   * @returns Cell Phone number
   */
  async getCellphone() {
    return faker.phone.number();
  }


  /**
   * Method to get Airport Name
   * @author Nilin Pramod
   * @since 11-07-2023
   * @returns 
   */
  async getAirport() {
    return faker.airline.airport();
  }

  /**
   * Method to get Aircraft type
   * @author Nilin Pramod
   * @since 11-07-2023
   * @returns Aircraft Type
   */
  async getAircraftType() {
    return faker.airline.aircraftType();
  }

  /**
    * Method to get Airlines
    * @author Nilin Pramod
    * @since 11-07-2023 
    * @returns Airline name
    * @returns Iata Code
  */
  async getAirline() {
    return faker.airline.airline();

  }
  /**
   * Method to get Flight Number
   * @author Nilin Pramod
   * @since 11-07-2023 
   * @returns Flight Number
   */
  async getFlightNumber() {
    return faker.airline.flightNumber();

  }
  /**
   * Method to get Internet Address
   * @author Nilin Pramod
   * @since 11-07-2023 
   * @returns ip address 
   */
  async getIPAddress() {
    return faker.internet.ip;

  }
  /**
   * Method to get Domain Name
   * @author Nilin Pramod
   * @since 11-07-2023 
   * @returns Domain Name 
   */
  async getDomainName() {
    return faker.internet.domainName();
  }

  /**
   * Method to get sample email
   * @author Nilin Pramod
   * @since 11-07-2023 
   * @returns email
   */
  async getEmail() {
    return faker.internet.exampleEmail();
  }

  /**
   * Method to get integer digit
   * @author Nilin Pramod
   * @since 11-07-2023 
   * @returns digit
   * 
   */
  async getDigit() {
    return faker.number.int();

  }
  /**
   * Method to get random digit between 0 and passed value
   * @author Nilin Pramod
   * @since 11-07-2023 
   * @param {*} value 
   * @returns digit
   */
  async getDigit(value) {
    return faker.number.int(value);
  }
  /**
   * Method to get random digit between min and max value
   * @author Nilin Pramod
   * @since 11-07-2023 
   * @param {*} minvalue 
   * @param {*} maxvalue 
   * @returns digit
   */
  async getDigit(minvalue, maxvalue) {
    return faker.number.int({ min: minvalue, max: maxvalue });
  }

  /**
   * Method to get random float number between min and max value with a given precision
   * @author Nilin Pramod
   * @since 11-07-2023 
   * @param {*} minvalue 
   * @param {*} maxvalue 
   * @param {*} precision 
   * @returns flaot value
   */
  async getRandomDouble(minvalue, maxvalue, precision) {
    return faker.number.float({ min: minvalue, max: maxvalue, precision: precision });

  }

  /**
   * Method to get vehicle model
   * @author Nilin Pramod
   * @since 11-07-2023 
   * @returns 
   */
  async getVehicleModel() {
    return faker.vehicle.model();
  }
  /**
   * Method to get vehicle Manufaturer
   * @author Nilin Pramod
   * @since 11-07-2023 
   * @returns 
   */
  async getVehicleManufacturer() {
    return faker.vehicle.manufacturer();
  }
  /**
   * Method to get vehicle insurance number
   * @author Nilin Pramod
   * @since 11-07-2023
   * @returns 
   */
  async getVehicleVIN() {
    return faker.vehicle.vin();
  }

  /**
   * Method to get sentences based on min and max value
   * @author Nilin Pramod
   * @since 11-07-2023 
   * @param {*} minwords 
   * @param {*} maxwords 
   * @returns Sequence of words
   */
  async getParagraph(minwords, maxwords) {
    return faker.word.words({ count: { min: minwords, max: maxwords } })
  }
  /**
   * Method to get currency code
   * @author Nilin Pramod
   * @since 11-07-2023 
   * @returns currency code
   */
  async getCurrencyCode() {
    return faker.finance.currencyCode();
  }
  /**
   * Method to get Credit Card number
   * @author Nilin Pramod
   * @since 11-07-2023 
   * @returns CreditCard Number
   */
  async getCreditCardNumber() {
    return faker.finance.creditCardNumber();
  }

  /**
   * Method to get Credit Card Issuer
   * @author Nilin Pramod
   * @since 11-07-2023 
   * @returns credit card Issuer
   */
  async getCreditCardIssuer() {
    return faker.finance.creditCardIssuer();
  }

  /**
   * Method to get Credit Card CVV
   * @author Nilin Pramod
   * @since 11-07-2023 
   * @returns Credit card cvv
   */
  async getCreditCardCvv() {
    return faker.finance.creditCardCVV();

  }

  /**
   * Method to get Price
   * @author Nilin Pramod
   * @since 11-07-2023 
   * @returns price
   */
  async getPrice() {
    return faker.commerce.price();
  }
  /**
   * Method to get Price within a range with symbol
   * @author Nilin Pramod
   * @since 11-07-2023 
   * @param {*} minvalue 
   * @param {*} maxvalue 
   * @param {*} symbol 
   * @returns 
   */
  async getPrice(minvalue, maxvalue, symbol) {
    return faker.commerce.price({ min: minvalue, max: maxvalue, symbol: symbol })
  }

  /**
   * Method to get UUID
   * @author Nilin Pramod
   * @since 11-07-2023 
   * @returns UUID
   */
  async getUUID() {
    return faker.string.uuid();
  }

  /**
   * Method to get alpha numeric value
   * @author Nilin Pramod
   * @since 11-07-2023 
   * @param {*} minvalue 
   * @param {*} maxvalue 
   * @returns Alphanumeric value
   */
  async getAlphaNumericValue(minlength, maxlength) {
    return faker.string.alphanumeric({ length: { min: minlength, max: maxlength } })
  }
}

module.exports = DataGenerator;