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
