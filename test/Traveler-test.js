import chai from "chai";
const expect = chai.expect;
import Traveler from "../src/Traveler";
import testData from "./MockData/MockData";

describe("Traveler", () => {
  let tripData;
  let tripData2;
  let destinationData;
  let destinationData2;
  let travelerData;
  let traveler1;
  let traveler2;
  let traveler3;
  let traveler4;
  let startDate;
  let endDate;

  beforeEach(() => {
    tripData = testData.trips;
    tripData2 = [];
    destinationData = testData.destinations;
    destinationData2 = [];
    travelerData = testData.travelers;
    traveler1 = new Traveler(travelerData[0]);
    traveler2 = new Traveler(travelerData[1]);
    traveler3 = new Traveler(travelerData[2]);
    traveler4 = new Traveler(travelerData[3]);
    startDate = "2022/01/01";
    endDate = "2022/12/31";
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

  it("Should return an error if any property information is missing", () => {
    expect(traveler4.id).to.equal("No ID has been provided");
    expect(traveler4.travelerType).to.equal(
      "No travelerType has been provided"
    );
  });

  it("Should have a method that returns the user's first name", () => {
    expect(traveler3.returnFirstName()).to.equal("Sibby");
    expect(traveler2.returnFirstName()).to.equal("Rachael");
    expect(traveler1.returnFirstName()).to.equal("Ham");
  });

  it("Should show an error if user does not have a name", () => {
    expect(traveler4.returnFirstName()).to.equal("No name has been provided");
  });

  it("Should have a method that adds all trips to user's trips property", () => {
    expect(traveler1.findMyTrips(tripData)).to.deep.equal([1, 3, 4, 5]);
    expect(traveler1.trips).to.deep.equal([1, 3, 4, 5]);
    expect(traveler4.findMyTrips(tripData)).to.deep.equal([]);
    expect(traveler4.trips).to.deep.equal([]);
  });

  it("Should return an error if no trip data is found", () => {
    expect(traveler1.trips).to.deep.equal([]);
    expect(traveler1.findMyTrips(tripData2)).to.equal("No trips are available");
  });

  it("Should have a method that adds all destinations to user's destinations property", () => {
    traveler1.findMyDestinations(tripData);
    expect(traveler1.destinations).to.deep.equal([49, 22, 12, 25]);
    traveler4.findMyDestinations(tripData);
    expect(traveler4.destinations).to.deep.equal([]);
  });

  it("Should return an error if no destination data is found", () => {
    expect(traveler1.destinations).to.deep.equal([]);
    expect(traveler1.findMyDestinations(destinationData2)).to.equal(
      "No trips are available"
    );
  });

  it("Should have a method that calculates total spent on past trips", () => {
    expect(
      traveler1.calculateAnnualTotalSpend(
        tripData,
        destinationData,
        startDate,
        endDate
      )
    ).to.equal(2024);
    expect(
      traveler2.calculateAnnualTotalSpend(
        tripData,
        destinationData,
        startDate,
        endDate
      )
    ).to.equal(5027);
  });

  it("Should have a method that calculates a total estimate of a trips cost", () => {
    expect(traveler3.estimateTripTotal(tripData, destinationData)).to.equal(
      6952
    );
  });
});
