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
let tripInstances;
let destinationInstances;

//QUERY SELECTORS
const welcomeMessage = document.querySelector(".title");
const totalSpend = document.querySelector(".total-spend");
const dashboardButton = document.querySelector("#dashboard");
const pastStaysButton = document.querySelector("#pastTrips");
const upcomingStaysButton = document.querySelector("#upcomingTrips");
const pendingStaysButton = document.querySelector("#pendingTrips");
const userInput = document.querySelector(".user-input");
const bookingOptions = document.querySelector(".booking-options");
const pastStaysView = document.querySelector(".past-stays-view");
const upcomingStaysView = document.querySelector(".upcoming-stays-view");
const pendingStaysView = document.querySelector(".pending-stays-view");

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
      displayTotalPrice();
    })
    .catch((error) =>
      console.log(error, "Error is coming back from the server")
    );
};

const createRepositories = () => {
  let travelerInstances = travelerData.map((traveler) => {
    return new Traveler(traveler);
  });
  currentUser = travelerInstances[0];
  tripInstances = tripsData.map((trip) => {
    return new Trips(trip);
  });
  destinationInstances = destinationsData.map((destination) => {
    return new Destinations(destination);
  });
};

const displayWelcome = () => {
  welcomeMessage.innerHTML = `<h1>Welcome ${currentUser.returnFirstName()}<h1>`;
};

const displayTotalPrice = () => {
  totalSpend.innerHTML = `<h2>You Spent ${currentUser.calculateTotalSpent(
    tripInstances,
    destinationInstances
  )} on Trips</h2>`;
};

const displayDashboard = () => {
  userInput.classList.remove("hidden");
  bookingOptions.classList.remove("hidden");
  pastStaysView.classList.add("hidden");
  upcomingStaysView.classList.add("hidden");
};

const displayPastStays = () => {
  //dom manipulation
  userInput.classList.add("hidden");
  bookingOptions.classList.add("hidden");
  upcomingStaysView.classList.add("hidden");
  pendingStaysView.classList.add("hidden");
  pastStaysView.classList.remove("hidden");
};

const displayUpcomingStays = () => {
  userInput.classList.add("hidden");
  bookingOptions.classList.add("hidden");
  pastStaysView.classList.add("hidden");
  pendingStaysView.classList.add("hidden");
  upcomingStaysView.classList.remove("hidden");
};

const displayPendingStays = () => {
  userInput.classList.add("hidden");
  bookingOptions.classList.add("hidden");
  pastStaysView.classList.add("hidden");
  upcomingStaysView.classList.add("hidden");
  pendingStaysView.classList.remove("hidden");
};
//HELPER FUNCTIONS

//EVENT LISTENERS
window.addEventListener("load", () => {
  fetchUsers();
});
dashboardButton.addEventListener("click", () => {
  displayDashboard();
});
pastStaysButton.addEventListener("click", () => {
  displayPastStays();
});
upcomingStaysButton.addEventListener("click", () => {
  displayUpcomingStays();
});
pendingStaysButton.addEventListener("click", () => {
  displayPendingStays();
});
