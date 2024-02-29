Node/Express Final Project

Developing Your Own Express Application

For the final project, you will design and develop your own Express application.

For students who would like to become interns with Code the Dream, the final project is very important, because it is the best indication of how well you would succeed as an intern.

Some Ground Rules

First, it is entirely reasonable to reuse code from your previous class assignments and the provided examples. However, if you do, you need to add at least one additional data model. The additional data model should have at least five attributes, of varying data types, and should include validation for each attribute. You should implement all CRUD operations for this data model, and your user interface should allow each of the CRUD operations to be demonstrated. If you just reuse the models from class examples, that is not an adequate project.

Second, the purpose is for you to demonstrate that you know Node and Express, so focus on the rubric. Once you have met the requirements of the rubric, if you want to make the application look nice, great! But that is not the focus here.

Goal of the Application

The goal of the project is to showcase what you have learned during class. You will have the opportunity to demonstrate your knowledge and creativity. You are required to create an Express application from scratch. It should give you an opportunity to demonstrate creativity, which is important as a developer. You may find that you want to use some concepts, technologies, or npm packages we didn’t cover, which is worth some extra points so long as it doesn’t get too hard. Although you will need to keep your final project simple, think about an application you might want to create eventually. Perhaps you could implement some subset or feature of this future application.

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
12. Use best practices in the organization of application code and indentation.

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

19. Do something extra. This could be the implementation of a more complicated data model, or use of additional NPM packages, callouts to other public APIs, or whatever your creativity inspires.
20. Implement some test cases using Mocha, Chai, and Puppeteer.
21. For full stack applications, implement Swagger to document the API.

What is Node?

A runtime environment for executing JavaScript code
Used to build back-end services, Application Programing Interfaces (APIs) such as Web & Mobile Apps
Highly-scalable, data-intensive & real-time apps
Comes with a bunch of useful modules

Benefits of Node:

- Great for prototyping & agile development
- Superfast & highly scalable
- JavaScript
- Cleaner & more consistent codebase
- Largest ecosystem of open-source libs

Node Architecture
Executes JavaScript outside of browser
Chrome's v8 JavaScript engine embedded in C++ program
Not a Programming Language - Runtime environment for executing JavaScrit code
Non-blocking - Asynchronous by default
Continuously monitors event queue
Ideal for I/O-intensive apps

Node Module System
-OS
-fs
-events
-http

Node Core:
Modularity - small building blocks
Every file is considered a module
Private - variables & functions scope to module (must be explicitely exported)
Every node app has a main module

Loading a Module
Use require() function, require('[ralative path to module]')
best practice: store result in constant

Event
A signal that something has happened

Class
Container for related methods and properties

Express
Framework which gives app clean structure to handle various routes
Internally built on top of HTTP module in node

Restricting Certain Resources - Authentification
If a valid token is present the request, user can access specific data. If we have a restricted route, and the token is not present (or not valid), the server will kick back error response.

A Sample Node/Express Project

There is a sample provided that shows a recommended approach to security, as is important for both server side rendered and full stack applications. Although the sample is written in EJS, the security issues and approach also apply to full stack applications.

The code can be reused in your final project, but follow the guidelines in your rubric. Although this sample is written in EJS, there are some elements, particularly for security, that are of use to full stack developers as well. This project reuses the models from the Jobs API lesson, with a change to password validation. The project has a modest amount of styling, but careful attention to security. Here are some things to note:

1. The xss-clean package is strongly recommended for both back end and server side rendered applications.
2. Some students are having trouble configuring Helmet. Look at the example in app.js. It adds the URLs for Bootstrap. It also adds the unsafe-inline directives. These are needed, especially for Bootstrap, but so long as the sources are trusted, they don’t create much of a security risk. It also adds upgradeInsecureRequests: null. This is so that SSL is not used for fetch operations, which would otherwise cause application failures in development mode. Front ends that are served by Express should use Helmet, so this is not only for server side rendering. If your front end is not served by Express, you still need a way to configure HTTP headers so that your application is secure. The Render.com dashboard provides a way to do this, if your front end is served as a static application. This would apply to React applications not served by Express.
3. The password attribute in the User model has a required regular expression. This is to prevent trivial passwords. This approach is a little controversial, because it doesn’t protect against all dangerous passwords, and because it does make the user enter a password of a special format. It is very important to avoid trivial passwords if an application is to be secure.
4. It would be a good idea to add a Captcha to the registration form.
5. The session cookie configuration shows a good model for keeping sessions secure.
6. One can add JavaScript to the pages of server side rendered applications to do front end validation of user input. Front end validation is a good idea, although not implemented in this example. Front end validation, both for server side rendered applications and front end applications, does not suffice! You need to have validation in the models too, and in some cases in the controllers.
7. A bad practice for server side rendered applications is to do delete operations with a link. This is bad because links should never do write operations. For one thing, cross site request forgery is very easy for links. So JavaScript is added to the page to do the delete. Take a look at the example. It shows how to send the fetch() for delete. The server side then does a redirect, which must be handled in the client side JavaScript following the fetch() call.
8. There is protection against cross site request forgery (CSRF). The standard NPM package to provide this protection was CSURF. However, security vulnerabilities were discovered in that package, so it has been withdrawn. Cross site request forgery protection is very important for any application that displays forms delivered from the server side. It does require that a hidden field be added to each form. Check out the EJS pages in this project. As CSURF is no longer available, I created an alternative, which you could add to your project. See the CSRF methods in middleware/auth. Note that the CSRF token is refreshed at logon time. This approach is only secure if the session itself is secure, which is not true if the session values are held in a cookie. In this example, session values are stored in the Mongo database.

