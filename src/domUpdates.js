let domUpdates = {
  displayWelcome(user) {
    const welcomeMessage = document.querySelector(".title");
    welcomeMessage.innerHTML = `<h1>Welcome ${user.returnFirstName()}<h1>`;
  },
  displayAnnualSpend(
    user,
    tripInstances,
    destinationInstances,
    firstOfYear,
    lastOfYear
  ) {
    const totalSpend = document.querySelector(".total-spend");
    totalSpend.innerHTML = `<p>You Spent ${user.calculateAnnualTotalSpend(
      tripInstances,
      destinationInstances,
      firstOfYear,
      lastOfYear
    )} on Trips this year</p>`;
  },
  displayMainPage() {
    const userInput = document.querySelector(".user-input");
    const bookingOptions = document.querySelector(".booking-options");
    const pastTripsView = document.querySelector(".past-stays-view");
    const upcomingTripsView = document.querySelector(".upcoming-stays-view");
    const pendingTripsView = document.querySelector(".pending-stays-view");
    userInput.classList.remove("hidden");
    bookingOptions.classList.remove("hidden");
    pastTripsView.classList.add("hidden");
    upcomingTripsView.classList.add("hidden");
    pendingTripsView.classList.add("hidden");
  },
  displayPastTab() {
    const userInput = document.querySelector(".user-input");
    const bookingOptions = document.querySelector(".booking-options");
    const pastTripsView = document.querySelector(".past-stays-view");
    const upcomingTripsView = document.querySelector(".upcoming-stays-view");
    const pendingTripsView = document.querySelector(".pending-stays-view");
    userInput.classList.add("hidden");
    bookingOptions.classList.add("hidden");
    upcomingTripsView.classList.add("hidden");
    pendingTripsView.classList.add("hidden");
    pastTripsView.classList.remove("hidden");
  },
  displayUpcomingTab() {
    const userInput = document.querySelector(".user-input");
    const bookingOptions = document.querySelector(".booking-options");
    const pastTripsView = document.querySelector(".past-stays-view");
    const upcomingTripsView = document.querySelector(".upcoming-stays-view");
    const pendingTripsView = document.querySelector(".pending-stays-view");
    userInput.classList.add("hidden");
    bookingOptions.classList.add("hidden");
    pastTripsView.classList.add("hidden");
    pendingTripsView.classList.add("hidden");
    upcomingTripsView.classList.remove("hidden");
  },
  displayPendingTab() {
    const userInput = document.querySelector(".user-input");
    const bookingOptions = document.querySelector(".booking-options");
    const pastTripsView = document.querySelector(".past-stays-view");
    const upcomingTripsView = document.querySelector(".upcoming-stays-view");
    const pendingTripsView = document.querySelector(".pending-stays-view");
    userInput.classList.add("hidden");
    bookingOptions.classList.add("hidden");
    pastTripsView.classList.add("hidden");
    upcomingTripsView.classList.add("hidden");
    pendingTripsView.classList.remove("hidden");
  },
  displayDestinations(destinationInstances, possibleTrips) {
    const possibleDestinationList = document.querySelector(
      ".possible-destinations-display"
    );
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
  displayPendings(destinationInstances, pendingTrips, tripInstances, user) {
    const pendingDestinationList = document.querySelector(
      ".pending-destinations-display"
    );
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
          <p class="estimated-total">This trip will cost an estimate of $${user.estimateTripTotal(
            tripInstances,
            destinationInstances
          )}/<span>total</span></p>
        </div>
        <div class="trip-image">
            <div class="trip-status-label">
                <p>Pending Trip</p>
            </div>
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
  displayUpcomings(destinationInstances, upcomingTrips) {
    const upcomingDestinationList = document.querySelector(
      ".upcoming-destinations-display"
    );
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
              <div class="trip-status-label">
                  <p>Upcoming Trip</p>
              </div>
            <img class="destination-preview" src="${place.image}" alt="${place.alt}" />
          </div>
         </section>
          `;
        return tripDisplay;
      })
      .join("");
    console.log(upcomingDestinations);
    upcomingDestinationList.innerHTML = upcomingDestinations;
  },
  //   displayPasts(destinationInstances, pastTrips, rawTrips) {
  displayPasts(destinationInstances, pastTrips) {
    const pastDestinationList = document.querySelector(
      ".past-destinations-display"
    );
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
            <div class="trip-status-label">
                <p>Past Trip</p>
            </div>
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
