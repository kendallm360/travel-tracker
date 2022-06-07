import chai from "chai";
const expect = chai.expect;
import TravelersRepo from "../src/TravelersRepo";
import { travelerRepoInstance } from "./MockData/MockData";

describe("Travelers Repo", () => {
  let travelerRepo;

  beforeEach(() => {
    travelerRepo = travelerRepoInstance;
  });

  it("Should be a function", () => {
    expect(TravelersRepo).to.be.a("function");
  });
  it("Should be an instance of the Travelers Repo class", () => {
    expect(travelerRepo).to.be.an.instanceOf(TravelersRepo);
  });
});
