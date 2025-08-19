In this project let's build a **Task Manager App** by applying the concepts we have learned till now. This project allows you to practice the concepts and techniques learned till React Course and apply them in a concrete project.

You will demonstrate your skills by creating an app that will fetch data from an internal server using a class component, displaying that data, using **component lifecycle methods**, **routing** concepts, **authentication**, and **authorization**, and adding responsiveness to the website.

This is an individual assessment. All work must be your own. You will also be given feedback by code reviewers after your project submission.

### Prerequisites

#### UI Prerequisites

<details>
<summary>Click to view</summary>

- What is Figma?
  - Figma is a vector graphics editor and prototyping tool which is primarily web-based. You can check more info on the <a href="https://www.figma.com/" target="_blank">Website</a>.
- Create a Free account in Figma
  - Kindly follow the instructions as shown in <a href="https://www.youtube.com/watch?v=hrHL2VLMl7g&t=37s" target="_blank">this</a> video to create a Free Figma account.
- How to Check CSS in Figma?
  - Kindly follow the instructions as shown in <a href="https://www.youtube.com/watch?v=B242nuM3y2s" target="_blank">this</a> video to check CSS in the Figma screen.
- Export Images in Figma screen
  - Kindly follow the instructions as shown in <a href="https://www.youtube.com/watch?v=NpzL1MONwaw" target="_blank">this</a> video to export images from the Figma screen.
  - Check <a href="https://help.trydesignlab.com/hc/en-us/articles/360011010634-How-do-I-export-images-and-PDFs-from-Sketch-or-Figma-in-my-short-course-" target="_blank">this</a> reference docs to export images in Figma screen.

</details>

#### API Prerequisites

<details>
<summary>Click to view</summary>

- What is Trello?
  - Trello is a collaboration tool that organizes your projects into boards. In one glance, Trello tells you what's being worked on, who's working on what, and where something is in a process. You can check more info on the <a href="https://trello.com" target="_blank" >Website</a>
- Create a Free account in Trello
  - Kindly follow the instructions as shown in <a href="https://www.youtube.com/watch?v=fmqOz6UBQEQ" target="_blank" >this</a> video to create the Trello Account to use the APIs.
- API Key

  - After creating your free Trello account. You can see your API Key in <a href="https://trello.com/app-key" target="_blank" >this</a>
  - After everything is successfully done, you should have an API key similar to “145a8e69ab64b7a89e11dd394e877e8b”. This will be used to make further API requests.

- Adding Return URL
  - You can add your return URL <a href="https://trello.com/app-key" target="_blank" >here</a>.
  - Kindly refer the below images.
  - <img  src="https://assets.ccbp.in/frontend/content/react-js/task-manager-add-origin.png"  alt="add origin"  style="width:400px, height:400px"  />
  - <img  src="https://assets.ccbp.in/frontend/content/react-js/task-manager-view-allowed-origins.png" alt="allowed origins" style="width:400px, height:400px" />
  - **Note:**
    - Kindly add your production url `sample.ccbp.tech` to allowed origins before publishing your project.
    - `sample.ccbp.tech` is a sample URL you can use your own URL.

</details>

#### Design Files

<details>
<summary>Click to view</summary>

- You can check the **Design Files** for different devices <a href="https://www.figma.com/file/cNqDF8HOs8KPJWTsye6zrf/Task-Manager?node-id=0%3A1" target="_blank">here</a>.

</details>

### Set Up Instructions

<details>

<summary>Click to view</summary>

- Download dependencies by running `npm install`

- Start up the app using `npm start`

</details>

### Completion Instructions

<details>

<summary>Functionality to be added</summary>

The app must have the following functionalities

- Login Route
  - Users should be able to log in/logout to their account.
- Users should be able to navigate to the home route when clicking on the home logo.
- When the data is being fetched then the Loading view should be displayed to the user.
- Home Route

  - When the user clicks the Organization Drop down then the list of organizations should be visible to the user.
  - Users should be able to change from one Organization to another by selecting a particular organization in the drop down.
  - Users should be able to see a list of Boards in the user Organization.
  - If there are no boards in the Organization then the **Create New Board** button should be displayed to the user.
  - When the user clicks **Create New Board** button then a **Model** should be visible to the user to create a new board.
  - New board with the entered name should be created when the user clicks **Create Board** after entering the board name in the Model.
  - When the user clicks the close icon in the **Create Board** Model then the Model should be closed.

- Specific Board Route :
  - When a user clicks on any board in the list of boards then the user should be able to see all available lists in that board.
  - If there are no Lists in the Board then the **Add List** button should be displayed to the user.
  - When the user clicks **Add List** button then a **Pop Over** should be visible to the user to create a new List.
- List :
  - Users should be able to add **Tasks** in a List.
  - When the user clicks **add a task** button then an input field should be visible to the user to add the task name.
  - New task with the entered name should be created when the user clicks **Create Task** after entering the task name in the input field.
