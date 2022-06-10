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
let currentDate;
let firstOfYear;
let pastTrips;
let upcomingTrips;
let pendingTrips;

//QUERY SELECTORS
const welcomeMessage = document.querySelector(".title");
const totalSpend = document.querySelector(".total-spend");
const dashboardButton = document.querySelector("#dashboard");
const pastTripsButton = document.querySelector("#pastTrips");
const upcomingTripsButton = document.querySelector("#upcomingTrips");
const pendingTripsButton = document.querySelector("#pendingTrips");
const userInput = document.querySelector(".user-input");
const bookingOptions = document.querySelector(".booking-options");
const pastTripsView = document.querySelector(".past-stays-view");
const upcomingTripsView = document.querySelector(".upcoming-stays-view");
const pendingTripsView = document.querySelector(".pending-stays-view");
const pastDestinationList = document.querySelector(
  ".past-destinations-display"
);
const upcomingDestinationList = document.querySelector(
  ".upcoming-destinations-display"
);
const pendingDestinationList = document.querySelector(
  ".pending-destinations-display"
);
const possibleDestinationList = document.querySelector(
  ".possible-destinations-display"
);

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
      currentDate = new Date().toISOString().split("T")[0].split("-").join("/");
      setCurrentYear();
      displayTotalPrice();
      displayPossibleDestinations();
    })
    .catch((error) =>
      console.log(error, "Error is coming back from the server")
    );
};

const createRepositories = () => {
  let travelerInstances = travelerData.map((traveler) => {
    return new Traveler(traveler);
  });
  currentUser = travelerInstances[46];
  tripInstances = tripsData.map((trip) => {
    return new Trips(trip);
  });
  destinationInstances = destinationsData.map((destination) => {
    return new Destinations(destination);
  });
  currentDate = new Date();
};

const displayWelcome = () => {
  welcomeMessage.innerHTML = `<h1>Welcome ${currentUser.returnFirstName()}<h1>`;
};

const displayTotalPrice = () => {
  totalSpend.innerHTML = `<h3>You Spent ${currentUser.calculateTotalSpent(
    tripInstances,
    destinationInstances,
    firstOfYear
  )} on Trips</h3>`;
};

const displayDashboard = () => {
  userInput.classList.remove("hidden");
  bookingOptions.classList.remove("hidden");
  pastTripsView.classList.add("hidden");
  upcomingTripsView.classList.add("hidden");
  pendingTripsView.classList.add("hidden");
  displayPossibleDestinations();
};

const displayPastTrips = () => {
  userInput.classList.add("hidden");
  bookingOptions.classList.add("hidden");
  upcomingTripsView.classList.add("hidden");
  pendingTripsView.classList.add("hidden");
  pastTripsView.classList.remove("hidden");
  displayPastDestinations();
};

const displayUpcomingTrips = () => {
  userInput.classList.add("hidden");
  bookingOptions.classList.add("hidden");
  pastTripsView.classList.add("hidden");
  pendingTripsView.classList.add("hidden");
  upcomingTripsView.classList.remove("hidden");
  displayUpcomingDestinations();
};

const displayPendingTrips = () => {
  userInput.classList.add("hidden");
  bookingOptions.classList.add("hidden");
  pastTripsView.classList.add("hidden");
  upcomingTripsView.classList.add("hidden");
  pendingTripsView.classList.remove("hidden");
  displayPendingDestinations();
};

//HELPER FUNCTIONS
const displayPossibleDestinations = () => {
  const possibleTrips = tripInstances.map((trip) => trip.destinationID);
  //displaying the pics
  const possibleDestinations = destinationInstances
    .filter((place) => possibleTrips.includes(place.id))
    .map((place) => {
      const tripDisplay = `
      <div class="trip-display" id="${place.id}" role="button">
        <h2>${place.destination}</h2>
         <img class="destination-preview" src="${place.image}" alt="${place.alt}" />
         <div class="destination-info">
           <p class="destination-preview-cost">This experience only costs $${place.estimatedLodgingCostPerDay} per night</p>
         </div>
       </div>
        `;
      return tripDisplay;
    })
    .join("");
  possibleDestinationList.innerHTML = possibleDestinations;
};

