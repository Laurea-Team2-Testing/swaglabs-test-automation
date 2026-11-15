*** Settings ***
Documentation    Shared keywords for all Swag Labs test suites.
Library          Browser
Resource         variables.resource


*** Keywords ***
Open Swag Labs
    [Documentation]    Opens a new browser on the Swag Labs login page.
    New Browser    ${BROWSER}    headless=${HEADLESS}
    New Page       ${BASE_URL}

Log In As
    [Documentation]    Logs in with the given user. The password defaults to secret_sauce.
    [Arguments]    ${username}    ${password}=${PASSWORD}
    Fill Text    [data-test="username"]    ${username}
    Fill Text    [data-test="password"]    ${password}
    Click        [data-test="login-button"]

Product List Should Be Shown
    [Documentation]    Checks that the product list page is open.
    Get Url     contains    /inventory.html
    Get Text    [data-test="title"]    ==    Products
