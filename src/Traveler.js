import Trips from "./Trips";

export default class Traveler {
  constructor(travelerData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.trips = undefined;
    this.userName = "";
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
  //   findByID(id) {
  //     let result = tripData;
  //   }
}
