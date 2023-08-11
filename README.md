# mvp_forums: Write And Read For All To See.

Welcome to mvp_forums! This project is designed to simulate a forum-like experience, where users can interact with various boards, posts, and discussions. The app has been built using a combination of ASP.NET Core for the API backend and React for the user interface. It utilizes PostgreSQL as the database management system, Entity Framework for object-relational mapping, JSON Web Tokens for user authentication, and bcrypt for secure password hashing. The application is hosted on Azure, while the database is hosted on ElephantSQL.

## Table of Contents
- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Features](#features)
  - [Login](#login)
  - [Dashboard](#dashboard)
  - [Board](#board)
  - [Topic](#topic)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Author](#author)

## Introduction
The mvp_forums is a project that aims to replicate the experience of a forum platform. Users can create and log into their own accounts, navigate through various boards and participate in discussions. 

## Technologies Used
- ASP.NET Core
- React
- PostgreSQL
- Entity Framework ORM
- JSON Web Tokens (JWT)
- bcrypt
- dotnetenv 
- slugify 
- axios 
- sass 
- react-router 

## Getting Started
To get started with the Mock Forum App locally, follow these steps:

1. Clone the repository: `git clone https://github.com/VirtualVasquez/mvp-forums.git`
2. Install API dependencies: `dotnet restore`
3. Set up your PostgreSQL connection string. You'll need to create your own `.env` file at the root of the project. Refer to the `dotenv-example.txt` file to see the values that need to be included.
4. Run the sql code in the `sqlseeds` folder to construct the needed sequences and tables for the application. Start with the `sequences` folder to avoid issues.
5. Navigate to the UI directory: `cd .\ClientApp\`
6. Install UI dependencies: `npm install`
7. Start the API: `dotnet run` (from the API directory)
8. Access the app at `https://localhost:5001` in your web browser.

## Features

### Login/Create User
Upon accessing the app, users will be redirected to the login page. Here, they can securely log in using their credentials. Users can also create an account on this page if they do not already have one.

### Dashboard
The dashboard provides users with an overview of all the available boards in the forum. Users can quickly see the list of boards and select the one they're interested in.

### Board
When a user navigates to a specific board, they will find a paginated list of topics related to that board. Each topic entry includes:
- Topic title
- Author
- Number of replies
- Number of views
- A clickable link to the most recent post in the discussion

### Topic
Upon selecting a specific topic to read, users will see a paginated view of the discussion. Each page displays up to 10 posts, allowing users to follow the conversation easily. The first post in each page will always be the post the author of the topic made, so that it easy to keep in mind the original contents of the topic.

## Deployment
The Mock Forum App has been deployed on Azure, and the database is hosted on ElephantSQL. You can access the deployed app [here](https://mvp-forums.azurewebsites.net).

## Roadmap
Given more time, there are a number of features that would be implemented to create a more complete forum experience.

- A more dynamic preloader would be more indicative to the user a page is still loading. On that note, better loading times site-wide would definitely be a priority.
- A WYSIWYG (what you see is what you get) editor would be great for creating topics and making replies.
- User profile pages for users to be able to edit their own accounts, as well as be able to keep track of the forums they're currently following or have previously posted in.
- The ability to follow topics to keep track of new posts and replies made, as well as the accompanying notifications. 
- Make three types of user accounts possible: admin, moderator, and regular user. Regular user can continue to use the app as is. Moderators would have additional privileges of promoting or removing posts made on a topic, and flag troublesome users. Admins would gain further privileges of being able to construct new boards beyond the current five present and banning/deleting user profiles.


## Author

**Melvin Vasquez** - *Full-Stack Software Developer* - [Website](https://melvinvasquez.com/) | [LinkedIn](https://www.linkedin.com/in/melvin-vasquez/)