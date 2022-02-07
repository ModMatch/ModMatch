*** Settings ***
Documentation     Testing functionality of signup page.
Library           SeleniumLibrary
Resource          common.resource
Test Teardown     Close All Browsers
Suite Teardown    Close All Browsers

*** Variables ***
${SIGNUP URL}      http://localhost:3000/signup
${BROWSER}         Chrome
${ERROR_PARENT}    signupErrors

*** Test Cases ***
Passwords Do Not Match
    Signup    Tan    Tom    tom@u.nus.edu    
...  123   1232
    Alert Should Be Present   Passwords do not match   

Invalid Signup
    [Template]      Invalid Signup
    Tan    Tom    tom@u.nus.edu    
...  123   123   Password must be at least 7 characters long
    Tan    Tom    tom@u.nus.ed    
...  1234567   1234567   Emails must end with @u.nus.edu
    ${SPACE}    Tom    tom@u.nus.edu    
...  1234567   1234567   Given name must be specified.
    Tan    ${EMPTY}    tom@u.nus.edu    
...  1234567   1234567   Surname must be specified.
    ${EMPTY}    ${SPACE}    tom@u.nus.edus  
...  123   123   Password must be at least 7 characters long    Emails must end with @u.nus.edu
...   Given name must be specified.     Surname must be specified.

*** Keywords ***
Open Browser To Signup Page
    Open Browser    ${SIGNUP URL}    ${BROWSER}
    Title Should Be    ModMatch

Input Given Name
    [Arguments]    ${givenName}
    Input Text    givenNameInputField    ${givenName}

Input Surname
    [Arguments]    ${surname}
    Input Text    surnameInputField    ${surname}

Input Email
    [Arguments]    ${email}
    Input Text    emailInputField    ${email}

Input Password
    [Arguments]    ${password}     ${passwordConfirmation}
    Input Text    passwordInputField    ${password}
    Input Text    passwordConfirmationInputField    ${passwordConfirmation}

Submit Signup
    Click Button    signupButton

Signup 
    [Arguments]    ${givenName}    ${surname}    ${email}    ${password}   ${passwordConfirmation}
    Open Browser To Signup Page
    Input Given Name    ${givenName}
    Input Surname   ${surname}
    Input Email    ${email}
    Input Password    ${password}    ${passwordConfirmation} 
    Submit Signup

Invalid Signup
    [Arguments]    ${givenName}    ${surname}    ${email}    ${password}   ${passwordConfirmation}   @{args}
    Signup   ${givenName}    ${surname}    ${email}    ${password}   ${passwordConfirmation}
    Error Should Show   ${ERROR_PARENT}   @{args}
    [Teardown]    Close Browser