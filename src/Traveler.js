import Trips from "./Trips";

export default class Traveler {
  constructor(travelerData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.trips = [];
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
  //   findByID(id) {
  //     let result = tripData;
  //   }
}
