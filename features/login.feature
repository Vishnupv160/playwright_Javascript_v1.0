 Feature: Playwright Cucumber test

  Background:
    Given I am on Home page

    @smoke
    Scenario: Scenario 1 -valid user name and password
        When Access My Account and Login option
        Then I See Login page

    @Regression
    Scenario: Scenario 2- invalid user name and password
       When I enter Username and Password
       Then I See Home page
   