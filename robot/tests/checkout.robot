*** Settings ***
Documentation     Checkout test cases TC-12 to TC-15 (owner: Johnny).
Resource          ../resources/common.resource
Test Setup        Open Swag Labs
Test Teardown     Close Browser


*** Variables ***
${FIRST_NAME}     Test
${LAST_NAME}      User
${POSTAL_CODE}    00100


*** Test Cases ***
TC-12 Complete a purchase end to end
    [Documentation]    Verify the full purchase journey (use case test).
    [Tags]    TC-12    high
    Log In As    ${STANDARD_USER}
    Click        [data-test="add-to-cart-sauce-labs-backpack"]
    Click        [data-test="shopping-cart-link"]
    Click        [data-test="checkout"]
    Fill Text    [data-test="firstName"]     ${FIRST_NAME}
    Fill Text    [data-test="lastName"]      ${LAST_NAME}
    Fill Text    [data-test="postalCode"]    ${POSTAL_CODE}
    Click        [data-test="continue"]
    Get Text     [data-test="inventory-item-name"]    ==    Sauce Labs Backpack
    Click        [data-test="finish"]
    Get Url      contains    /checkout-complete.html
    Get Text     [data-test="complete-header"]    ==    Thank you for your order!
    Get Element Count    [data-test="shopping-cart-badge"]    ==    0

TC-13 Checkout required-field validation
    [Documentation]    Verify that each required checkout field is validated (data-driven).
    [Tags]    TC-13    high
    [Setup]       Open Checkout Information Page
    [Template]    Checkout Should Show Error
    # first name     last name       postal code    expected error
    ${EMPTY}         ${EMPTY}        ${EMPTY}       Error: First Name is required
    ${FIRST_NAME}    ${EMPTY}        ${EMPTY}       Error: Last Name is required
    ${FIRST_NAME}    ${LAST_NAME}    ${EMPTY}       Error: Postal Code is required

TC-14 Order overview totals are correct
    [Documentation]    Verify that the item total, tax and total on the overview page are calculated correctly.
    [Tags]    TC-14    medium
    Log In As    ${STANDARD_USER}
    Click        [data-test="add-to-cart-sauce-labs-backpack"]
    Click        [data-test="add-to-cart-sauce-labs-bike-light"]
    Click        [data-test="shopping-cart-link"]
    Click        [data-test="checkout"]
    Fill Text    [data-test="firstName"]     ${FIRST_NAME}
    Fill Text    [data-test="lastName"]      ${LAST_NAME}
    Fill Text    [data-test="postalCode"]    ${POSTAL_CODE}
    Click        [data-test="continue"]
    Get Text     [data-test="subtotal-label"]    ==    Item total: $39.98
    Get Text     [data-test="tax-label"]         ==    Tax: $3.20
    Get Text     [data-test="total-label"]       ==    Total: $43.18

TC-15 Cancel checkout keeps the cart
    [Documentation]    Verify that cancelling checkout returns the user to the cart without losing products (state transition).
    [Tags]    TC-15    low
    [Setup]    Open Checkout Information Page
    Click        [data-test="cancel"]
    Get Url      contains    /cart.html
    Get Text     [data-test="inventory-item-name"]    ==    Sauce Labs Backpack
    Get Text     [data-test="shopping-cart-badge"]    ==    1


*** Keywords ***
Open Checkout Information Page
    [Documentation]    Logs in, adds one product and opens the "Checkout: Your Information" page.
    Open Swag Labs
    Log In As    ${STANDARD_USER}
    Click        [data-test="add-to-cart-sauce-labs-backpack"]
    Click        [data-test="shopping-cart-link"]
    Click        [data-test="checkout"]

Checkout Should Show Error
    [Documentation]    Fills the checkout fields, clicks Continue and checks the error message.
    [Arguments]    ${first_name}    ${last_name}    ${postal_code}    ${expected_error}
    Fill Text    [data-test="firstName"]     ${first_name}
    Fill Text    [data-test="lastName"]      ${last_name}
    Fill Text    [data-test="postalCode"]    ${postal_code}
    Click        [data-test="continue"]
    Get Text     [data-test="error"]    ==    ${expected_error}
    Get Url      contains    /checkout-step-one.html