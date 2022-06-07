import TravelersRepo from "../../src/TravelersRepo";
import Traveler from "../../src/Traveler";
import Trips from "../../src/Trips";

const travelerRepoInstance = new TravelersRepo([
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
  {
    id: 4,
    name: "Leila Thebeaud",
    travelerType: "photographer",
  },
  {
    id: 5,
    name: "Tiffy Grout",
    travelerType: "thrill-seeker",
  },
  {
    id: 6,
    name: "Laverna Flawith",
    travelerType: "shopper",
  },
  {
    id: 7,
    name: "Emmet Sandham",
    travelerType: "relaxer",
  },
  {
    id: 8,
    name: "Carlin O'Reilly",
    travelerType: "history buff",
  },
]);

const travelerInstance1 = new Traveler({
  id: 1,
  name: "Ham Leadbeater",
  travelerType: "relaxer",
});
const travelerInstance2 = new Traveler({
  id: 2,
  name: "Rachael Vaughten",
  travelerType: "thrill-seeker",
});
const travelerInstance3 = new Traveler({
  id: 3,
  name: "Sibby Dawidowitsch",
  travelerType: "shopper",
});

const tripsInstance1 = new Trips([
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
  {
    id: 4,
    userID: 2,
    destinationID: 14,
    travelers: 2,
    date: "2022/02/25",
    duration: 10,
    status: "approved",
    suggestedActivities: [],
  },
  {
    id: 5,
    userID: 3,
    destinationID: 29,
    travelers: 3,
    date: "2022/04/30",
    duration: 18,
    status: "approved",
    suggestedActivities: [],
  },
]);

export {
  travelerRepoInstance,
  travelerInstance1,
  travelerInstance2,
  travelerInstance3,
  tripsInstance1,
};
