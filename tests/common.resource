*** Settings ***
Library           Collections

*** Variables ***
${LOGIN URL}      http://localhost:3000
${BROWSER}        Chrome

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

Login 
    [Arguments]    ${username}    ${password}
    Open Browser To Login Page
    Input Username    ${username}
    Input Password    ${password}
    Submit Login
    Wait Until Page Contains Element    home

Logout
    Click Link    logoutLink
    Wait Until Page Does Not Contain Element    home

Error Should Show
    [Arguments]    ${errorId}    @{errorMessages}
    ${locator} =   Evaluate    f'css:#${errorId} > div' 
    Wait Until Page Contains Element    ${locator}
    ${path} =   Evaluate    f'xpath://*[@id="${errorId}"]/child::*' 
    @{errorMessagesGenerated} =   Get WebElements   ${path}
    @{messageList} =  	Create List
    FOR   ${element}    IN    @{errorMessagesGenerated}
        ${text} =   Get Text    ${element}
        Append To List    ${messageList}    ${text}
    END
    FOR   ${message}    IN    @{errorMessages}
        List Should Contain Value    ${messageList}   ${message} 
    END