const displayPendingDestinations = () => {
  findPendingTrips();
  const pendingDestinations = destinationInstances
    .filter((place) => pendingTrips.includes(place.id))
    .map((place) => {
      const tripDisplay = `
      <div class="trip-display" id="${place.id}" role="button">
        <h2>${place.destination}</h2>
         <img class="destination-preview" src="${place.image}" alt="${place.alt}" />
         <div class="destination-info">
           <p class="destination-preview-cost">This experience will be $${place.estimatedLodgingCostPerDay} per night</p>
         </div>
       </div>
        `;
      return tripDisplay;
    })
    .join("");
  pendingDestinationList.innerHTML = pendingDestinations;
};

const displayUpcomingDestinations = () => {
  findUpcomingTrips();
  //displaying the pics
  const upcomingDestinations = destinationInstances
    .filter((place) => upcomingTrips.includes(place.id))
    .map((place) => {
      const tripDisplay = `
      <div class="trip-display" id="${place.id}" role="button">
        <h2>${place.destination}</h2>
         <img class="destination-preview" src="${place.image}" alt="${place.alt}" />
         <div class="destination-info">
           <p class="destination-preview-cost">This experience will be $${place.estimatedLodgingCostPerDay} per night</p>
         </div>
       </div>
        `;
      return tripDisplay;
    })
    .join("");
  upcomingDestinationList.innerHTML = upcomingDestinations;
};

const displayPastDestinations = () => {
  findPastTrips();
  //display past trips
  const pastDestinations = destinationInstances
    .filter((place) => pastTrips.includes(place.id))
    .map((place) => {
      const tripDisplay = `
    <div class="trip-display" id="${place.id}" role="button">
      <h2>${place.destination}</h2>
       <img class="destination-preview" src="${place.image}" alt="${place.alt}" />
       <div class="destination-info">
         <p class="destination-preview-cost">This experience was $${place.estimatedLodgingCostPerDay} per night</p>
       </div>
     </div>
      `;
      return tripDisplay;
    })
    .join("");
  pastDestinationList.innerHTML = pastDestinations;
};

const findPastTrips = () => {
  pastTrips = tripInstances
    .filter((trip) => trip.userID === currentUser.id)
    .filter((trip) => trip.status === "approved")
    .filter((trip) => trip.date < currentDate)
    // .sort((a, b) => new Date(b.date) - new Date(a.date));
    .map((trip) => trip.destinationID);
  console.log(pastTrips);
  return pastTrips;
};

const findUpcomingTrips = () => {
  upcomingTrips = tripInstances
    .filter((trip) => trip.userID === currentUser.id)
    .filter((trip) => trip.status === "approved")
    .filter((trip) => trip.date > currentDate)
    // .sort((a, b) => new Date(b.date) - new Date(a.date));
    .map((trip) => trip.destinationID);
  return upcomingTrips;
};

const findPendingTrips = () => {
  pendingTrips = tripInstances
    .filter((trip) => trip.userID === currentUser.id)
    .filter((trip) => trip.status === "pending")
    // .sort((a, b) => b.date - a.date)
    .map((trip) => trip.destinationID);
  return pendingTrips;
};

const setCurrentYear = () => {
  const currentYear = currentDate.split("/")[0];
  let currentFirst = [];
  currentFirst.push(currentYear);
  currentFirst.push("01");
  currentFirst.push("01");
  firstOfYear = currentFirst.join("/");
  return firstOfYear;
};

const sortTripsLeastRecent = () => {
  const tripsSorted = tripInstances.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  return tripsSorted;
};

const sortTripsMostRecent = () => {
  const tripsSorted = tripInstances.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  return tripsSorted;
};

//EVENT LISTENERS
window.addEventListener("load", () => {
  fetchUsers();
});
dashboardButton.addEventListener("click", () => {
  displayDashboard();
});
pastTripsButton.addEventListener("click", () => {
  displayPastTrips();
});
upcomingTripsButton.addEventListener("click", () => {
  displayUpcomingTrips();
});
pendingTripsButton.addEventListener("click", () => {
  displayPendingTrips();
});
