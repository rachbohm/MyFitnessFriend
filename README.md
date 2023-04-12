# `MyFitnessFriend`
MyFitnessFriend is an application for tracking your macronutrient intake. It allows the user to create food items, log their intake of those items as a diary log, and then create custom meals from those diary logs. Foods and meals can also be edited and deleted.

<!-- ### Screenshots
##### Login Page
![Login]
##### Signup Page
![Signup]
##### Business Page
![BusinessPage]

[Login]: Login.png
[Signup]: Signup.png
[BusinessPage]: BusinessPage.png -->


### Features
* Foods
  * Create new food
  * Edit existing food
  * Delete existing food
  * Show details of a specific food

* Meals
  * Create new meal from a diary log of food items
  * Edit existing meal
  * Show details of an existing meal
  * Delete a meal

* Food Diary
  * Create a food diary log by adding food items
  * View existing food diary logs by day

### Technologies Used
* Node.js
* Express
* Sequelize
* Sqlite3
* React
* Redux
* Html5
* Css
* Git
* Javascript


### Setting up the application
After you have cloned the repository, navigate into the backend directory.
- Create a file called .env and copy the .env.example contents to this file (`cp .env.example .env`).
- Open a terminal for the backend folder and run `npm install`.
- To migrate and seed the database, run `npm run build`. If at any point you want to reset the database, hit `ctrl C` and then `npm run rebuild`.
- Open a terminal for the frontend folder and run `npm install`.
- To start the servers, type `npm start` in each of the frontend and backend terminals.
