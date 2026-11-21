
*** Settings ***
Documentation     Product test cases TC-05 to TC-07 (owner: Lisa).
Resource          ../resources/common.resource
Library           Collections
Test Setup        Open Swag Labs
Test Teardown     Close Browser


*** Test Cases ***
TC-05 Sort products by price, low to high
    [Documentation]    Verify that products are sorted from lowest to highest price.
    [Tags]    TC-05    medium
    Log In As    ${STANDARD_USER}
    Product List Should Be Shown
    Select Options By    [data-test="product-sort-container"]    label    Price (low to high)
    @{price_elements}=    Get Elements    [data-test="inventory-item-price"]
    @{prices}=    Create List
    FOR    ${element}    IN    @{price_elements}
        ${price}=    Get Text    ${element}
        Append To List    ${prices}    ${price}
    END
    Should Be Equal    ${prices}[0]    $7.99
    Should Be Equal    ${prices}[-1]    $49.99

TC-06 Sort products by name, Z to A
    [Documentation]    Verify that product names are sorted in descending alphabetical order.
    [Tags]    TC-06    low
    Log In As    ${STANDARD_USER}
    Product List Should Be Shown
    Select Options By    [data-test="product-sort-container"]    label    Name (Z to A)
    @{name_elements}=    Get Elements    [data-test="inventory-item-name"]
    @{names}=    Create List
    FOR    ${element}    IN    @{name_elements}
        ${name}=    Get Text    ${element}
        Append To List    ${names}    ${name}
    END
    Should Be Equal    ${names}[0]    Test.allTheThings() T-Shirt (Red)

TC-07 Product details match the product list
    [Documentation]    Verify that the selected product details match the product list.
    [Tags]    TC-07    medium
    Log In As    ${STANDARD_USER}
    Product List Should Be Shown
    Click    [data-test="item-4-title-link"]
    Get Text    [data-test="inventory-item-name"]    ==    Sauce Labs Backpack
    Get Text    [data-test="inventory-item-price"]    ==    $29.99
    Get Element States    [data-test="add-to-cart"]    contains    visible
    Click    [data-test="back-to-products"]
    Product List Should Be Shown