- Tasks :
  - Users should be able to **Drag and Drop** the Tasks within the same list.
  - When the user Drags a Task then the appropriate styles to the task are visible to the user as shown in the Figma screens.
- When the users enter invalid route in the URL then the Page Not Found should be displayed.

</details>

### Quick Tips

<details>

<summary>Click to view</summary>

- Third party packages to be used to achieve the design or functionality
  - React Beautiful DND
    - React Beautiful DND <a  href="https://www.npmjs.com/package/react-beautiful-dnd"  target="_blank">Documentation</a>
    - Video <a  href="https://egghead.io/lessons/react-course-introduction-beautiful-and-accessible-drag-and-drop-with-react-beautiful-dnd"  target="_blank">Reference</a>
    - React Beautiful DND implementation <a  href="https://8ed5g.csb.app/"  target="_blank">CodeSandbox</a>
  - React Slick
    - React Slick <a  href="https://react-slick.neostack.com/docs/get-started"  target="_blank">Documentation</a>
    - React Slick implementation <a  href="https://w7z4v.csb.app/"  target="_blank">CodeSandbox</a>
- Use the util named `getUpdatedPosition` from the path `src/utils/index.js` to get updated Card or List Position.

</details>

### Important Note

<details>
<summary>Click to view</summary>

- Implement Drag and Drop functionality only in the Desktop screens in the Lite features. You do not need to do it for tablets and mobiles.
- Before deploying your project, change the return URL accordingly in `getReturnURL` function from the path `src/components/LoginForm/index.js` which return when the condition is false

</details>

### Resources

<details>
<summary>Data fetch URLs</summary>

- Use the values in the APIS as shown below

  - Use your Trello API Key in place of API_KEY
  - Use your return url in place of RETURN_URL
  - Use your token in place of TOKEN
  - Use Task or List or Board name in place of NAME
  - Use your organization id in place of ORGANIZATION_ID
  - Use respective List id in place of LIST_ID
  - Use respective Task id in place of CARD_ID
  - Use respective Task position in place of CARD_POSITION
  - Use true or false in place of BOOLEAN_VALUE

- Login Route:

  - **Note:** Already code has been Pre-filled, Kindly check the code in Login Form Component

  - You should use your Application clientID in place of **clientId** (Follow API Prerequisites to create your own application clientID).
  - You can get the Return URL using `getReturnURL` function. The `returnURL` value should be saved in the application's Allowed origins (Follow API Prerequisites to save `returnURL` value in the application's Allowed Origins).
  - Add the URL which was given as a value for the variable `returnURL` to your Application Allowed Origins(Follow API Prerequisites to add Return URLs) to redirect after authentication success OR failure
  - When you click on the `LOG IN WITH TRELLO` button
    - If you didn’t log in to your Trello account
      - It will take you to the Trello login app to log in.
      - It will ask your credentials to log in
      - Once your login process is done it will redirect to the Terms page, and you need to click on the `Agree` button to get the access token.
    - If you’re already login to your Trello account
      - It will directly redirect to the Terms page, and you need to click on the `Agree` button to get the access token.
  - Get Token :

    ```js
    'https://trello.com/1/OAuthAuthorizeToken?expiration=never&name=TaskManager&scope=read,write,account&key={API_KEY}&callback_method=fragment&return_url={RETURN_URL}'

    ```

    - <a href="https://developer.atlassian.com/cloud/trello/guides/rest-api/authorization/" target="_blank" >Reference</a>

- Home Route:

  - Get Member Organizations:

    ```js
    'https://api.trello.com/1/members/me?key={API_KEY}&token={TOKEN}'

    ```

    - <a href="https://developer.atlassian.com/cloud/trello/rest/api-group-members/#api-members-id-organizations-get" target="_blank" >Reference</a>

  - Get Boards in Organization:

    ```js
    'https://api.trello.com/1/organizations/{ORGANIZATION_ID}/boards?key={API_KEY}&token={TOKEN}'

    ```

    - <a href="https://developer.atlassian.com/cloud/trello/rest/api-group-organizations/#api-organizations-id-get" target="_blank" >Reference</a>

  - Create a Board:

    ```js
    'https://api.trello.com/1/boards?key={API_KEY}&token={TOKEN}&name={NAME}'

    ```

    - <a href="https://developer.atlassian.com/cloud/trello/rest/api-group-boards/#api-boards-post" target="_blank" >Reference</a>

  - Create an Organization:

    ```js
    'https://api.trello.com/1/organizations?key={API_KEY}&token={TOKEN}&displayName={NAME}'

    ```

    - <a href="https://developer.atlassian.com/cloud/trello/rest/api-group-organizations/#api-organizations-post" target="_blank" >Reference</a>

