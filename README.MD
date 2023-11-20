Node/Express Final Project

Developing Your Own Express Application

For the final project, you will design and develop your own Express application.

For students who would like to become interns with Code the Dream, the final project is very important, because it is the best indication of how well you would succeed as an intern.

Some Ground Rules

First, it is entirely reasonable to reuse code from your previous class assignments and the provided examples. However, if you do, you need to add at least one additional data model. The additional data model should have at least five attributes, of varying data types, and should include validation for each attribute. You should implement all CRUD operations for this data model, and your user interface should allow each of the CRUD operations to be demonstrated. If you just reuse the models from class examples, that is not an adequate project.

Second, the purpose is for you to demonstrate that you know Node and Express, so focus on the rubric. Once you have met the requirements of the rubric, if you want to make the application look nice, great! But that is not the focus here.

Goal of the Application

The goal of the project is to showcase what you have learned during class. You will have the opportunity to demonstrate your knowledge and creativity. You are required to create an Express application from scratch. It should  give you an opportunity to demonstrate creativity, which is important as a developer. You may find that you want to use some concepts, technologies, or npm packages we didn’t cover, which is worth some extra points so long as it doesn’t get too hard. Although you will need to keep your final project simple, think about an application you might want to create eventually. Perhaps you could implement some subset or feature of this future application.

There are two options for building the project. You can build it with a front end that calls back end APIs with fetch() calls (full stack). Or, you can build it using server side rendering with the EJS templating language. Either choice is fine.

If you choose the full stack option, you can build the front end using ordinary HTML, CSS, and JavaScript, or you can use React. If you build it using ordinary HTML etc., then you can serve it up from the public folder of your Express application. If you build it using React, there are ways to have Express serve up a React application, so you can do this if you choose, but we haven’t learned about it and you don’t need to do this. You could instead deploy the React front end separately.

Requirements for the Project (Rubric)

1. Create a Node/Express application from scratch using the MongoDB database. It must contain the following elements: 

Models & Controllers

2. At least two Mongoose data models. One of these must be a User data model, as you need to implement logon.
3. Implement user registration and logon. If you are doing server side rendering, authentication must use Passport. If you are doing a full stack project, authentication must use JWT tokens. Passwords must be stored hashed.
4. Model attributes should use several different data types (number, string, boolean, date, array etc.).
5. Include validation of your attributes to prevent the creation of invalid records.
6. For any models beside the User model, implement all the CRUD (create, read, update, delete) operations in your controllers and routes.
7. Bonus: implement some non-CRUD operations (like searching, sorting, paging, etc.).
8. Implement access control middleware so that at least the create/update/delete operations require authentication. You can have unauthenticated read operations if it makes sense in your application.
9. Implement access control logic in your controllers, so that one user can’t access another user’s data. This logic must be present for every controller operation or your application is not secure.
10. Include appropriate notifications to the user. For full stack applications, the messages should be returned as needed with the API. (For some APIs, the HTTP status code suffices.) Then the front end displays the message or messages to the user. For server side rendered applications, you need to store the message in the user session, perhaps using the connect-flash NPM package.
11. Implement error handling middleware so that all exceptions and error conditions are handled and so that the user gets user friendly messages for each event.
12. Use best practices in the organization of application code and in indentation. You may want to use eslint and prettier to make sure your code complies.

User Interface

The user interface is the front end for full stack applications, or the EJS views for server side rendered applications. In either case, the UI should have these capabilities:

13. Registration, logon, and logoff are supported.
14. All CRUD operations for each of the data models besided the User model are supported.
15. Links or buttons should be provided to help the users navigate the application.
16. Style your application. Again, this is not the focus, so keep it simple until you have done everything else.

Deployment

17. Include security protections for your application. Include security packages like xss-clean and helmet, appropriately configured.
18. Deploy the application to Render.com.

Bonus Items (these are entirely optional)

19. Do something extra.  This could be the implementation of a more complicated data model, or use of additional NPM packages, callouts to other public APIs, or whatever your creativity inspires.
20. Implement some test cases using Mocha, Chai, and Puppeteer.
21. For full stack applications, implement Swagger to document the API.