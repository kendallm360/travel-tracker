import chai from "chai";
const expect = chai.expect;
import TravelersRepo from "../src/TravelersRepo";
import testData from "./MockData/MockData";

describe("Travelers Repo", () => {
  let travelerData;
  let traveler1;

  beforeEach(() => {
    travelerRepo = travelerRepoInstance;
  });

  it.skip("Should be a function", () => {
    expect(TravelersRepo).to.be.a("function");
  });

  it.skip("Should be an instance of the Travelers Repo class", () => {
    expect(travelerRepo).to.be.an.instanceOf(TravelersRepo);
  });

  it.skip("Should be able to take in multiple users", () => {
    expect(travelerRepo.users).to.be.a("array");
  });
});
