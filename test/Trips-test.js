import chai from "chai";
const expect = chai.expect;
import Trips from "../src/Trips";
import { tripsInstance1 } from "../test/MockData/MockData";

describe("Trips", () => {
  let trip1;

  beforeEach(() => {
    trip1 = tripsInstance1;
  });

  it("Should be a function", () => {
    expect(Trips).to.be.a("function");
  });

  it("Should be an instance of Trips", () => {
    expect(trip1).to.be.an.instanceOf(Trips);
  });
});
