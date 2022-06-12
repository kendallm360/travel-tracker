/* eslint-disable max-len */
//IMPORTS
// An example of how you tell webpack to use a CSS (SCSS) file
import "./css/styles.css";
import { fetchData, postData } from "./apiCalls";
import Traveler from "./Traveler";
import Trips from "./Trips";
import Destinations from "./Destinations";

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
//apiname, formdata
const postAllData = (event) => {
  let data = {
    id: Date.now(),
    userID: currentUser.id,
    destinationID: parseInt(event.target.id),
    travelers: travelersInput.value,
    date: dateInput.value.split("-").join("/"),
    duration: durationInput.value,
    status: "pending",
    suggestedActivities: [],
  };
  postData(data)
    .then((response) => console.log(response))
    .catch((e) => {
      console.error(e.message);
    });
};

//FUNCTIONS

const bookDestination = (event) => {
  console.log(tripInstances.length, "length before");
  let formCheck = handleUserInputErrors();
  if (formCheck) {
    postAllData(event);
    fetchUsers();
    console.log(tripInstances.length, "length after");
    clearForm();
    confirmPost();
    displayPendingTrips();
    console.log(tripInstances.length, "length last");
  }
};

const createRepositories = () => {
  currentDate = new Date().toISOString().split("T")[0].split("-").join("/");
  travelerInstances = travelerData.map((traveler) => {
    return new Traveler(traveler);
  });
  currentUser = travelerInstances[42];
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
  totalSpend.innerHTML = `<p>You Spent ${currentUser.calculateAnnualTotalSpend(
    tripInstances,
    destinationInstances,
    firstOfYear,
    lastOfYear
  )} on Trips this year</p>`;
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
const setInitialDisplay = () => {
  displayWelcome();
  declareStartOfYear();
  declareLastOfYear();
  displayTotalPrice();
  displayPossibleDestinations();
};

const displayPossibleDestinations = () => {
  const possibleTrips = tripInstances.map((trip) => trip.destinationID);
  //displaying the pics
  const possibleDestinations = destinationInstances
    .filter((place) => possibleTrips.includes(place.id))
    .map((place) => {
      const tripDisplay = `
      <section class="trip-display" id="${place.id}">
        <div class="trip-info">
          <h2>${place.destination}</h2>
          <p class="destination-hotel-cost">Estimate Lodging Cost $${place.estimatedLodgingCostPerDay}/<span>night</span></p>
          <p class="destination-flight-cost">Estimated Flight Cost $${place.estimatedFlightCostPerPerson}/<span>person</span></p>
          <button class="nav-buttons book-button" id="${place.id}">Book</button>
        </div>
        <div class="trip-image">
          <img class="destination-preview" src="${place.image}" alt="${place.alt}" />
        </div>
       </section>
        `;
      return tripDisplay;
    })
    .join("");
  possibleDestinationList.innerHTML = possibleDestinations;
};

const displayPendingDestinations = () => {
  let pendingTrips = findTrips(
    tripInstances,
    currentUser.id,
    "pending",
    currentDate,
    "after"
  );
  const pendingDestinations = destinationInstances
    .filter((place) => pendingTrips.includes(place.id))
    .map((place) => {
      const tripDisplay = `
      <section class="trip-display" id="${place.id}">
        <div class="trip-info">
          <h2>${place.destination}</h2>
          <p class="destination-hotel-cost">Lodging Will Be $${
            place.estimatedLodgingCostPerDay
          }/<span>night</span></p>
          <p class="destination-flight-cost">Flights Will Be $${
            place.estimatedFlightCostPerPerson
          }/<span>total</span></p>
          <p class="estimated-total">This trip will cost an estimate of $${currentUser.estimateTripTotal(
            tripInstances,
            destinationInstances
          )}/<span>person</span></p>
        </div>
        <div class="trip-image">
          <img class="destination-preview" src="${place.image}" alt="${
        place.alt
      }" />
        </div>
       </section>
        `;
      return tripDisplay;
    })
    .join("");
  pendingDestinationList.innerHTML = pendingDestinations;
};

const displayUpcomingDestinations = () => {
  let upcomingTrips = findTrips(
    tripInstances,
    currentUser.id,
    "approved",
    currentDate,
    "after"
  );
  //displaying the pics
  const upcomingDestinations = destinationInstances
    .filter((place) => upcomingTrips.includes(place.id))
    .map((place) => {
      const tripDisplay = `
      <section class="trip-display" id="${place.id}">
        <div class="trip-info">
          <h2>${place.destination}</h2>
          <p class="destination-hotel-cost">Lodging Will Be $${place.estimatedLodgingCostPerDay}/<span>night</span></p>
          <p class="destination-flight-cost">Flights Will Be $${place.estimatedFlightCostPerPerson}/<span>person</span></p>
        </div>
        <div class="trip-image">
          <img class="destination-preview" src="${place.image}" alt="${place.alt}" />
        </div>
       </section>
        `;
      return tripDisplay;
    })
    .join("");
  upcomingDestinationList.innerHTML = upcomingDestinations;
};

const displayPastDestinations = () => {
  let pastTrips = findTrips(
    tripInstances,
    currentUser.id,
    "approved",
    currentDate,
    "before"
  );
  //display past trips
  const pastDestinations = destinationInstances
    .filter((place) => pastTrips.includes(place.id))
    .map((place) => {
      const tripDisplay = `
      <section class="trip-display" id="${place.id}">
        <div class="trip-info">
          <h2>${place.destination}</h2>
          <p class="destination-hotel-cost">Lodging Was $${place.estimatedLodgingCostPerDay}/<span>night</span></p>
          <p class="destination-flight-cost">Flights Were $${place.estimatedFlightCostPerPerson}/<span>person</span></p>
        </div>
        <div class="trip-image">
          <img class="destination-preview" src="${place.image}" alt="${place.alt}" />
        </div>
       </section>
      `;
      return tripDisplay;
    })
    .join("");
  pastDestinationList.innerHTML = pastDestinations;
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

const possibleDestinationHandler = (event) => {
  if (event.target.classList.contains("book-button")) {
    bookDestination(event);
  }
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
possibleDestinationList.addEventListener("click", possibleDestinationHandler);
