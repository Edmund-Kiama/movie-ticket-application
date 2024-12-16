//URL to be fetched
const URL = 'http://localhost:3000/films/';

//variables that will be used
const listOfMovies = document.getElementById('movie-list')
const tickets = document.getElementById('tickets');
const poster = document.getElementById('posterImage');
const title = document.getElementById('movie-title');
const runtime = document.getElementById('runtime');
const showtime = document.getElementById('showtime');

                    //DOM CONTENT LOADS
//event listener for when our DOMContent loads
document.addEventListener('DOMContentLoaded', () => {
    getMovies();
    showFirstMovie();
    
});

                    // SHOWS THE FIRST MOVIE WHEN DOM LOADS

//loads the first movie details
function showFirstMovie () {
    fetch(URL)
    .then(res => res.json())
    .then(films => movieClick(films[0]))
    .catch(error => {throw error})
}

                    //FETCH OUR MOVIES TO BE DISPLAYED

//for fetch our movies to be displayed in a list
function getMovies () {
    listOfMovies.innerHTML='';
    fetch(URL)
        .then(res => res.json())
        .then(result => {
            listOfMovies.innerHTML='';//clears ul before adding all the film list
            result.forEach(film => {
                displayMovie(film); //function used to display our film
                
            })
        })
        .catch(error => {throw error})
}

// function displayMovie (movie) {
//     let movieCard = `
//         <li>${movie.title}</li>
//     `
//     return listOfMovies.insertAdjacentHTML('beforeend', movieCard)
// }

                    //FUNCTION THAT DISPLAYS OUR FILMS IN A LIST

//for creating elements that contain film details
function displayMovie (film) {  
    //creates div
    let listContainer = document.createElement('li');
    listContainer.classList.add('film-div')
    //creates div
    let containerForSelecting = document.createElement('div')
    containerForSelecting.classList.add('selector')
    containerForSelecting.id = `film${film.id}`
    // creates li 
    let oneListingOfFilm = document.createElement('p') 
    oneListingOfFilm.textContent = `${film.title}`  
    oneListingOfFilm.classList.add('film-oneList')
    //creates buy button
    let buyTicket = document.createElement('button');
    buyTicket.textContent = 'BUY';
    buyTicket.classList.add('buyButton')
    buyTicket.id = `buyButton${film.id}` 
    buyTicket.disabled = true; //disables the button
    //creates buy button
    let deleteTicket = document.createElement('button');
    deleteTicket.textContent = 'DELETE';
    deleteTicket.classList.add('deleteButton')

    //appends elements to their appropriate positions
    containerForSelecting.append(oneListingOfFilm)
    listContainer.append(containerForSelecting)
    listContainer.append(buyTicket)
    listContainer.append(deleteTicket)
    listOfMovies.append(listContainer)

    //event Listener ---> for selecting movie to display     
    containerForSelecting.addEventListener('click', () => {
        movieClick(film);  //handles displaying the details of the film clicked

        //adjust styling based on if it is sold out
        if (film.capacity ===film.tickets_sold){
            //for sold button
            buyTicket.innerHTML = '<s>SOLD OUT!</s>';
            buyTicket.classList.remove('buyButton');
            buyTicket.classList.add('soldButton');
            //for sold movie div
            containerForSelecting.classList.remove('selector')
            containerForSelecting.classList.add('movie-sold')
            //strikethrough for sold movie
            oneListingOfFilm.innerHTML=`<s>${film.title}</s>`
            //sets tickets to sold out
            tickets.innerHTML = `Sold Out!`;
            tickets.style.backgroundColor = "#D94C44"

            title.innerHTML= `<s>${film.title}</s>`
            runtime.innerHTML = `<s>${film.runtime} mins</s>`
            showtime.innerHTML = `<s>${film.showtime}</s>`
        } else {
            tickets.style.backgroundColor = "transparent"
        }
    })

    //event listener ---> for buying tickets
    buyTicket.addEventListener('click',()=>{
        //checks if there is anything displayed at 'available tickets
        if(tickets.textContent !== '' ){
             updateTicketsAvailable(film) //updates on the DOM only
            }

        //adjust styling based on if it is sold out
        if (film.capacity ===film.tickets_sold){
            //for sold button
            buyTicket.innerHTML = '<s>SOLD OUT!</s>';
            buyTicket.classList.remove('buyButton');
            buyTicket.classList.add('soldButton');
            //for sold movie div
            containerForSelecting.classList.remove('selector')
            containerForSelecting.classList.remove('selectedFilm')
            containerForSelecting.classList.add('movie-sold')
            //strikethrough for sold movie
            oneListingOfFilm.innerHTML=`<s>${film.title}</s>`
            //sets tickets to sold out
            tickets.innerHTML = `Sold Out!`;
            tickets.style.backgroundColor = "#D94C44"

            title.innerHTML= `<s>${film.title}</s>`
            runtime.innerHTML = `<s>${film.runtime} mins</s>`
            showtime.innerHTML = `<s>${film.showtime}</s>`
        } else {
            tickets.style.backgroundColor = "transparent"
        }
    })

    //event listener ---> for delete button
    deleteTicket.addEventListener('click',() => {
        deleteFilm(film); //function that handles deletion
    })
    
}

                    //DISPLAYS FILM DETAILS SUCH AS POSTER,TICKETS FOR THE FILM CLICKED

