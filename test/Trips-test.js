import chai from "chai";
const expect = chai.expect;
import Trips from "../src/Trips";
import testData from "./MockData/MockData";

describe("Trips", () => {
  let tripData;
  let trip1;
  let trip2;
  let trip3;

  beforeEach(() => {
    tripData = testData.trips;
    trip1 = new Trips(tripData[0]);
    trip2 = new Trips(tripData[1]);
    trip3 = new Trips(tripData[2]);
  });

  it("Should be a function", () => {
    expect(Trips).to.be.a("function");
  });

  it("Should be an instance of Trips", () => {
    expect(trip1).to.be.an.instanceOf(Trips);
  });

  it("Should have an id for the trip", () => {
    expect(trip1.id).to.equal(1);
  });

  it("Should have an userID for the trip", () => {
    expect(trip2.userID).to.equal(2);
  });

  it("Should have an destinationID for the trip", () => {
    expect(trip3.destinationID).to.equal(22);
  });

  it("Should have a number of travelers for the trip", () => {
    expect(trip3.travelers).to.equal(4);
  });

  it("Should have a date for the trip", () => {
    expect(trip2.date).to.equal("2022/10/04");
  });

  it("Should have a duration for the trip in days", () => {
    expect(trip2.duration).to.equal(18);
  });

  it("Should have a status for the trip", () => {
    expect(trip1.status).to.equal("approved");
  });

  it("Should have suggested activities for the trip", () => {
    expect(trip1.suggestedActivities).to.be.a("array");
  });
});
