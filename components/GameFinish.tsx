import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const CONTRACT = '0xc6c5F7B1a27528DD6F34EF164377965114bfA7D9';
const ABI = [{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_player","type":"address"}],"name":"PlayerSeeksVerification","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_player","type":"address"},{"indexed":true,"internalType":"address","name":"_judge","type":"address"}],"name":"PlayerVerifiedToWin","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"player","type":"address"}],"name":"PlayerWon","type":"event"},{"inputs":[{"internalType":"address","name":"judge","type":"address"}],"name":"addJudge","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getJudges","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"player","type":"address"}],"name":"hasBeenVerifiedToWin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"player","type":"address"}],"name":"hasNotWonBefore","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"player","type":"address"}],"name":"hasTokens","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"judge","type":"address"}],"name":"isJudge","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"player","type":"address"}],"name":"isWinner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"judge","type":"address"}],"name":"removeJudge","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"seekVerification","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"player","type":"address"}],"name":"verifyPlayer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"win","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const GameFinish = () => {
    const [isJudge, setIsJudge] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [isWinner, setIsWinner] = useState(false);
    const [loading, setLoading] = useState(false);
    const [transactionFinished, setTransactionFinished] = useState(false);

    const { active, error, activate, account, setError } = useWeb3React();
    const { query } = useRouter();

    const getProviderOrSigner = (needSigner = false) => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                if (needSigner) {
                    const signer = provider.getSigner();
                    return signer;
                }
                return provider;
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error);
        }

    }

    const getJudge = async (account: string) => {
        const provider = getProviderOrSigner();
        const contract = new ethers.Contract(CONTRACT, ABI, provider);
        setIsJudge(await contract.isJudge(account));
    }

    const getVerified = async (account: string) => {
        const provider = getProviderOrSigner();
        const contract = new ethers.Contract(CONTRACT, ABI, provider);
        const user = query.wallet ? query.wallet : account;
        setIsVerified(await contract.hasBeenVerifiedToWin(user));
    }

    const getWinner = async (account: string) => {
        const provider = getProviderOrSigner();
        const contract = new ethers.Contract(CONTRACT, ABI, provider);
        const user = query.wallet ? query.wallet : account;
        setIsWinner(await contract.isWinner(user));
    }

    useEffect(() => {
        if (typeof(account) === 'string') {
            getJudge(account);
            getVerified(account);
            getWinner(account);
        }
    }, [active, error])

    const seekVerification = async () => {
        const signer = getProviderOrSigner(true);
        const contract = new ethers.Contract(CONTRACT, ABI, signer);
        const tx = await contract.seekVerification();
        setLoading(true);
        await tx.wait();
        setLoading(false);
        setTransactionFinished(true);
    }

    const win = async () => {
        const signer = getProviderOrSigner(true);
        const contract = new ethers.Contract(CONTRACT, ABI, signer);
        const tx = await contract.win();
        setLoading(true);
        await tx.wait();
        setLoading(false);
        setTransactionFinished(true);
    }

    const verify = async () => {
        const signer = getProviderOrSigner(true);
        const contract = new ethers.Contract(CONTRACT, ABI, signer);
        const tx = await contract.verifyPlayer(query.wallet);
        setLoading(true);
        await tx.wait();
        setLoading(false);
        setTransactionFinished(true);
    }

    if (loading) {
        return <img src={'/loading.gif'} alt="loading"/>
    // User is not verified and on their own page
    } else if (!isVerified && (!query.wallet || query.wallet === account)) {
        if (transactionFinished) {
            return <p>Please wait for a judge to verify you. If it's been awhile, ping #finish-line to remind them.</p>
        }
        return (
            <>
                <p>Please click the button below to seek verification from a judge.</p>
                <p>Once a judge verifies you, you'll be able to claim your 1,000 $FWEB3 tokens.</p>
                <button onClick={seekVerification} className="pulse">Seek verification</button>
            </>
        )
    // User is a judge and page account is not verified
    } else if (!isVerified && isJudge) {
        if (transactionFinished) {
            return <p>You can remind this player to claim their tokens.</p>
        }
        return (
            <>
                <p>If the nine dots on the left are lit up:</p>
                <button onClick={verify} className="pulse">Verify</button>
            </>
        )
    // User is verified and is not a winner and is on their own page
    } else if (isVerified && !isWinner && (!query.wallet || query.wallet === account)) {
        if (transactionFinished) {
            return (
                <>
                    <p>Your tokens are en route...</p>
                </>
            )
        }
        return (
            <>
                <button onClick={win} className="pulse">Claim 1,000 $FWEB3 tokens</button>
            </>
        )
    } else if (isWinner) {
        return (
            <>
                <p>
                    For your efforts, you've received 1,000 FWEB3 tokens and can now mint a{" "}
                    <a href="https://polygonscan.com/address/0x65b8456a2da79682badef2a5cf6ea9ae7b55a1ba#writeContract">
                        Trophy NFT
                    </a>
                    .
                </p>
                <p>
                    Hurry! The first 1,000 winners get a Gold trophy, the next 9,000 get a Silver trophy, and the rest get a Bronze trophy.
                </p>
                <p>Enjoyed yourself? Consider onboarding a friend or family member by sending them some $FWEB3 tokens.</p>
                <p>Or help us build by chiming into the #building channel on Discord.</p>
            </>
        )
    } else {
        return <></>
    }
}

export default GameFinish;