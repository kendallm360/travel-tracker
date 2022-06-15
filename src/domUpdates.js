const welcomeMessage = document.querySelector(".title");
const totalSpend = document.querySelector(".total-spend");
const titleBar = document.querySelector(".title-bar");
const mainDisplay = document.querySelector(".main-display");
const loginPage = document.querySelector(".login-page");
const userInput = document.querySelector(".user-input");
const bookingOptions = document.querySelector(".booking-options");
const pastTripsView = document.querySelector(".past-stays-view");
const upcomingTripsView = document.querySelector(".upcoming-stays-view");
const pendingTripsView = document.querySelector(".pending-stays-view");
const possibleDestinationList = document.querySelector(
  ".possible-destinations-display"
);
const pendingDestinationList = document.querySelector(
  ".pending-destinations-display"
);
const upcomingDestinationList = document.querySelector(
  ".upcoming-destinations-display"
);
const pastDestinationList = document.querySelector(
  ".past-destinations-display"
);

let domUpdates = {
  displayWelcome(user) {
    welcomeMessage.innerHTML = `<h1>Welcome ${user.returnFirstName()}<h1>`;
  },
  displayAnnualSpend(
    user,
    tripInstances,
    destinationInstances,
    firstOfYear,
    lastOfYear
  ) {
    totalSpend.innerHTML = `<p>You Spent ${user.calculateAnnualTotalSpend(
      tripInstances,
      destinationInstances,
      firstOfYear,
      lastOfYear
    )} on Trips this year</p>`;
  },
  displayLogin() {
    userInput.classList.add("hidden");
    bookingOptions.classList.add("hidden");
    titleBar.classList.add("hidden");
    mainDisplay.classList.add("hidden");
    pastTripsView.classList.add("hidden");
    upcomingTripsView.classList.add("hidden");
    pendingTripsView.classList.add("hidden");
    loginPage.classList.remove("hidden");
  },
  displayMainPage() {
    userInput.classList.remove("hidden");
    bookingOptions.classList.remove("hidden");
    titleBar.classList.remove("hidden");
    mainDisplay.classList.remove("hidden");
    loginPage.classList.add("hidden");
    pastTripsView.classList.add("hidden");
    upcomingTripsView.classList.add("hidden");
    pendingTripsView.classList.add("hidden");
  },
  displayPastTab() {
    userInput.classList.add("hidden");
    bookingOptions.classList.add("hidden");
    upcomingTripsView.classList.add("hidden");
    pendingTripsView.classList.add("hidden");
    pastTripsView.classList.remove("hidden");
  },
  displayUpcomingTab() {
    userInput.classList.add("hidden");
    bookingOptions.classList.add("hidden");
    pastTripsView.classList.add("hidden");
    pendingTripsView.classList.add("hidden");
    upcomingTripsView.classList.remove("hidden");
  },
  displayPendingTab() {
    userInput.classList.add("hidden");
    bookingOptions.classList.add("hidden");
    pastTripsView.classList.add("hidden");
    upcomingTripsView.classList.add("hidden");
    pendingTripsView.classList.remove("hidden");
  },
  displayDestinations(destinationInstances, possibleTrips) {
    const possibleDestinations = destinationInstances
      .filter((place) => possibleTrips.includes(place.id))
      .map((place) => {
        const tripDisplay = `
      <section class="trip-display" id="trip${place.id}">
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
  },
  displayNoPendings() {
    pendingDestinationList.innerHTML = `It looks like you don't have any pending trips. Return to Dashboard to
    make plans`;
  },
  displayPendings(destinationInstances, pendingTrips, tripInstances, user) {
    const pendingDestinations = destinationInstances
      .filter((place) => pendingTrips.includes(place.id))
      .map((place) => {
        const tripDisplay = `
      <section class="trip-display" id="trip${place.id}">
        <div class="trip-info">
          <h2>${place.destination}</h2>
          <p class="destination-hotel-cost">Lodging Will Be $${
            place.estimatedLodgingCostPerDay
          }/<span>night</span></p>
          <p class="destination-flight-cost">Flights Will Be $${
            place.estimatedFlightCostPerPerson
          }/<span>person</span></p>
          <p class="estimated-total">This trip will cost an estimate of $${place.estimateTripTotal(
            tripInstances,
            destinationInstances
          )}/<span>total</span></p>
        </div>
        <div class="trip-image">
            <button class="trip-status-label">
                <p>Pending Trip</p>
            </button>
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
  },
  displayNoUpcomings() {
    upcomingDestinationList.innerHTML = `It looks like you don't have any upcoming trips. Return to Dashboard to
    make plans`;
  },
  displayUpcomings(destinationInstances, upcomingTrips) {
    const upcomingDestinations = destinationInstances
      .filter((place) => upcomingTrips.includes(place.id))
      .map((place) => {
        const tripDisplay = `
        <section class="trip-display" id="trip${place.id}">
          <div class="trip-info">
            <h2>${place.destination}</h2>
            <p class="destination-hotel-cost">Lodging Will Be $${place.estimatedLodgingCostPerDay}/<span>night</span></p>
            <p class="destination-flight-cost">Flights Will Be $${place.estimatedFlightCostPerPerson}/<span>person</span></p>
          </div>
          <div class="trip-image">
              <button class="trip-status-label">
                  <p>Upcoming Trip</p>
              </button>
            <img class="destination-preview" src="${place.image}" alt="${place.alt}" />
          </div>
         </section>
          `;
        return tripDisplay;
      })
      .join("");
    upcomingDestinationList.innerHTML = upcomingDestinations;
  },
  displayNoPasts() {
    pastDestinationList.innerHTML = `It looks like you don't have any past trips. Return to Dashboard to
    make plans`;
  },
  displayPasts(destinationInstances, pastTrips) {
    const pastDestinations = destinationInstances
      .filter((place) => pastTrips.includes(place.id))
      .map((place) => {
        const tripDisplay = `
      <section class="trip-display" id="trip${place.id}">
        <div class="trip-info">
          <h2>${place.destination}</h2>
          <p class="destination-hotel-cost">Lodging Was $${place.estimatedLodgingCostPerDay}/<span>night</span></p>
          <p class="destination-flight-cost">Flights Were $${place.estimatedFlightCostPerPerson}/<span>person</span></p>
        </div>
        <div class="trip-image">
            <button class="trip-status-label">
                <p>Past Trip</p>
            </button>
        <img class="destination-preview" src="${place.image}" alt="${place.alt}" />
        </div>
       </section>
      `;
        return tripDisplay;
      })
      .join("");
    pastDestinationList.innerHTML = pastDestinations;
  },
};
export default domUpdates;