Project Concept

I would like to build a simple Express application that allows users to catalog movies. The application will allow users to sign-up and log in. Users can create, view, edit and delete movie entries. Users also can view and sort their entire list of movies. Ideally, I would want users to be able to search all movie entries from all users and choose to copy others’ movie entries to their own personal “libraries.” The ability to rate movies would also be a great feature.

I look forward to building this project out more in the future. I would like to incorporate nested data models to include information about individual cast and crew members. Different pages could be made for studios and genres. A way of crowdsourcing the entire catalog of entries such as requesting edits, updating information and removing duplicates would be great core feature to implement. User profiles would be nice, with avatars and user stats. I could also add a way of flipping through alternative cover images, titles, etc. This is all a bit too much for this project, but I like that I am working on something that I can keep working on after this class.

Data Models

Users:
-Email (required)
-Username (required)
-Hashed password

Movie entry:
-Title (required)
-Year (required)
-Director
-Genre
-Studio
-Rating (personal & average among users)

Nested data model for cast and crew:
-First name
-Last name
-Position (and character if applicable)
-Date of birth
-Date of death (if applicable)

Additional fields for the movie entry data model could include:
-“Watched it?” boolean
-Summary
-Cover image
-Headshots for cast & crew
-“Watched” counter with dates
-Notes

Features

~Sign-up, login and logout functionality
~Ability to search and sort entire catalog or personal library of movies based on: title, director, year, studio, genre, rating
~Pagination
~Ability to copy movies from entire catalog to personal library
~Form to make or edit movies entries or cast/crew entries
~Delete button to remove movie entry

Random key generator\_
https://acte.ltd/utils/randomkeygen
Encryption key 256

Cheese Movies:
Title                                       Director                                    Year    Catagory
Mousehunt
Ratatouille
Wallace & Gromit: A Grand Day Out
Boxtrolls
The Borrowers
I Want Somoeone to Eat Cheese With
Spy Fox in Dry Cereal*
Master of Cheese
Pulp Fiction
Nobody Else But You
Cheese Chasers
Tom & Jerry: Somebody Loves Me
Diary of a Wimpy Kid
Tom & Jerry: Advance & Be Mechanized
Cheese Burglar
Tom & Jerry: Tall in the Trap
Government Cheese
Maison du Bonheur
Ces fromages qu'on assassine
Chuck E. Cheese in The Galaxy 5000
Teenage Mutant Ninja Turtles
A Goofy Movie
The Wind Blows Round
An American Tail
I Am the Cheese
Benny & Joon
Kajmak in marmelada, Cheese & Jam
Cara de Queso
The Cheese Factory in the Hamlet
Cheese in the Trap
Chef
Eat Pray Love
No Reservations
Julie & Julia
Comme un Chef
Chocolat
The Menu
Eddie's Million Dollar Cook-Off
Harold & Kumar Go to White Castle
Good Burger
Clerks 2
Clerks
Supersize Me
The Grand Budapest Hotel
Burn After Reading
Coraline
The Emperor's New Groove
Sausage Party
James & The Giant Peach
Borat
Charlotte's Web
Babe
A Trip to the Moon
Waiting
Cow
Barnyard
Twister
Marie Antoinette
She's the Man
Delicious
Erin Brokovich
IT (parts)
Cow Belles
The Prince & Me
Kate & Leopold
Cheese
The Breakfast Club
Kill Bill: Volume 2
The Devil Wears Prada
Pizza: A Love Story
Mystic Pizza
Pizza Shop: An Italian-American Dream
Flowers for Algernon
Shaun the Sheep
The Men Who Stare at Goats
Artois the Goat
The Hunchback of Notre Dame
Hunger Games
Heidi
The Simpsons Movie
Cloudy with a Chance of Meatballs
More than Chocolate & Cheese
The Cheese Mites
The Pizza City You've Never Heard Of
Arrietty
Dream of Italy
The Witches
Paris, Wine & Romance
The Case of the Tainted Cheese Curds
Cheeseheads
Mere Brother Ki Dulhan
The Emissary
Small Town, Wisconsin
Sideways
Food, Inc.
Little Italy
My Big Fat Greek Wedding
The Founder
Willy Wonka & The Chocolate Factory
The Bob's Burgers Movie
Cheddar
The Wacky Adventures of Ronald McDonald*
John Ratzenburger*

To Do:

1.  ~~submit project proposal~~
2.  ~~wireframe project~~
3.  ~~install dependencies & spin up nodemon~~
4.  ~~set up basic file structure~~
5.  ~~listen on server~~
6.  ~~connect to db~~
7.  ~~set up controllers & routes structures~~
8.  ~~set up mongoose & postman~~
9.  ~~handle errors~~
10. ~~schema models & methods~~
11. ~~generate token with jwt~~
12. ~~set up register functionality~~
13. ~~set up login functionality~~
14. ~~create user model~~
15. ~~authenticate routes~~
16. ~~hash password with bcryptjs~~
17. 
18. implement query params
19. create & import film db
20. import models
21. implement CRUD functionality
22. add security packages
23. deploy to render
24. apply EJS
25. implement authentication middleware
26. implement mongoose ObjectId
27. implement query params
28. handle mongoose validation errors
29. swagger documentation?
30. dynamically set authorization header

