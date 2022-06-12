export default class Trips {
  constructor(tripData) {
    this.id = tripData.id || "No ID has been provided";
    this.userID = tripData.userID || "No userID has been provided";
    this.destinationID =
      tripData.destinationID || "No destinationID has been provided";
    this.travelers = tripData.travelers || "No travelers have been provided";
    this.date = tripData.date || "No date has been provided";
    this.duration = tripData.duration || "No duration has been provided";
    this.status = tripData.status || "No status has been provided";
    this.suggestedActivities =
      tripData.suggestedActivities ||
      "No suggested activities have been provided";
  }
}
