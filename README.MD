# GoudaFlix

GoudaFlix is a Node.js application developed as the final project for the Advanced Node.js Echidna class at Code the Dream. It serves as a movie database management platform, allowing users to manage and organize movie records.

## Table of Contents
- [Rubric Requirements Met](#rubric-requirements-met)
- [Features](#features)
- [Planned Features](#planned-features)
- [Technologies Used](#technologies-used)
- [Deployment](#deployment)
- [License](#license)

## Rubric Requirements Met

This project meets the requirements outlined in the Code the Dream rubric for the Advanced Node.js class. Here's how it fulfills the key criteria:

1. **Models & Controllers**:
   - Multiple Mongoose data models, including User and Movie-record.
   - Authentication using JWT tokens with hashed passwords.
   - Validation of attributes to prevent the creation of invalid records.
   - CRUD operations for MovieRecord models.

2. **User Interface**:
   - Registration, logon, and logoff functionalities.
   - Full support for CRUD operations for movie records.
   - Navigation links or buttons for easy navigation.
   - Basic styling for improved user experience.

3. **Deployment**:
   - Security protections with `xss-clean` and `helmet`.
   - Deployment to Render.com for hosting.

## Features

- User authentication with JWT tokens.
- CRUD operations for managing movie records.
- Access control middleware and logic to ensure data security.
- Error handling middleware for user-friendly error messages.
- Basic styling for a visually appealing user interface.

## Planned Features

- Extended Movie Model: Enhance the movie model to include features such as a MPAA rating.
- Improved CSS Styling: Enhance the visual appearance of the application by improving CSS styling for a more polished look and feel.
- Custom Film Database: Create and import a custom film database.
- Bonus features such as searching, sorting, and pagination: Implement query parameters, searching, sorting, and pagination functionality to improve data retrieval and user experience.
- Implement some test cases using Mocha, Chai, and Puppeteer: Implement testing to ensure the reliability and robustness of the application, covering unit tests, integration tests, and possibly end-to-end tests.
- Library for Games: Create another library for games with similar functionality, providing users with a comprehensive platform for managing both movie and game records.
- Do something extra.  This could be the use of additional NPM packages, callouts to other public APIs, or whatever creativity is inspired.

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- Postman
- JWT tokens
- Render.com (for deployment)

## Deployment

The application is deployed to Render.com for hosting. Visit [big-cheddar-productions.onrender.com/](https://big-cheddar-productions.onrender.com/) to access the live version.

## License

This project is licensed under the [MIT License](LICENSE).