*** Settings ***
Documentation     Testing functionality of posting.
Library           SeleniumLibrary
Resource          common.resource
Test Setup        Open Browser To Post Page
Test Teardown     Close All Browsers

*** Variables ***
${LOGIN URL}      http://localhost:3000
${BROWSER}        Chrome
${PASSWORD}       1234567
${POST_TITLE}     robotTest
${POST_DESC}      robotTestDesc123
${POST_TITLE_EDITED}    robotTest@edit123
${POST_DESC_EDITED}     robotTestDesc123edit1231231231
${MODULE_CODE}    CS1010

*** Test Cases ***
Form Displays Correctly
    [Tags]    Positive
    Checkbox Should Not Be Selected   vetting
    Checkbox Should Not Be Selected   hackathon
    Page Should Contain Element   numberMembersField
    Select Checkbox   vetting
    Page Should Not Contain Element   numberMembersField  
    Page Should Contain Element   questionsContainer
    @{questions}=   GetWebElements   xpath://*[@id="questionsContainer"]/child::*
    ${numberOfQuestions}=   Get length   ${questions}
    Click Button   addQuestionButton
    @{questions}=   GetWebElements   xpath://*[@id="questionsContainer"]/child::*
    Length Should Be   ${questions}    ${numberOfQuestions + 1}
    Unselect Checkbox   vetting
    Page Should Contain Element   numberMembersField  
    Page Should Not Contain Element   questions 
    Select Checkbox   hackathon
    Page Should Not Contain Element   moduleCodeField
    Unselect Checkbox   hackathon
    Page Should Contain Element   moduleCodeField

Post Adds Successfully
    [Tags]    Positive
    Input Text    titleInputField   ${POST_TITLE} 
    Input Text    descriptionInputField   ${POST_DESC} 
    Input Text    numberMembersField    3
    Select Checkbox   hackathon
    Submit Post
    Click On Post   ${POST_TITLE}
    Element Should Contain    titleText   ${POST_TITLE} 
    Element Should Contain    descriptionText   ${POST_DESC} 
    Element Should Contain    tagName   HACKATHON 

Post Edits Successfully
    [Tags]    Positive
    Click On Post   ${POST_TITLE}
    Click Button    editButton
    Textfield Value Should Be   titleInputField   ${POST_TITLE}
    Textfield Value Should Be   descriptionInputField   ${POST_DESC}
    Input Text    titleInputField   ${POST_TITLE_EDITED}
    Input Text    descriptionInputField   ${POST_DESC_EDITED}
    Checkbox Should Be Selected   hackathon
    Unselect Checkbox   hackathon
    Input Text    moduleCodeField   ${MODULE_CODE}
    Submit Post
    Wait Until Page Contains    ${POST_TITLE_EDITED}
    Element Should Contain    titleText   ${POST_TITLE_EDITED} 
    Element Should Contain    descriptionText   ${POST_DESC_EDITED}
    Element Should Contain    tagName   ${MODULE_CODE} 

Post Deletes Successfully
    [Tags]    Positive
    Click On Post   ${POST_TITLE_EDITED}
    Click Button    deleteButton
    Wait Until Page Contains Element    home
    Wait Until Page Does Not Contain Element    loading
    Page Should Not Contain    ${POST_TITLE_EDITED}
    

*** Keywords ***
Open Browser To Post Page
    Login   tom@u.nus.edu  ${PASSWORD}
    Wait Until Page Contains Element    home
    Click Button  addPostButton
    
Submit Post
    Click Button    postSubmitButton

Click On Post
    [Arguments]    ${postTitle}
    Wait Until Page Does Not Contain Element    loading
    Wait Until Page Contains Element    postContainer
    Wait Until Page Contains    ${postTitle}
    Wait Until Page Contains Element     xpath://*[@name="postContainer"]//h5
    Element Text Should Be    xpath://*[@name="postContainer"]//h5    ${postTitle}
    Click Element At Coordinates   xpath://*[@name="postLink"]    50    0
    Wait Until Page Contains Element    class:single-post