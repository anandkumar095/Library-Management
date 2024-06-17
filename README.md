This project is about developing an end-to-end application for Library Management. This project has two major areas:-
1. Administrator – Administrator can add categories/genres, add books in those categories along with their pdf . Administrator will also have the function of making changes to these books, categories and even delete them when required. Also Administrator will have the authority to approve/reject book requests from General User. He can also revoke access of already approved books.
2. General User- General User may signup for the e Library. There after they may request for books after signing in and can read books after access is granted.

Technologies Used:
1. Flask- To develop the Backend.
2. Vue.js- To develop frontend.
3. SQLite- Database
4. SQL Alchemy- To establish connection between application and database.
5. Bootstrap- For designing webpages
6. Redis and Celery- For scheduling jobs like daily reminder to users who are logging in,monthly report to the Administrator.

Architecture and Feature:
app.py file is a Flask application which implements all models and also a RESTful API for managing the Library Management System. It includes endpoints for user authentication, category management, book management, book search, admin reports etc.

We are following the Flask framework with Flask SQLAlchemy for database ORM, Flask JWT extended for JWT Authentication, Flask CORS for cross origin resource sharing and Flask Restful for creating APIs.

We have also implemented few celery tasks which will be run as per schedule. We are generating report on monthly basis for administrator and non login reports on daily basis for general users.

All components and webpages are defined separately using Vue and Bootstrap. Major components are Admin Dashboard, User DashBoard, Login Page, Admin Report etc. We are using Vue CLI for all Vue related works. Bootstrap is being used via CDN.

There is also a requirements.txt file which has all the dependencies listed for running this project.

Salient Features: -
1. JWT Based Token Authentication
2. Book/Category Management by Administrator
3. Request/Return Books by General User.
4. Rating System for issued books by General user.
5. Search Books based on Book Name and Author Name.
6. Scheduled Jobs- Daily reminders and monthly reports over mailhog.
7. APIs for interaction with ebooks.