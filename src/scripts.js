//IMPORTS
// An example of how you tell webpack to use a CSS (SCSS) file
import "./css/styles.css";
import { fetchData } from "./apiCalls";
import Traveler from "./Traveler";
import Trips from "./Trips";
import Destinations from "./Destinations";

//IMAGES
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";

//GLOBAL VARIABLES
let travelerData;
let tripsData;
let destinationsData;
let currentUser;
let travelersRepo;
let tripsRepo;
let destinationsRepo;
//QUERY SELECTORS
const welcomeMessage = document.querySelector(".title");
//FUNCTIONS
const fetchUsers = () => {
  Promise.all([
    fetchData("travelers"),
    fetchData("trips"),
    fetchData("destinations"),
  ])
    .then((data) => {
      //below can be moved into an external function to for DRYness
      //   setLocalData(data);
      travelerData = data[0].travelers;
      tripsData = data[1].trips;
      destinationsData = data[2].destinations;
      createRepositories();
      displayWelcome();
    })
    .catch((error) =>
      console.log(error, "Error is coming back from the server")
    );
};

const createRepositories = () => {
  //map over travelerData array to make all instances
  console.log(travelerData);
  console.log(typeof travelerData);
  let travelerInstances = travelerData.map((traveler) => {
    return new Traveler(traveler);
  });
  currentUser = travelerInstances[0];
  //   travelersRepo = new Traveler(travelerData);
  tripsRepo = new Trips(tripsData);
  destinationsRepo = new Destinations(destinationsData);
};

const displayWelcome = () => {
  welcomeMessage.innerHTML = `<h1>Welcome ${currentUser.returnFirstName()}<h1>`;
};
//HELPER FUNCTIONS

//EVENT LISTENERS
window.addEventListener("load", () => {
  fetchUsers();
  createRepositories();
  displayWelcome();
  console.log(currentUser);
});
