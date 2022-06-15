export default class Destinations {
  constructor(destinationData) {
    this.id = destinationData.id || "No ID has been provided";
    this.destination =
      destinationData.destination || "No destination has been provided";
    this.estimatedLodgingCostPerDay =
      destinationData.estimatedLodgingCostPerDay ||
      "No lodging costs have been provided";
    this.estimatedFlightCostPerPerson =
      destinationData.estimatedFlightCostPerPerson ||
      "No flight costs have been provided";
    this.image = destinationData.image || "No image has been provided";
    this.alt = destinationData.alt || "No alt tag has been provided";
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
