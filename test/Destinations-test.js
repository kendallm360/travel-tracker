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

  it("Should have an id for the destination", () => {
    expect(destination2.id).to.equal(25);
  });

  it("Should have destination", () => {
    expect(destination3.destination).to.equal("Sydney, Austrailia");
  });

  it("Should have an estimated cost for lodging per day", () => {
    expect(destination3.estimatedLodgingCostPerDay).to.equal(130);
  });

  it("Should have an estimated cost for the flight per person", () => {
    expect(destination2.estimatedFlightCostPerPerson).to.equal(780);
  });

  it("Should have a link to an image of the destination", () => {
    expect(destination1.image).to.equal(
      "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80"
    );
  });

  it("Should have alt text for the image of the destination", () => {
    expect(destination1.alt).to.equal(
      "overview of city buildings with a clear sky"
    );
  });

  it("Should return an error if no property information has been provided", () => {
    expect(destination4.id).to.equal("No ID has been provided");
    expect(destination4.destination).to.equal(
      "No destination has been provided"
    );
    expect(destination4.estimatedLodgingCostPerDay).to.equal(
      "No lodging cost have been provided"
    );
    expect(destination4.estimatedFlightCostPerPerson).to.equal(
      "No flight cost have been provided"
    );
    expect(destination4.image).to.equal("No image has been provided");
    expect(destination4.alt).to.equal("No alt tag has been provided");
  });
});
