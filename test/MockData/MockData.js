import TravelersRepo from "../../src/TravelersRepo";

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

export { travelerRepoInstance };
