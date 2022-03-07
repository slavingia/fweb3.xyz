import { polygonWalletURI, missingParamsErrorString } from "./endpoints";

describe("endpoints", () => {
  it("builds url without debug", () => {
    const expected = "/api/polygon?wallet_address=bar";
    const mockParams = {
      account: "foo",
      wallet: "bar",
      debug: null,
    };
    const actual = polygonWalletURI(mockParams);
    expect(actual).toEqual(expected);
  });
  it("builds url with debug as a bool || string", () => {
    const expected = "/api/polygon?wallet_address=bar&debug=true";
    const mockDebugParams = {
      account: "foo",
      wallet: "bar",
      debug: true,
    };
    const actualBool = polygonWalletURI(mockDebugParams);
    expect(actualBool).toEqual(expected);
    const mockParams = {
      account: "foo",
      wallet: "bar",
      debug: "true",
    };
    const actualBoolString = polygonWalletURI(mockParams);
    expect(actualBoolString).toEqual(expected);
  });
  it("should prefer wallet over account", () => {
    const expected = "/api/polygon?wallet_address=bar";
    const mockParams = {
      account: "foo",
      wallet: "bar",
      debug: null,
    };
    const actual = polygonWalletURI(mockParams);
    expect(actual).toEqual(expected);
  });
  it("selects account if no wallet present", () => {
    const expected = "/api/polygon?wallet_address=foo";
    const mockParams = {
      account: "foo",
      debug: null,
    };
    const actual = polygonWalletURI(mockParams);
    expect(actual).toEqual(expected);
  });
});
