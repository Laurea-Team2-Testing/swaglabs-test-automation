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