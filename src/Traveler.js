// import Trips from "./Trips";
import {
  calculateEachTripTotal,
  calculateAllTripsTotal,
  findUserTripsCurrentYear,
} from "./util";

export default class Traveler {
  constructor(travelerData) {
    this.id = travelerData.id || "No ID has been provided";
    this.name = travelerData.name;
    this.travelerType =
      travelerData.travelerType || "No travelerType has been provided";
    this.trips = [] || "No trips have been provided";
    this.destinations = [];
    this.userName = `traveler${this.id}`;
    this.password = "travel";
  }
  returnFirstName() {
    if (!this.name) {
      return "No name has been provided";
    } else {
      const firstName = this.name.split(" ");
      return firstName[0];
    }
  }

  findMyTrips(tripData) {
    if (tripData.length === 0) {
      return "No trips are available";
    } else {
      let trips = tripData
        .filter((trip) => trip.userID === this.id)
        .map((trip) => trip.id);
      this.trips = trips;
      return this.trips;
    }
  }

  findMyDestinations(tripData) {
    if (tripData.length === 0) {
      return "No trips are available";
    } else {
      let destinations = tripData
        .filter((trip) => trip.userID === this.id)
        .map((trip) => trip.destinationID);
      this.destinations = destinations;
      return this.destinations;
    }
  }

  calculateAnnualTotalSpend(tripData, destinationData, yearStart, yearEnd) {
    const destinationsVisited = this.findMyDestinations(tripData);
    const filteredTrips = findUserTripsCurrentYear(
      this.id,
      tripData,
      yearStart,
      yearEnd
    );
    const eachTripTotal = calculateEachTripTotal(
      filteredTrips,
      destinationsVisited,
      destinationData
    );
    return calculateAllTripsTotal(eachTripTotal);
  }

  estimateTripTotal(tripData, destinationData) {
    let estTotal = tripData
      .filter((trip) => trip.userID === this.id)
      .reduce((acc, trip) => {
        let destinationChosen = destinationData.find(
          (destination) => destination.id === trip.destinationID
        );
        acc =
          (trip.duration * destinationChosen.estimatedLodgingCostPerDay +
            destinationChosen.estimatedFlightCostPerPerson) *
          trip.travelers;
        let agentFee = acc * 0.1;
        return acc + agentFee;
      }, 0);
    return estTotal;
  }
}
