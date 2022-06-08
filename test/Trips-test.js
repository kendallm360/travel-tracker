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
});
