var chai = require("chai");
const { BigNumber } = require('ethers')
var expect = chai.expect;

describe("Game", function () {
  let Token;
  let token;
  let Game;
  let game;
  let owner;
  let player;
  let judge;
  let addrs;

  beforeEach(async function () {
    [owner, player, judge, ...addrs] = await ethers.getSigners();

    Token = await ethers.getContractFactory("Fweb3");
    token = await Token.deploy();

    Game = await ethers.getContractFactory("Game");
    game = await Game.deploy(token.address);

    // Seed everyone with enough tokens
    await token.transfer(game.address, ethers.utils.parseEther("1000000"));
    await token.transfer(owner.address, ethers.utils.parseEther("15"));
    await token.transfer(player.address, ethers.utils.parseEther("15"));
    await token.transfer(judge.address, ethers.utils.parseEther("15"));

    // Turn judge into a judge
    await game.connect(owner).addJudge(judge.address);
  });

  describe("players", function() {
    it("should be able to seek verification if they meet all the criteria", async function () {
      await token.transfer(player.address, ethers.utils.parseEther("500"));
      await expect(game.connect(player).seekVerification()).to.emit(game, "PlayerSeeksVerification").withArgs(player.address);
    });

    it("should not be able to seek verification if they don't have enough tokens", async function () {
      await expect(game.connect(player).seekVerification()).to.be.revertedWith("Not enough tokens");
    });

    it("should not be able to win if they have not been verified by a judge", async function () {
      await token.transfer(player.address, ethers.utils.parseEther("500"));
      await expect(game.connect(player).win()).to.be.revertedWith("Not verified by a judge");
    });

    it("should be able to win and receive tokens if they don't have enough", async function () {
      await token.transfer(player.address, ethers.utils.parseEther("500"));
      await expect(game.connect(judge).verifyPlayer(player.address)).to.emit(game, "PlayerVerifiedToWin").withArgs(player.address, judge.address);
      await expect(game.connect(player).win()).to.emit(game, "PlayerWon").withArgs(player.address);
      expect(await token.balanceOf(player.address) / 10 ** 18).to.equal(1515); // 15 + 500 + 1,000
    });

    it("should not be able to win if they have won before", async function () {
      await token.transfer(player.address, ethers.utils.parseEther("500"));
      await game.connect(owner).addJudge(player.address);
      await expect(game.connect(judge).verifyPlayer(player.address)).to.emit(game, "PlayerVerifiedToWin").withArgs(player.address, judge.address);
      await expect(game.connect(player).win()).to.emit(game, "PlayerWon").withArgs(player.address);
      await expect(game.connect(player).win()).to.be.revertedWith("Have won before");
    });
  });

  it("should allow judges to verify players as winners", async function () {
    await expect(game.connect(judge).verifyPlayer(player.address)).to.emit(game, "PlayerVerifiedToWin").withArgs(player.address, judge.address);
  });

  it("should not allow non-judges to verify players as winners", async function () {
    await expect(game.connect(player).verifyPlayer(judge.address)).to.be.revertedWith("Not a judge");
  });

  it("should allow owner to add judges", async function () {
    await game.connect(owner).addJudge(player.address);
    let judges = await game.getJudges();

    expect(judges.length).to.equal(2);
    expect(judges[0]).to.equal(judge.address);
    expect(judges[1]).to.equal(player.address);
  });

  it("should allow owner to remove judges", async function () {
    await game.connect(owner).removeJudge(judge.address);
    let judges = await game.getJudges();
    expect(judges.length).to.equal(1);
    expect(judges[0]).to.equal("0x0000000000000000000000000000000000000000");
  });
});