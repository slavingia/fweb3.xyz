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
        setIsWinner(await contract.hasBeenVerifiedToWin(user));
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
        const tx = await contract.verify(query);
        setLoading(true);
        await tx.wait();
        setLoading(false);
        setTransactionFinished(true);
    }

    // User is not verified and on their own page
    if (!isVerified && (!query || query === account)) {
        return (
            <>
                <p>Click on the button below to seek verification. A judge will verify you before you can win and collect rewards!</p>
                <p>Once a judge verifies you, the button will turn into a win button. Go to #finish-line in Discord to remind judges.</p>
                <button onClick={seekVerification} className="pulse">Seek Verification</button>
            </>
        )
    // User is a judge and page account is not verified
    } else if (!isVerified && isJudge) {
        return (
            <>
                <p>Please double check this person has completed all the dots before verifying.</p>
                <button onClick={verify} className="pulse">Verify</button>
            </>
        )
    // User is verified and is not a winner and is on their own page
    } else if (isVerified && !isWinner && (!query || query === account)) {
        return (
            <>
                <p>Click the button below to claim your rewards. Congratulations!</p>
                <button onClick={win} className="pulse">Win!</button>
            </>
        )
    } else if (isWinner) {
        return (
            <>
                <p>You have claimed your prize already.</p>
                <p>Congratulations, winner!</p>
            </>
        )
    } else {
        return <></>
    }
}

export default GameFinish;