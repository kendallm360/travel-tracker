import chai from "chai";
const expect = chai.expect;
import Traveler from "../src/Traveler";
import {
  travelerInstance1,
  travelerInstance2,
  travelerInstance3,
} from "./MockData/MockData";

describe("Traveler", () => {
  let traveler1;
  let traveler2;
  let traveler3;

  beforeEach(() => {
    traveler1 = travelerInstance1;
    traveler2 = travelerInstance2;
    traveler3 = travelerInstance3;
  });

  it("Should be a function", () => {
    expect(Traveler).to.be.a("function");
  });

  it("Should be an instance of the Travelers Repo class", () => {
    expect(traveler1).to.be.an.instanceOf(Traveler);
  });

  it("Should have an id", () => {
    expect(traveler1.id).to.equal(1);
  });

  it("Should have a name", () => {
    expect(traveler2.name).to.equal("Rachael Vaughten");
  });

  it("Should have a traveler type", () => {
    expect(traveler3.travelerType).to.equal("shopper");
  });
});
