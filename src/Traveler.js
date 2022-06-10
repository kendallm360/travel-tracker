// import Trips from "./Trips";

export default class Traveler {
  constructor(travelerData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.trips = undefined;
    this.destinations = undefined;
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
    let trips = tripData
      .filter((trip) => trip.userID === this.id)
      .map((trip) => trip.id);
    this.trips = trips;
    return this.trips;
  }

  findMyDestinations(tripData) {
    let destinations = tripData
      .filter((trip) => trip.userID === this.id)
      .map((trip) => trip.destinationID);
    this.destinations = destinations;
    return this.destinations;
  }

  calculateTotalSpent(tripData, destinationData, yearStart, yearEnd) {
    let destinationsVisited = this.findMyDestinations(tripData);
    let tripTotals = tripData
      .filter((trip) => trip.userID === this.id)
      .filter((trip) => trip.date >= yearStart)
      .filter((trip) => trip.date <= yearEnd)
      .reduce((acc, trip) => {
        if (destinationsVisited.includes(trip.destinationID)) {
          let destinationCost = destinationData
            .filter((destination) => trip.destinationID === destination.id)
            .map((destination) => destination.estimatedLodgingCostPerDay)
            .pop();
          acc.push(trip.duration * destinationCost);
        }
        return acc;
      }, []);
    let totalSpent = tripTotals.reduce((acc, tripTotal) => {
      acc += tripTotal;
      return acc;
    }, 0);
    let agentFee = totalSpent * 0.1;
    return totalSpent + agentFee;
  }
}
