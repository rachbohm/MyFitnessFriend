# `MyFitnessFriend`
MyFitnessFriend is an application for tracking your macronutrient intake. It allows the user to create food items, log their intake of those items as a diary log, and then create custom meals from those diary logs. Foods and meals can also be edited and deleted. There is a search bar where users can search a database (external API) of food items and view images as well as nutritional information for those items. The user can save those items into their own personal food items. Once saved, they can be edited, logged in the food diary component, or deleted.

### Screenshots
##### Search
![Search]
##### Food Diary
![Diary]

[Search]: Search.png
[Diary]: Diary.png


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
  * Click "Remember Meal" to save a food diary log to your meals
  * Remove food items from a log
  * When there are no remaining food items, the log is deleted

* Search
  * View results for your search term from an external API
  * Click on a result for additional details
  * Save a result to your personal foods
  * Edit, log in your diary, or delete search results

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

### Search Bar Implementation

I created a function to capture user input and update the corresponding React state variables. The search results only render if there is a search term and the form is submitted.

```javascript
const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setSubmitted(false);
  };
```

This function is triggered when the search bar form is submitted. It dispatches a thunk that goes to the backend, which then pings an external API using the search term. Once the response is received, it sets the state variable 'submitted' to 'true'.

```javascript
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(loadSearchResultsThunk(searchTerm)).then((result) => {
      setSubmitted(true)
    }).catch((error) => {
      console.error(error);
    });
  };
```
The search results only render if there is a search term and the form is submitted.

```javascript
{searchTerm && submitted && (
  <div className="search-results-container">
```

This function triggers when a food item from the search results is clicked. If the user is not logged in, they are prompted to log in before viewing details. Otherwise, a thunk is dispatched that pings the external API for the nutrition details for that particular food item. Once the results is received, it sets the selected food item by keying into the result object and updating the state variable. This selected food is then passed as props to another component that renders the card showing the details of the food item.

  ```javascript
  const handleFoodClick = (item) => {
    if (!sessionUser) {
      const confirmResult = window.confirm(`Please sign up or log in to view food details.\nDo you want to proceed to the login page? `);
      if (confirmResult) {
        history.push("/login");
      }
      return;
    }
    dispatch(fetchNutritionInfoThunk(item.food_name)).then((result) => {
      setSelectedFood(result.foods[0]);
    });
  };
```
FoodCard component is conditionally rendered if a food has been selected from the results list.
```javascript
   {selectedFood && (
        <div className="food-card-container">
          <FoodCard item={selectedFood} onBack={() => setSelectedFood(null)} />
        </div>
      )}
```

### Setting up the application
After you have cloned the repository, navigate into the backend directory.
- Create a file called .env and copy the .env.example contents to this file (`cp .env.example .env`).
- Open a terminal for the backend folder and run `npm install`.
- To migrate and seed the database, run `npm run build`. If at any point you want to reset the database, hit `ctrl C` and then `npm run rebuild`.
- Open a terminal for the frontend folder and run `npm install`.
- To start the servers, type `npm start` in each of the frontend and backend terminals.
