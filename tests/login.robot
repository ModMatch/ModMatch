*** Settings ***
Documentation     Testing functionality of login page.
Library           SeleniumLibrary
Test Teardown     Close All Browsers

*** Variables ***
${LOGIN URL}      http://localhost:3000
${BROWSER}        Chrome

*** Test Cases ***
Valid Login and Logout
    Login    tom@u.nus.edu    1234567
    Home Page Should Be Open
    Click Link    logoutLink
    Wait Until Page Does Not Contain Element    home
    Page Should Contain Element   landing


Invalid Login
    [Template]      Invalid Login
    tom@u.nus.edu    123467
    tom@u.nus        1234567
    tom@u.nus.edu    ${EMPTY}
    ${EMPTY}         1234567
    ${EMPTY}         ${EMPTY}


*** Keywords ***
Open Browser To Login Page
    Open Browser    ${LOGIN URL}    ${BROWSER}
    Title Should Be    ModMatch

Input Username
    [Arguments]    ${username}
    Input Text    emailInputField    ${username}

Input Password
    [Arguments]    ${password}
    Input Text    passwordInputField    ${password}

Submit Login
    Click Button    loginButton

Home Page Should Be Open
    Wait Until Page Contains Element    home

Login Error Should Show
    Wait Until Page Contains Element    loginErrors

Login 
    [Arguments]    ${username}    ${password}
    Open Browser To Login Page
    Input Username    ${username}
    Input Password    ${password}
    Submit Login

Invalid Login
    [Arguments]    ${username}    ${password}
    Login    ${username}    ${password}
    Login Error Should Show
    [Teardown]    Close Browser