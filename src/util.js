const findTrips = (tripData, currentId, status, currentDate, dateAttribute) => {
  if (dateAttribute === "before") {
    const filteredTrips = tripData
      .filter((trip) => trip.userID === currentId)
      .filter((trip) => trip.status === status)
      .filter((trip) => trip.date < currentDate)
      .map((trip) => trip.destinationID);
    return filteredTrips;
  }
  if (dateAttribute === "after") {
    const filteredTrips = tripData
      .filter((trip) => trip.userID === currentId)
      .filter((trip) => trip.status === status || trip.status === "pending")
      .filter((trip) => trip.date > currentDate)
      .map((trip) => trip.destinationID);
    return filteredTrips;
  }
};

const findUserTripsCurrentYear = (
  currentId,
  tripData,
  yearStart,
  yearEnd,
  status
) => {
  const filteredTrips = tripData
    .filter((trip) => trip.userID === currentId)
    .filter((trip) => trip.status === status)
    .filter((trip) => trip.date >= yearStart)
    .filter((trip) => trip.date <= yearEnd);
  return filteredTrips;
};

const calculateEachTripTotal = (
  filteredTrips,
  filteredDestinations,
  destinationData
) => {
  let eachTripTotal = filteredTrips.reduce((acc, trip) => {
    if (filteredDestinations.includes(trip.destinationID)) {
      let destinationCost = destinationData
        .filter((destination) => trip.destinationID === destination.id)
        .map((destination) => destination.estimatedLodgingCostPerDay)
        .pop();
      let flightCost = destinationData
        .filter((destination) => trip.destinationID === destination.id)
        .map((destination) => destination.estimatedFlightCostPerPerson)
        .pop();
      acc.push(trip.duration * destinationCost + flightCost);
    }
    return acc;
  }, []);
  return eachTripTotal;
};

const calculateAllTripsTotal = (filteredTripTotals) => {
  const totalSpent = filteredTripTotals.reduce((acc, tripTotal) => {
    acc += tripTotal;
    return acc;
  }, 0);
  let agentFee = totalSpent * 0.1;
  return totalSpent + agentFee;
};

export {
  findTrips,
  findUserTripsCurrentYear,
  calculateEachTripTotal,
  calculateAllTripsTotal,
};
