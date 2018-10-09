# Trellone

A Trello Clone.

## Back End

* [x] Install Express, Morgan, CORS and make basic server
* [x] Install Passport, Bcrypt and Mongoose for authentication
* [x] Create Mongoose models
  * [x] Create model for users
  * [x] Create model for boards
  * [x] Create model for lists
  * [x] Create model for cards
* [x] Create Endpoints for Login and Signup
* [x] Create Endpoint for current user
* [x] Create Endpoints for Boards
  * [x] Create Endpoint for user boards 
  * [x] Create Endpoint for single board
  * [x] Create Endpoint for new board
* [ ] Create Endpoints for Lists
  * [x] Create Endpoint for board lists
  * [x] Create Endpoint for single list
  * [x] Create Endpoint for new list
  * [ ] Create Endpoint for remove list
* [ ] Create Endpoints for Cards
  * [ ] Create Endpoint for list cards
  * [ ] Create Endpoint for single card
  * [ ] Create Endpoint for new card
  * [ ] Create Endpoint for archive list

## Front End

* [x] Create client with create-react-app
* [x] Remove c-r-a excesses :-)
* [x] Install Router and Redux modules
* [x] Set up Router
* [x] Set up Redux store
  * [x] Set up ducks for auth
  * [x] Set up ducks for boards
  * [x] Set up ducks for lists
  * [ ] Set up ducks for cards
* [x] Create Header with Signup and Login buttons
  * [x] Display name and avatar when logged in
* [x] Create Signup page
  * [x] Store returned token in Redux store
* [x] Create Login page
  * [x] Store returned token in Redux store
* [x] Create Boards page
  * [x] Redirect to login page if not logged in
  * [x] Show user boards
  * [x] Create new board
* [x] Create Board Lists page
  * [x] Redirect to login page if not logged in
  * [x] Show board lists
  * [x] Create new list
  * [ ] Show list cards
  * [ ] Create new card
