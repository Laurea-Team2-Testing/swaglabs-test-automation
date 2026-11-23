*** Settings ***
Documentation     Authentication test cases TC-01 to TC-04 (owner: Lisa).
...               TC-01 also works as the setup check for the Robot Framework environment.
Resource          ../resources/common.resource
Test Setup        Open Swag Labs
Test Teardown     Close Browser


*** Test Cases ***
TC-01 Valid login with standard_user
    [Documentation]    Verify that a valid user can log in and reach the product list.
    [Tags]    TC-01    high
    Log In As    ${STANDARD_USER}
    Product List Should Be Shown

TC-02 Locked-out user cannot log in
    [Documentation]    Verify that a locked-out user cannot log in.
    [Tags]    TC-02    high
    Log In As    ${LOCKED_OUT_USER}
    Get Text    [data-test="error"]    ==    Epic sadface: Sorry, this user has been locked out.

TC-03 Login with wrong password
    [Documentation]    Verify that a user cannot log in with an incorrect password.
    [Tags]    TC-03    high
    Log In As    ${STANDARD_USER}    wrong_password
    Get Text    [data-test="error"]    ==    Epic sadface: Username and password do not match any user in this service

TC-04 Login with empty username or password
    [Documentation]    Verify that login is rejected when username or password is empty.
    [Tags]    TC-04    high

    # Both username and password are empty
    Log In As    ${EMPTY}    ${EMPTY}
    Get Text    [data-test="error"]    ==    Epic sadface: Username is required

    # Username is empty
    Log In As    ${EMPTY}    ${PASSWORD}
    Get Text    [data-test="error"]    ==    Epic sadface: Username is required

    # Password is empty
    Log In As    ${STANDARD_USER}    ${EMPTY}
    Get Text    [data-test="error"]    ==    Epic sadface: Password is required    