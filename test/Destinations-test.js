import chai from "chai";
const expect = chai.expect;
import Destinations from "../src/Destinations";
import testData from "./MockData/MockData";

describe("Destinations", () => {
  let destinationData;
  let destination1;
  let destination2;
  let destination3;
  let destination4;

  beforeEach(() => {
    destinationData = testData.destinations;
    destination1 = new Destinations(destinationData[0]);
    destination2 = new Destinations(destinationData[1]);
    destination3 = new Destinations(destinationData[2]);
    destination4 = new Destinations(destinationData[3]);
  });

  it("Should be a function", () => {
    expect(Destinations).to.be.a("function");
  });

  it("Should be an instance of the Destination class", () => {
    expect(destination1).to.be.an.instanceOf(Destinations);
  });
});
