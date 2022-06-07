import TravelersRepo from "../../src/TravelersRepo";
import Traveler from "../../src/Traveler";

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

export {
  travelerRepoInstance,
  travelerInstance1,
  travelerInstance2,
  travelerInstance3,
};
