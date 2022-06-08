const testData = {
  travelers: [
    {
      id: 1,
      name: "Ham Leadbeater",
      travelerType: "relaxer",
    },
    {
      id: 2,
      name: "Rachael Vaughten",
      travelerType: "thrill-seeker",
    },
    {
      id: 3,
      name: "Sibby Dawidowitsch",
      travelerType: "shopper",
    },
  ],
  trips: [
    {
      id: 1,
      userID: 1,
      destinationID: 49,
      travelers: 1,
      date: "2022/09/16",
      duration: 8,
      status: "approved",
      suggestedActivities: [],
    },
    {
      id: 2,
      userID: 2,
      destinationID: 25,
      travelers: 5,
      date: "2022/10/04",
      duration: 18,
      status: "approved",
      suggestedActivities: [],
    },
    {
      id: 3,
      userID: 1,
      destinationID: 22,
      travelers: 4,
      date: "2022/05/22",
      duration: 17,
      status: "approved",
      suggestedActivities: [],
    },
  ],
};

export default testData;
