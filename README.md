# Movie Ticket Application

This application provides a movie ticket management system that allows users to:
---> View a list of movies.
---> Display detailed information about a selected movie.
---> Buy tickets for movies.
---> Mark movies as sold out when tickets are unavailable.
---> Delete movies from the list.

The application uses a local server (`http://localhost:3000/films/`) as its source of data.

## Installation

To get access to the codes, you could clone the repository or download the project files using:
--->git clone 
Navigate to the project folder and open the the folder in VS Code and follow the'how to run' section of the README.

## How to Run

1. Ensure you have a JSON server running on `http://localhost:3000/films/`.
   --->json-server --watch db.json

2. Open the HTML file in a browser.

3. Interact with the movie list:
   ---> Select a movie to view details.
   ---> Buy tickets.
   ---> Delete movies.

### File Details

HTML (index.html)---> Provides the structure for the movie ticket application.
CSS (style.css) --->Styles the appearance of the application.
JavaScript (main.js) --->Implements the logic of the applications.
JSON (db.json) --->Contains data that we use to fetch via the json server

## Dependencies
The application requires a JSON Server for backend data.
It also depends on modern browser with JavaScript support.

## Features

### Movie List Display
The application fetches a list of movies from the local server and displays them in a list.
For each movie entry it includes the movie title, a "BUY" button and a "DELETE" button.

### View Movie Details
When a movie is selected, its details (poster, title, runtime, showtime, and available tickets) are displayed.
The application interface updates dynamically based on the availability of tickets.

### Ticket Purchasing
Users can click the "BUY" button to purchase tickets for a selected movie.
The number of available tickets is updated in real-time.
If all tickets are sold, the movie and "BUY" button are visually marked as "SOLD OUT."

### Delete Movies
Users can delete movies from the list using the "DELETE" button.

### Persistent Updates
All updates (ticket purchases and deletions) are synced with the backend server via API requests.


## Functions

### 1. `showFirstMovie()`
This function fetches and displays the details of the first movie in the list when the page loads.

### 2. `getMovies()`
This function fetches the list of movies from the server.
It clears the existing list before creating movie listings using `displayMovie()`.

### 3. `displayMovie(film)`
The function creates DOM elements for a single movie entry. This includes:
  --->Movie title
  --->"BUY" button
  --->"DELETE" button
It also adds event listeners for:
  ---> **Movie selection:** It displays movie details and updates the UI for sold-out movies.
  ---> **Buying tickets:** It reduces ticket availability and updates the database.
  ---> **Deleting movies:** It removes the movie from the server and refreshes the list.

### 4. `movieClick(film)`
The function updates the movie detail section with the selected movie's information.
It also displays the number of available tickets or marks the movie as "Sold Out" if tickets are unavailable.

### 5. `updateTicketsAvailable(film)`
The function calculates and updates the number of available tickets after a purchase.
It sends a `PATCH` request to the server to sync the updated ticket count by calling `updateDb(film)`, which handles the PATCH request.

### 6. `updateDb(film)`
The function sends a `PATCH` request to update the ticket sales of a movie in the database.

### 7. `deleteFilm(film)`
The function sends a `DELETE` request to remove a movie from the database.
It then refreshes the movie list and displays the first movie by calling the function `getMovies()` and `showFirstMovie()`

## API Endpoints

1. GET /films
   ---> Retrieves the list of all movies.

2. PATCH /films/:id
   ---> Updates the number of tickets sold for a specific movie.

3. DELETE /films/:id
   ---> Deletes a specific movie from the server.

## License

This project is a free open resource.

