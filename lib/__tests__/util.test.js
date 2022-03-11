import { parseBalance, parseBalanceToNum, getTrophyColor } from "../util";

describe("validators", () => {
  it("parses balance", () => {
    const expected = "33,867";
    const actual = parseBalance("33867000000000000000000");
    expect(actual).toBe(expected);
  });
  it("parses balance to num", () => {
    const expected = 33867;
    const actual = parseBalanceToNum("33867000000000000000000");
    expect(actual).toBe(expected);
  });
  it("gets correct trophy color", () => {
    const copper = getTrophyColor();
    const silver = getTrophyColor(3000);
    const gold = getTrophyColor(300);
    expect(copper).toBe("copper");
    expect(silver).toBe("silver");
    expect(gold).toBe("gold");
  });
});
