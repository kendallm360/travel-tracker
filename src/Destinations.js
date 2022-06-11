export default class Destinations {
  constructor(destinationData) {
    this.id = destinationData.id || "No ID has been provided";
    this.destination =
      destinationData.destination || "No destination has been provided";
    this.estimatedLodgingCostPerDay =
      destinationData.estimatedLodgingCostPerDay ||
      "No lodging cost have been provided";
    this.estimatedFlightCostPerPerson =
      destinationData.estimatedFlightCostPerPerson ||
      "No flight cost have been provided";
    this.image = destinationData.image || "No image has been provided";
    this.alt = destinationData.alt || "No alt tag has been provided";
  }
}
