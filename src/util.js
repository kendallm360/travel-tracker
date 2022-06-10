const findTrips = (tripData, currentId, status, currentDate, dateAttribute) => {
  console.log("steve");
  if (dateAttribute === "before") {
    const filteredTrips = tripData
      .filter((trip) => trip.userID === currentId)
      .filter((trip) => trip.status === status)
      .filter((trip) => trip.date < currentDate)
      .map((trip) => trip.destinationID);
    return filteredTrips;
  } else {
    const filteredTrips = tripData
      .filter((trip) => trip.userID === currentId)
      .filter((trip) => trip.status === status)
      .filter((trip) => trip.date > currentDate)
      .map((trip) => trip.destinationID);
    return filteredTrips;
  }
};

export { findTrips };
