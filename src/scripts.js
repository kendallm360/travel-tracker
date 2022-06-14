/* eslint-disable indent */
/* eslint-disable max-len */
//IMPORTS
import "./css/styles.css";
import { fetchData, postData } from "./apiCalls";
import Traveler from "./Traveler";
import Trips from "./Trips";
import Destinations from "./Destinations";
import domUpdates from "./domUpdates";
import { findTrips, findRawTrips } from "./util";

//IMAGES
import "./images/turing-logo.png";

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
const loginButton = document.querySelector(".login");
// const logoutButton = document.querySelector("#logout");
const dashboardButton = document.querySelector("#dashboard");
const pastTripsButton = document.querySelector("#pastTrips");
const upcomingTripsButton = document.querySelector("#upcomingTrips");
const pendingTripsButton = document.querySelector("#pendingTrips");
const possibleDestinationList = document.querySelector(
  ".possible-destinations-display"
);
const loginError = document.querySelector(".login-error");
// const loginInputs = document.querySelector(".login-inputs");
const usernameInput = document.querySelector(".username-input");
const passwordInput = document.querySelector(".password-input");
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
    })
    .catch((error) => showServerError(error));
};

const submitBookingRequest = () => {
  let formChecks = [
    handleDateError(),
    handleDurationError(),
    handleTravelerError(),
  ];
  if (formChecks[0] && formChecks[1] && formChecks[2]) {
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
const verifyUser = () => {
  const userID = verifyUsername();
  const passwordCheck = verifyPassword();
  if (userID && passwordCheck) {
    fetchUsers();
    setCurrentUser(userID);
    setInitialDisplay();
  }
};

const setCurrentUser = (id) => {
  currentUser = travelerInstances[id - 1];
  return currentUser;
};

const createRepositories = () => {
  currentDate = new Date().toISOString().split("T")[0].split("-").join("/");
  travelerInstances = travelerData.map((traveler) => {
    return new Traveler(traveler);
  });
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
const verifyUsername = () => {
  let username = usernameInput.value;
  const letters = username.split("").slice(0, 8).join("");
  const numbers = parseInt(username.split("").slice(8).join(""));
  if (username.length < 9 || numbers <= 0 || numbers > 50) {
    loginError.innerText = `You have entered an invalid username or password`;
  } else {
    return numbers;
  }
};

const verifyPassword = () => {
  let password = passwordInput.value;
  if (password === "traveler") {
    return true;
  } else {
    loginError.innerText = `You have entered an invalid username or password`;
    return false;
  }
};

const setInitialDisplay = () => {
  displayDashboard();
  displayWelcome();
  declareStartOfYear();
  declareLastOfYear();
  displayTotalPrice();
  displayPossibleDestinations();
};

// const returnToLogin = () => {
//   domUpdates.displayLogin;
// };

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
  if (pendingTrips.length === 0) {
    domUpdates.displayNoPendings();
  } else {
    domUpdates.displayPendings(
      destinationInstances,
      pendingTrips,
      tripInstances,
      currentUser
    );
  }
};

const displayUpcomingDestinations = () => {
  let upcomingTrips = findTrips(
    tripInstances,
    currentUser.id,
    "approved",
    currentDate,
    "after"
  );
  if (upcomingTrips.length === 0) {
    domUpdates.displayNoUpcomings();
  } else {
    domUpdates.displayUpcomings(destinationInstances, upcomingTrips);
  }
};

const displayPastDestinations = () => {
  let pastTrips = findTrips(
    tripInstances,
    currentUser.id,
    "approved",
    currentDate,
    "before"
  );
  if (pastTrips.length === 0) {
    domUpdates.displayNoPasts();
  } else {
    domUpdates.displayPasts(destinationInstances, pastTrips);
  }
  // let rawTrips = findRawTrips(
  //   tripInstances,
  //   currentUser.id,
  //   "approved",
  //   currentDate
  // );
  // console.log(rawTrips);
  // domUpdates.displayPasts(destinationInstances, pastTrips, rawTrips);
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

const handleDateError = () => {
  if (dateInput.value.split("-").join("/") <= currentDate || !dateInput.value) {
    alert("Make sure you select a future date and book a destination");
    return false;
  } else {
    return true;
  }
};

const handleDurationError = () => {
  if (durationInput.value < 1 || !durationInput.value) {
    alert(
      "Make sure you add how many days you'd like to stay and book a destination"
    );
    return false;
  } else {
    return true;
  }
};

const handleTravelerError = () => {
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

//EVENT LISTENERS
window.addEventListener("load", () => {
  fetchUsers();
});
dashboardButton.addEventListener("click", () => {
  displayDashboard();
});
pastTripsButton.addEventListener("click", () => {
  console.log(currentUser.id);
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
loginButton.addEventListener("click", () => {
  verifyUser();
});
// logoutButton.addEventListener("click", () => {
//   console.log("steve");
//   debugger;
//   returnToLogin();
// });
