*** Settings ***
Documentation     Testing functionality of profile editing.
Library           SeleniumLibrary
Resource          common.resource
Test Setup        Open Browser To Profile Page
Test Teardown     Close All Browsers

*** Variables ***
${LOGIN URL}      http://localhost:3000
${BROWSER}        Chrome
${PASSWORD}       1234567
${ERROR_PARENT}   editProfileErrors

*** Test Cases ***
Form Displays Correctly
    [Tags]    Positive
    Textfield Value Should Be    givenNameEditInput    tom
    Textfield Value Should Be    surnameEditInput    tan
    Checkbox Should Not Be Selected   nameOrderEditCheckbox
    Checkbox Should Not Be Selected   passwordEditCheckbox
    Select Checkbox   passwordEditCheckbox
    Page Should Contain Element   newPassword
    Page Should Contain Element   newPasswordConfirmation
    Unselect Checkbox   passwordEditCheckbox
    Page Should Not Contain Element   newPassword
    Page Should Not Contain Element   newPasswordConfirmation

Name Order Changed Correctly
    [Tags]    Positive
    Select Checkbox   nameOrderEditCheckbox
    Submit Edit
    Element Text Should Be    profileName   tan tom

Given name Changed Correctly
    [Tags]    Positive
    Input Text    givenNameEditInput  tommy
    Submit Edit
    Element Text Should Be    profileName   tan tommy

Surname Changed Correctly
    [Tags]    Positive
    Input Text    surnameEditInput  tang
    Submit Edit
    Element Text Should Be    profileName   tang tommy

Password Changed Correctly
    [Tags]    Positive
    Select Checkbox   passwordEditCheckbox
    Input Text    newPassword   1234567890
    Input Text    newPasswordConfirmation   1234567890
    Submit Edit
    Set Global Variable   ${PASSWORD}   1234567890
    Logout
    Open Browser To Profile Page

All Fields Changed Correctly
    [Tags]    Positive
    Unselect Checkbox   nameOrderEditCheckbox
    Input Text    givenNameEditInput  tom
    Input Text    surnameEditInput  tan
    Select Checkbox   passwordEditCheckbox
    Input Text    newPassword   1234567
    Input Text    newPasswordConfirmation   1234567
    Submit Edit
    Set Global Variable   ${PASSWORD}    1234567
    Logout
    Open Browser To Profile Page

Password Change Too Short
    [Tags]    Negative
    Select Checkbox   passwordEditCheckbox
    Input Text    newPassword   123
    Input Text    newPasswordConfirmation   123
    Submit Edit
    Error Should Show  ${ERROR_PARENT}  Password must be at least 7 characters long

Password Change Do Not Match
    [Tags]    Negative
    Select Checkbox   passwordEditCheckbox
    Input Text    newPassword   123
    Input Text    newPasswordConfirmation   1234
    Input Text    password    ${PASSWORD}
    Click Button    editSubmitButton
    Alert Should Be Present   Passwords do not match

Given Name Not Specified
    [Tags]    Negative
    Input Text    givenNameEditInput    ${SPACE}
    Submit Edit
    Error Should Show  ${ERROR_PARENT}  Given name must be specified.

Surname Not Specified
    [Tags]    Negative
    Input Text    surnameEditInput    ${SPACE}
    Submit Edit
    Error Should Show  ${ERROR_PARENT}  Surname must be specified.

Incorrect Password
    [Tags]    Negative
    Submit Wrong Edit
    Error Should Show  ${ERROR_PARENT}  Password is incorrect

Incorrect Password Edited Values Unchanged
    [Tags]    Negative
    Input Text    givenNameEditInput    abc
    Submit Wrong Edit
    Error Should Show  ${ERROR_PARENT}  Password is incorrect
    Textfield Value Should Be    givenNameEditInput    abc

*** Keywords ***
Open Browser To Profile Page
    Login   tom@u.nus.edu  ${PASSWORD}
    Click Link    profileLink
    Wait Until Page Contains Element    profile
    Click Button    editProfileButton
    Wait Until Page Contains Element    editProfileForm

Submit Edit
    Input Text    password    ${PASSWORD}
    Click Button    editSubmitButton
    Wait Until Page Contains Element    profile

Submit Wrong Edit
    Input Text    password    1
    Click Button    editSubmitButton
    Wait Until Page Contains Element    profile