//selects the movie to display
function movieClick (film) {
    //poster
    poster.src = `${film.poster}`
    //title
    title.textContent = `${film.title}`
    //runtime
    runtime.textContent = `${film.runtime} mins`
    //showtime
    showtime.textContent = `${film.showtime}`
    //tickets sold
    let availableTickets = film.capacity - film.tickets_sold;
    //this lets the 'sold-out' persists when the movie is reselected
    availableTickets <= 0 ? tickets.textContent = `Sold Out!`: tickets.innerHTML = `<strong>${availableTickets}</strong> tickets available`;

    //controls which film has the buy button enabled and disabled
    let allBuyButtons = document.getElementsByClassName('buyButton')
    let buyTicket = document.getElementById(`buyButton${film.id}`)
    for (let button of allBuyButtons){
        button.disabled = true; //disables all buy buttons
    }
    buyTicket.disabled = false; //enables the buy button of the selected film

    //controls the styling of which film has been selected and differentiates it from the rest (unselected)
    let allFilms = document.getElementsByClassName('selector')
    let selectedFilm = document.getElementById(`film${film.id}`)
    for (let film of allFilms){
        film.classList.remove('selectedFilm') //ensures that previously selected film have their class of selectedFilm removed
        film.classList.add('selector')
    }
    selectedFilm.classList.add('selectedFilm') //adds a class to the selected film

}

                    //UPDATES TICKETS AVAILABLE ON THE DOM
function updateTicketsAvailable (film) {
    //calcs number of available tickets
    let availableTickets = film.capacity - film.tickets_sold; 
    let tickets = document.getElementById('tickets');

    //checks if available tickets is less than 0
    if( availableTickets > 0){
        film.tickets_sold++; //adds number of ticket sold
        availableTickets--;  //subtract number of available ticket

       if (availableTickets === 1 ) {
            tickets.innerHTML = `<strong>${availableTickets}</strong> ticket available `;
        } else {
            tickets.innerHTML = `<strong>${availableTickets}</strong> tickets available `;
        }
    }
    
    //updates our db.json
    updateDb(film);
}

                    //FUNCTION THAT UPDATES THE DB.JSON

// updates our db.json on no of ticket sold 
function updateDb (film) {
    fetch(URL+film.id,{
        method: 'PATCH',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(film)
    })
    .then(res => res.json())
    .then(result => result)
    .catch(error => {throw error})
}

                    //FUNCTION THAT HANDLES DELETE
function deleteFilm (film) {
    fetch(URL+film.id,{
        method: 'DELETE',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(film)
    })
    .then(res => res.json())
    .then(result => result)
    .catch(error => {throw error})
    
    //refresh the DOM after deletion of a film
    getMovies()
    showFirstMovie()
}
