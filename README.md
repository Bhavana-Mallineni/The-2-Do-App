# To-Do App

This is a Task manager application built with React. It allows users to create and manage tasks using a drag-and-drop interface, similar to tools like Trello. Users can add, update, and delete lists and cards, making it a flexible tool for organizing tasks, projects, or personal goals.

## Features

- **Drag-and-Drop Interface**: Rearrange lists and cards using drag-and-drop functionality.
- **Add New Lists**: Create new lists to organize tasks.
- **Add Cards**: Add new cards to any list.
- **Edit Cards**: Update card details such as title, description, and due date.
- **Delete Cards and Lists**: Remove cards or entire lists as needed.
- **Responsive Design**: The app is fully responsive, optimized for both mobile and desktop devices.
- **Persistent Data**: All data is saved to the browser's localStorage, so your board will remain intact even after refreshing the page.
- **Modal for Card Editing**: Edit card details in a clean, modal interface.

## Getting Started

To get a local copy of this app up and running, follow these steps:

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/The-2-Do-app.git
    cd The-2-Do-app
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Start the development server**:

    ```bash
    npm start
    ```

   This will launch the app in your browser. You can now interact with the Kanban board, add lists, add cards, and modify details.

### Usage

1. **Add a List**:
   - Click on the "+ Add another list" button to create a new list.
   - Enter the title of the list and press "Add List" to confirm.

2. **Add a Card**:
   - Inside a list, click the "Add Card" button.
   - Enter the card's title and description, then click "Add Card".

3. **Edit Card**:
   - To edit a card, click on the card title. This will open a modal where you can edit the card's title, description, and due date.
   - Click "Save" to apply the changes or "Cancel" to discard them.

4. **Delete List or Card**:
   - To delete a list, click the "Delete List" button at the top of the list.
   - To delete a card, click the "Delete" button on the card.

5. **Drag-and-Drop**:
   - You can drag lists to reorder them or drag cards across the lists to change their position.

### Technologies Used

- **React**: For building the user interface.
- **Tailwind CSS**: For styling the app.
- **localStorage**: To persist data across page reloads.


