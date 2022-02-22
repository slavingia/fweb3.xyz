const { expect } = require("chai");

describe("Game", function () {
  let Token;
  let token;
  let Game;
  let game;
  let owner;
  let addr1;
  let addr2;
  let addr3;
  let addr4;
  let addr5;
  let winner1;
  let winner2;
  let addrs;

  beforeEach(async function () {
      [owner, addr1, addr2, addr3, addr4, addr5, winner1, winner2, ...addrs] = await ethers.getSigners();

      Token = await ethers.getContractFactory("Fweb3");
      token = await Token.deploy();

      Game = await ethers.getContractFactory("Game");
      game = await Game.deploy(token.address);

      ///Seeding addr1, addr2 and addr3 with enough tokens
      await token.transfer(addr1.address, ethers.utils.parseEther("15"));
      await token.transfer(addr2.address, ethers.utils.parseEther("10"));
      await token.transfer(addr3.address, ethers.utils.parseEther("10"));
      await token.transfer(winner1.address, ethers.utils.parseEther("10"));
      await token.transfer(winner2.address, ethers.utils.parseEther("10"));
  });

  xit("should allow the players to seek verification", async function () {
  });

  xit("should allow judges to approve players", async function () {
  });

  xit("should allow the owner to add judges", async function () {
  });

  xit("should allow the owner to remove judges", async function () {
  });

  xit("should allow players to win", async function () {
  });
});