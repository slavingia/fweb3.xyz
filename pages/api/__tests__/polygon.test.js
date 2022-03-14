import { createMocks } from "node-mocks-http";
import {
  fetchDebugGameState,
  fetchCurrentGameState,
} from "../../../lib/polygon/game";

import { MOCK_WALLET_ADDRESS } from "../../../lib/polygon/__mocks__/mockWalletAddress";
import polygonApiHandler from "../polygon";

const constantsMock = jest.requireMock("../../../lib/constants");

jest.mock("../../../lib/constants", () => ({
  POLYGON_API_KEY: "foo",
  NEXT_PUBLIC_DEBUG_ENABLE_DOTS: 0,
}));

jest.mock("../../../lib/polygon/game");

afterEach(() => {
  jest.resetAllMocks();
});

describe("external polygon api", () => {
  it("fails for bad request method", async () => {
    const { req, res } = createMocks({
      method: "POST",
      query: {},
    });

    await polygonApiHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual("Bad request type");
  });
  it("fails for no api key", async () => {
    constantsMock.POLYGON_API_KEY = null;
    const { req, res } = createMocks({
      method: "GET",
      query: {},
    });

    await polygonApiHandler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual(
      "Missing required environment vars"
    );
  });
  it("fails for malformatted address", async () => {
    constantsMock.POLYGON_API_KEY = "bar";
    const { req, res } = createMocks({
      method: "GET",
      query: {
        wallet_address: "foo",
      },
    });

    await polygonApiHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual("Malformatted address");
  });
  it("calls to fetch debug game state", async () => {
    constantsMock.POLYGON_API_KEY = "foo";
    constantsMock.NEXT_PUBLIC_DEBUG_ENABLE_DOTS = 111;
    const { req, res } = createMocks({
      method: "GET",
      query: {
        wallet_address: MOCK_WALLET_ADDRESS,
        debug: constantsMock.NEXT_PUBLIC_DEBUG_ENABLE_DOTS,
      },
    });
    fetchDebugGameState.mockReturnValueOnce("foo");
    await polygonApiHandler(req, res);

    expect(fetchDebugGameState).toHaveBeenCalledTimes(1);
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual("foo");
  });
  it("calls to fetch current game state", async () => {
    constantsMock.POLYGON_API_KEY = "foobar";
    constantsMock.NEXT_PUBLIC_DEBUG_ENABLE_DOTS = null;

    const { req, res } = createMocks({
      method: "GET",
      query: {
        wallet_address: MOCK_WALLET_ADDRESS,
      },
    });
    fetchCurrentGameState.mockReturnValue("barbaz");
    await polygonApiHandler(req, res);

    expect(fetchCurrentGameState).toHaveBeenCalledTimes(1);
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual("barbaz");
  });
});
