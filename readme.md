
# Project Name



## Project Overview

I have used Material UI library in ReactJS for the front end and ExpressJS for the backend. Additionally I used MySQL as a database. The table structure for storing the details in the database is as follows:

+-------------------+--------------+------+-----+---------+----------------+
| Field             | Type         | Null | Key | Default | Extra          |
+-------------------+--------------+------+-----+---------+----------------+
| id                | int          | NO   | PRI | NULL    | auto_increment |
| Fname             | varchar(255) | YES  |     | NULL    |                |
| Lname             | varchar(255) | YES  |     | NULL    |                |
| SchoolName        | varchar(255) | YES  |     | NULL    |                |
| City              | varchar(255) | YES  |     | NULL    |                |
| State             | varchar(255) | YES  |     | NULL    |                |
| ProgramOfInterest | json         | YES  |     | NULL    |                |
| resume            | longblob     | YES  |     | NULL    |                |
| DOB               | date         | YES  |     | NULL    |                |
| email             | varchar(255) | YES  |     | NULL    |                |
+-------------------+--------------+------+-----+---------+----------------+



## Prerequisites

Detail the prerequisites that users or developers need to have in place before they can use or contribute to your project. For example:

- Node.js and npm (Node Package Manager)
- MySQL or other SQL database
- Git (for version control)

  ### Installation



1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo.git

2. For backend dependencies
    ```bash
   cd backend
   npm install
   
3. For frontend dependencies
    ```bash
   cd application
   npm install

I
