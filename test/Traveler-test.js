import chai from "chai";
const expect = chai.expect;
import Traveler from "../src/Traveler";
import testData from "./MockData/MockData";

describe("Traveler", () => {
  let travelerData;
  let traveler1;
  let traveler2;
  let traveler3;
  let traveler4;

  beforeEach(() => {
    travelerData = testData.travelers;
    traveler1 = new Traveler(travelerData[0]);
    traveler2 = new Traveler(travelerData[1]);
    traveler3 = new Traveler(travelerData[2]);
    traveler4 = new Traveler(travelerData[3]);
  });

  it("Should be a function", () => {
    expect(Traveler).to.be.a("function");
  });

  it("Should be an instance of the Traveler class", () => {
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

  it("Should have a method that returns the user's first name", () => {
    expect(traveler3.returnFirstName()).to.equal("Sibby");
    expect(traveler2.returnFirstName()).to.equal("Rachael");
    expect(traveler1.returnFirstName()).to.equal("Ham");
    expect(traveler4.returnFirstName()).to.equal("No name has been provided");
  });
  //   it("Should have a method that finds user info by id", () => {
  //     expect(traveler1.findByID(1)).to.equal(1);
  //   });

  //   it("Should have a method that adds past trips to user's property", () => {
  //     expect(traveler1.trips).to.deep.equal([1, 3]);
  //   });
});
