*** Settings ***
Documentation     Shopping cart test cases TC-10 and TC-11 (owner: Johnny).
Resource          ../resources/common.resource
Test Setup        Open Swag Labs
Test Teardown     Close Browser


*** Test Cases ***
TC-10 Add products to cart
    [Documentation]    Verify that added products appear in the cart and the badge count updates.
    [Tags]    TC-10    high
    Log In As    ${STANDARD_USER}
    Click        [data-test="add-to-cart-sauce-labs-backpack"]
    Get Text     [data-test="shopping-cart-badge"]    ==    1
    Click        [data-test="add-to-cart-sauce-labs-bolt-t-shirt"]
    Get Text     [data-test="shopping-cart-badge"]    ==    2
    Get Text     [data-test="remove-sauce-labs-backpack"]    ==    Remove
    Get Text     [data-test="remove-sauce-labs-bolt-t-shirt"]    ==    Remove
    Click        [data-test="shopping-cart-link"]
    Get Text     [data-test="inventory-item-name"] >> nth=0    ==    Sauce Labs Backpack
    Get Text     [data-test="inventory-item-price"] >> nth=0    ==    $29.99
    Get Text     [data-test="inventory-item-name"] >> nth=1    ==    Sauce Labs Bolt T-Shirt
    Get Text     [data-test="inventory-item-price"] >> nth=1    ==    $15.99