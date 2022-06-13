/* eslint-disable indent */
/* eslint-disable max-len */
//IMPORTS
// An example of how you tell webpack to use a CSS (SCSS) file
import "./css/styles.css";
import { fetchData, postData } from "./apiCalls";
import Traveler from "./Traveler";
import Trips from "./Trips";
import Destinations from "./Destinations";
import domUpdates from "./domUpdates";

import { findTrips } from "./util";
//IMAGES
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";
// import ".images/tropical-banner.jpg";

//GLOBAL VARIABLES
let travelerData;
let tripsData;
let destinationsData;
let currentUser;
let travelerInstances;
let tripInstances;
let destinationInstances;
let currentDate;
let firstOfYear;
let lastOfYear;

//QUERY SELECTORS
const dashboardButton = document.querySelector("#dashboard");
const pastTripsButton = document.querySelector("#pastTrips");
const upcomingTripsButton = document.querySelector("#upcomingTrips");
const pendingTripsButton = document.querySelector("#pendingTrips");
const possibleDestinationList = document.querySelector(
  ".possible-destinations-display"
);
const dateInput = document.querySelector(".date-filter");
const durationInput = document.querySelector(".duration-filter");
const travelersInput = document.querySelector(".travelers-filter");

//FETCH CALLS
const fetchUsers = () => {
  Promise.all([
    fetchData("travelers"),
    fetchData("trips"),
    fetchData("destinations"),
  ])
    .then((data) => {
      travelerData = data[0].travelers;
      tripsData = data[1].trips;
      destinationsData = data[2].destinations;
      createRepositories();
      setInitialDisplay();
    })
    .catch((error) => showServerError(error));
};

const submitBookingRequest = () => {
  let formCheck = handleUserInputErrors();
  if (formCheck) {
    const newTrip = makeTripRequest();
    Promise.all([postData(newTrip)]).then((data) => {
      fetchUsers();
      clearForm();
      confirmPost();
    });
  }
};

const makeTripRequest = () => {
  return {
    id: Date.now(),
    userID: currentUser.id,
    destinationID: parseInt(event.target.id),
    travelers: travelersInput.value,
    date: dateInput.value.split("-").join("/"),
    duration: durationInput.value,
    status: "pending",
    suggestedActivities: [],
  };
};

//FUNCTIONS
const createRepositories = () => {
  currentDate = new Date().toISOString().split("T")[0].split("-").join("/");
  travelerInstances = travelerData.map((traveler) => {
    return new Traveler(traveler);
  });
  currentUser = travelerInstances[46];
  tripInstances = tripsData.map((trip) => {
    return new Trips(trip);
  });
  destinationInstances = destinationsData.map((destination) => {
    return new Destinations(destination);
  });
};

const displayWelcome = () => {
  domUpdates.displayWelcome(currentUser);
};

const displayTotalPrice = () => {
  domUpdates.displayAnnualSpend(
    currentUser,
    tripInstances,
    destinationInstances,
    firstOfYear,
    lastOfYear
  );
};

const displayDashboard = () => {
  domUpdates.displayMainPage();
  displayPossibleDestinations();
};

const displayPastTrips = () => {
  domUpdates.displayPastTab();
  displayPastDestinations();
};

const displayUpcomingTrips = () => {
  domUpdates.displayUpcomingTab();
  displayUpcomingDestinations();
};

const displayPendingTrips = () => {
  domUpdates.displayPendingTab();
  displayPendingDestinations();
};

//HELPER FUNCTIONS
const setInitialDisplay = () => {
  displayWelcome();
  declareStartOfYear();
  declareLastOfYear();
  displayTotalPrice();
  displayPossibleDestinations();
};

const displayPossibleDestinations = () => {
  const possibleTrips = tripInstances.map((trip) => trip.destinationID);
  domUpdates.displayDestinations(destinationInstances, possibleTrips);
};

const displayPendingDestinations = () => {
  let pendingTrips = findTrips(
    tripInstances,
    currentUser.id,
    "pending",
    currentDate,
    "after"
  );
  domUpdates.displayPendings(
    destinationInstances,
    pendingTrips,
    tripInstances,
    currentUser
  );
};

const displayUpcomingDestinations = () => {
  let upcomingTrips = findTrips(
    tripInstances,
    currentUser.id,
    "approved",
    currentDate,
    "after"
  );
  domUpdates.displayUpcomings(destinationInstances, upcomingTrips);
};

const displayPastDestinations = () => {
  let pastTrips = findTrips(
    tripInstances,
    currentUser.id,
    "approved",
    currentDate,
    "before"
  );
  console.log(pastTrips);
  domUpdates.displayPasts(destinationInstances, pastTrips);
};

const declareStartOfYear = () => {
  const currentYear = currentDate.split("/")[0];
  let currentFirst = [];
  currentFirst.push(currentYear);
  currentFirst.push("01");
  currentFirst.push("01");
  firstOfYear = currentFirst.join("/");
  return firstOfYear;
};

const declareLastOfYear = () => {
  const currentYear = currentDate.split("/")[0];
  let currentLast = [];
  currentLast.push(currentYear);
  currentLast.push("12");
  currentLast.push("31");
  lastOfYear = currentLast.join("/");
  return lastOfYear;
};

const handleUserInputErrors = () => {
  if (dateInput.value.split("-").join("/") <= currentDate || !dateInput.value) {
    alert("Make sure you select a future date and book a destination");
    return false;
  }
  if (durationInput.value < 1 || !durationInput.value) {
    alert(
      "Make sure you add how many days you'd like to stay and book a destination"
    );
    return false;
  }
  if (travelersInput.value < 1 || !travelersInput.value) {
    alert(
      "Make sure you add a total number of travelers and book a destination"
    );
    return false;
  } else {
    return true;
  }
};

const showServerError = (error) => {
  console.log(error);
  alert(
    "😬OOOPS looks like the local server is down. Try running the travel tracker API 😬"
  );
};

const clearForm = () => {
  travelersInput.value = 0;
  dateInput.value = "mm/dd/yyyy";
  durationInput.value = 0;
};

const confirmPost = () => {
  alert(
    "Your trip has been added to pending. An agent will reach out to you shortly"
  );
};

// const sortTripsLeastRecent = () => {
//   const tripsSorted = tripInstances.sort(
//     (a, b) => new Date(a.date) - new Date(b.date)
//   );
//   return tripsSorted;
// };

// const sortTripsMostRecent = () => {
//   const tripsSorted = tripInstances.sort(
//     (a, b) => new Date(b.date) - new Date(a.date)
//   );
//   return tripsSorted;
// };
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
possibleDestinationList.addEventListener("click", (event) => {
  event.preventDefault();
  submitBookingRequest();
});
