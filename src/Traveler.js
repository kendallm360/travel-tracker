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

  //i need to estimate how much a proposed trip will cost
  //so first i need to figure which destination ids is chosen
  //the proposed trip will have a destination selected
  //
  //formula is destination cost per day * trip duration
  //add flight to that product.
  //get 10% of that total and add it on
  //multiply by number of travelers
  //add up all sums
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
