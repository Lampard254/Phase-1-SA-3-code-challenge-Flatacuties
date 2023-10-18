/* --- Hosted my db.json on GH Pages so there is no need for a local json server --- */

/*
Fetching data from the API hosted on GH Pages.
The data returned is an object of 'characters', and the array can be obtained by 'data.characters'
*/

fetch("https://arshavineroy.github.io/phase-1-week-2-code-challenge/db.json")
    .then(response => response.json())
    .then(data => {
        const array = Object.values(data.characters); // Converting the object received into an array so we can iterate

        handleData(array);
    });




/* A function to handle data returned from the API */

function handleData(data) {
  const animalsList = document.querySelector("#names-container");
  const animalImage = document.querySelector("#animal-image");
  const voteButton = document.querySelector("#vote-button");
  const voteCount = document.querySelector("#vote-count");
  const addNameToFirstP = document.querySelector("#animal-details p .first-line");
  const animalName = document.querySelector('#animal-name');
  const animalVotes = document.querySelector('#number-of-votes');
  const resetVotes = document.querySelector('#reset');

    /* Iterating over the data returned */

  data.forEach((animal) => {
    const name = animal.name;
    const image = animal.image;
    const votes = animal.votes;

    const button = document.createElement("button");
    button.classList.add("button-85")
    animalsList.appendChild(button);
    button.textContent = name; // Creating a button for each name

    button.addEventListener("click", () => { // Adding an event listener for each button
      animalName.textContent = `Name: ${name}`;
      animalVotes.textContent = `Number of votes: ${votes}`;

      addNameToFirstP.textContent = `Is ${name} the cutest animal in our collection?`;

      animalImage.innerHTML = ""; // Clear previous image

      const img = document.createElement("img");
      img.src = image;
      animalImage.appendChild(img);   // Adding an animal's image the container

      voteCount.textContent = votes; // Setting initial votes to those received from the server

      voteButton.classList.remove("voted"); // Removing the "liked" class initially so the heart icon appears 'unliked'

      voteButton.removeEventListener("click", incrementVotes); // Removing previous event listener so that votes from one animal aren't added to the next

      voteButton.addEventListener("click", incrementVotes);   // Event listener for vote incrementation when vote button is clicked
    });

    resetVotes.addEventListener('click', reset);  // reset votes once reset button is clicked

    /*
    Checking if the current animal has id: 1 and setting the animal's details as default
    Ensures that all fields are filled once the page is initially loaded.
    */

    if (animal.id === 1) {
      animalName.textContent = `Name: ${name}`;
      animalVotes.textContent = `Number of votes: ${votes}`;
      addNameToFirstP.textContent = `Is ${name} the cutest animal in our collection?`;
      const img = document.createElement("img");
      img.src = image;
      animalImage.appendChild(img);
      voteCount.textContent = votes;

      // Simulating a click event on the default animal's button, so the details are filled

      button.click();
    }
  });

  //A function to increment votes for the voteButton click event listener

  function incrementVotes() {
    const currentVotes = parseInt(voteCount.textContent);
    const updatedVotes = currentVotes + 1;    // inrementing vote count by 1 per click
    voteCount.textContent = updatedVotes;

    // Adding the "voted" class to style the heart icon to appear red to show 'liked'
    voteButton.classList.add("voted");

    // Update the paragraph with the new vote count
    animalVotes.textContent = `Number of votes: ${updatedVotes}`;
  }

  // A function to reset vote count to 0, for the resetVotes event listener
  function reset() {
    voteCount.textContent = 0;
    animalVotes.textContent = `Number of votes: 0`;
    voteButton.classList.remove("voted");
  }
}

// prevent default on form submission
const submitButton = document.querySelector('#submit-buttton')
submitButton.addEventListener('click', (e)=>{
  e.preventDefault()
})
