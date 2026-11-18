*** Settings ***
Documentation     Logout and Reset App State test cases TC-08 and TC-09 (owner: Johnny).
Resource          ../resources/common.resource
Test Setup        Open Swag Labs
Test Teardown     Close Browser


*** Test Cases ***
TC-08 Logout and protected page access
    [Documentation]    Verify that logout ends the session and the shop cannot be opened without logging in.
    [Tags]    TC-08    high
    Log In As    ${STANDARD_USER}
    Click        id=react-burger-menu-btn
    Click        [data-test="logout-sidebar-link"]
    Get Url      ==    ${BASE_URL}/
    Go To        ${BASE_URL}/inventory.html
    Get Text     [data-test="error"]    ==    Epic sadface: You can only access '/inventory.html' when you are logged in.