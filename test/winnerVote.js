const { expect } = require("chai");

describe("Winner Approval", function () {
    let Token;
    let token;
    let WinnerApproval;
    let winnerApproval;
    let numApprovers;
    let tokenAddress;
    let minNumTokens;
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

        Token = await ethers.getContractFactory("Token");
        token = await Token.deploy();

        numApprovers = 2;
        tokenAddress = token.address;
        minNumTokens = 10;

        WinnerApproval = await ethers.getContractFactory("WinnerApproval");
        winnerApproval = await WinnerApproval.deploy(numApprovers, tokenAddress, minNumTokens);

        ///Seeding addr1, addr2 and addr3 with enough tokens
        await token.transfer(addr1.address, ethers.utils.parseEther("15"));
        await token.transfer(addr2.address, ethers.utils.parseEther("10"));
        await token.transfer(addr3.address, ethers.utils.parseEther("10"));
        await token.transfer(winner1.address, ethers.utils.parseEther("10"));
        await token.transfer(winner2.address, ethers.utils.parseEther("10"));

        //Seeding winners to start
        await winnerApproval.connect(owner).ownerAddWinner(winner1.address);
        await winnerApproval.connect(owner).ownerAddWinner(winner2.address);
    });

    it("Should allow the owner to add a winner and for that winner to be verified", async function () {
        expect(await winnerApproval.connect(addr1).checkWinnerStatus(addr1.address)).to.equal(false);
        await winnerApproval.connect(owner).ownerAddWinner(addr1.address);
        expect(await winnerApproval.connect(addr1).checkWinnerStatus(addr1.address)).to.equal(true);
    });

    it("Should only allow the owner to use ownerAddWinner", async function () {
        await expect(winnerApproval.connect(addr1).ownerAddWinner(addr1.address))
            .to.be.revertedWith("Ownable: caller is not the owner");
        expect(await winnerApproval.connect(owner).ownerAddWinner(addr1.address))
            .to.emit(winnerApproval, "WinnerVerified")
            .withArgs(addr1.address, true, false);
    })
    
    describe("Approval Workflow", function () {
        it("Should allow an approved winner to grant approval to a user", async function () {
            //Success
            expect(await winnerApproval.connect(winner1).addApproval(addr1.address))
                .to.emit(winnerApproval, "ApprovalGranted")
                .withArgs(winner1.address, addr1.address);
            //Other Success
            expect(await winnerApproval.connect(winner2).addApproval(addr2.address))
                .to.emit(winnerApproval, "ApprovalGranted")
                .withArgs(winner2.address, addr2.address);          
        })

        it("Should not allow an approver to add a user if they lack tokens", async function () {
            //Failure (not enough tokens)
            await expect(winnerApproval.connect(winner1).addApproval(addr4.address))
                .to.be.revertedWith("User does not have enough tokens");
        })

        it("Should not allow an approval if the user is already a winner", async function () {
            //Failure (user already added)
            await expect(winnerApproval.connect(winner2).addApproval(winner1.address))
                .to.be.revertedWith("User already on winner list");     
        })

        it("Should not add approval if the approver already gave approval", async function () { 
            //Failure (approver already gave approval)
            await winnerApproval.connect(winner1).addApproval(addr1.address)
            await expect(winnerApproval.connect(winner1).addApproval(addr1.address))
                .to.be.revertedWith("Approval already granted for user from approver");       
        })

        it("Should not allow a non-winner to give approval", async function () { 
            //Failure (approver is not a winner)
            await expect(winnerApproval.connect(addr5).addApproval(addr1.address))
                .to.be.revertedWith("Approver not on winner list");      
        })

        it("Should show if I've given approval for a particular user", async function () {
            winnerApproval.connect(winner1).addApproval(addr1.address);
            let approvals = await winnerApproval.checkApprovers(addr1.address);
            expect(approvals.includes(winner1.address)).to.equal(true);
            expect(approvals.includes(winner2.address)).to.equal(false);
        })
    });

    describe("Verify Winner", function () {
        it("Should allow me to verify if I'm a winner if I qualify", async function () {
            await winnerApproval.connect(winner1).addApproval(addr1.address);
            await winnerApproval.connect(winner2).addApproval(addr1.address);
            expect(await winnerApproval.connect(addr1).verifyWinner(addr1.address))
                .to.emit(winnerApproval, "WinnerVerified")
                .withArgs(addr1.address, false, true);
        });

        it("Should not allow me to verify if I don't have enough approvers", async function () {
            await expect(winnerApproval.connect(addr1).verifyWinner(addr1.address))
                .to.be.revertedWith("Not enough approvers");
            winnerApproval.connect(winner1).addApproval(addr1.address);
            await expect(winnerApproval.connect(addr1).verifyWinner(addr1.address))
                .to.be.revertedWith("Not enough approvers");
        })

        it("Should not allow a verification if the user is already a winner", async function () {
            await winnerApproval.connect(winner1).addApproval(addr1.address);
            await winnerApproval.connect(winner2).addApproval(addr1.address); 
            await winnerApproval.connect(addr1).verifyWinner(addr1.address);           
            await expect(winnerApproval.connect(addr1).verifyWinner(addr1.address))
                .to.be.revertedWith("Already verified as a winner");
        })
    })

});