- Board Route:

  - Get Board Details:

    ```js
    'https://api.trello.com/1/boards/{BOARD_ID}/lists?key={API_KEY}&token={TOKEN}'

    ```

    - <a href="https://developer.atlassian.com/cloud/trello/rest/api-group-boards/#api-boards-id-lists-get" target="_blank" >Reference</a>

  - Create a List:

    ```js
    'https://api.trello.com/1/boards/{BOARD_ID}/lists?key={API_KEY}&token={TOKEN}&name={NAME}'

    ```

    - <a href="https://developer.atlassian.com/cloud/trello/rest/api-group-boards/#api-boards-id-lists-post" target="_blank" >Reference</a>

  - Update a List:

    ```js
    'https://api.trello.com/1/lists/{LIST_ID}?key={API_KEY}&token={TOKEN}&pos={LIST_POSITION}'

    ```

    - <a href="https://developer.atlassian.com/cloud/trello/rest/api-group-lists/#api-lists-id-put" target="_blank" >Reference</a>

  - Close a List:

    ```js
    'https://api.trello.com/1/lists/{LIST_ID}?key={API_KEY}&token={TOKEN}&closed={BOOLEAN_VALUE}'

    ```

    - <a href="https://developer.atlassian.com/cloud/trello/rest/api-group-lists/#api-lists-id-put" target="_blank" >Reference</a>

  - Create a Task:

    ```js
    'https://api.trello.com/1/cards?key={API_KEY}&token={TOKEN}&name={NAME}&idList={LIST_ID}'

    ```

    - <a href="https://developer.atlassian.com/cloud/trello/rest/api-group-cards/" target="_blank" >Reference</a>

  - Update a Task:

    ```js
    'https://api.trello.com/1/cards/{CARD_ID}?key={API_KEY}&token={TOKEN}&pos={CARD_POSITION}'

    ```

    - <a href="https://developer.atlassian.com/cloud/trello/rest/api-group-cards/#api-cards-id-put" target="_blank" >Reference</a>

  - Delete a Task:

    ```js
    'https://api.trello.com/1/cards/{CARD_ID}?key={API_KEY}&token={TOKEN}'

    ```

    - <a href="https://developer.atlassian.com/cloud/trello/rest/api-group-cards/#api-cards-id-delete" target="_blank" >Reference</a>

- Search Functionality:

  - Search a Task in Trello:

    ```js
    'https://api.trello.com/1/search?key={API_KEY}&token={TOKEN}&query={QUERY}'

    ```

    - <a href="https://developer.atlassian.com/cloud/trello/rest/api-group-search/#api-search-get" target="_blank" >Reference</a>

</details>

### Stretch Goals

If you complete the main features of the project you can try out the below features as well.

**Note:** Just a reminder the additional functionality is just extra practice using the tools we have learned. These are not required. If you do not reach the stretch goals, don't worry.

<details>

<summary>Additional Functionality to be added</summary>

- Users should be able to view and use the website responsively on mobile, tablet, desktop devices.
- Home Route

  - Users should be able to create an Organization by clicking **Create new Organization** button.
  - When the user clicks **Create new Organization** button then a Model should be displayed to the user to add an Organization.
  - New Organization with entered name should be created when user clicks **Create Organization** after entering Organization name in the input field.
  - The Modal should be closed when the user clicks the close icon.

- Lists

  - Users should be able to **Drag and Drop** the Lists in the board in Desktop.
  - When the user Drags a List then the appropriate styles to the List are visible to the user as shown in the Figma screens.
  - Users should be able to update list names by clicking on the list name.
  - When the user clicks the **popover menu** then the **Close List** option should be visible to the user.
  - When the user clicks the **Close List** option in the **popover menu** then the list should be deleted from the Board.

- Tasks

  - When the user clicks the task then the Task details should be visible in the modal.
  - Users should be able to update the task name by clicking on the task name.
  - When the user clicks the delete option in the task modal then the task should be deleted in that particular list.
  - Users should be able to add and update the description of a particular Task in the Task modal.
  - Users should be able to add a comment to a particular Task in the Task modal.

- Search Functionality
  - Users should be able to search for Tasks with task names.
  - When the user provides the Task name which is not in the database then the No results view should be displayed as shown in the Figma screens.
  - When the users click a task, it should open a Task modal with respective task details.

</details>

### Project Submission Instructions

- For Mini Projects, you no need to submit the code using `ccbp submit RJSCMBLK2F`, Though you submit the test cases may or may not succeed and you can ignore the result, Test cases will be added soon.

- For Mini Projects, you need to only publish/deploy the code using `ccbp publish RJSCMBLK2F domain_name.ccbp.tech`. So that our team will be able to see that code and deployed URL( Ex: something.ccbp.tech) and will share feedback to you if required.

> ### _Things to Keep in Mind_
>
> - All components you implement should go in the `src/components` directory.
> - **Do not remove the pre-filled code**
> - Want to quickly review some of the concepts you’ve been learning? Take a look at the Cheat Sheets.
