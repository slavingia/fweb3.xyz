import ENSLookup from "./ENSLookup";
import { GameDescriptionText } from "./GameDescriptionText";
import GameFinish from "./GameFinish";
import { ConnectWalletButton } from "./ConnectWalletButton";
import { GameContext } from "../context";
import { useContext } from "react";
import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";

export const ActiveDotInfo = () => {
  const { query } = useRouter();
  const { chainId } = useWeb3React();
  const gameState = useContext(GameContext);
  const { activeDot, completedTiles, gameTileCompletionStates, trophyId } =
    gameState;
  return (
    <section>
      {completedTiles === 9 && activeDot == -1 && (
        <div>
          <h2>
            {<ENSLookup address={query.wallet} /> ? (
              <ENSLookup address={query.wallet} />
            ) : (
              "You"
            )}{" "}
            learned and built in web3!
          </h2>
          <GameFinish trophyId={trophyId ? trophyId : ""} />
        </div>
      )}
      {(activeDot === -1 || activeDot === 0) && completedTiles !== 9 && (
        <GameDescriptionText />
      )}
      {activeDot === 0 && (
        <>
          <p>
            To get started, click the pulsing button, install MetaMask if you
            haven&apos;t already, and login.
          </p>
          <p>
            If you&apos;re new, take your seed phrase and stick it in Apple
            Notes. It&apos;s good enough for now.
          </p>
          <p style={{ color: "#f55" }}>
            Note: there&apos;s lots of phishing happening out there! Our code is{" "}
            <a
              href="https://github.com/slavingia/fweb3.xyz"
              target="_blank"
              rel="noreferrer"
            >
              open source
            </a>{" "}
            so you can make sure it&apos;s safe. We only use MetaMask to get
            your wallet address.
          </p>
        </>
      )}
      {activeDot === 1 && (
        <>
          <h2>Receive tokens (for free!)</h2>
          <p>
            <a
              href="https://discord.gg/pNSFNfyVxA"
              target="_blank"
              rel="noreferrer"
            >
              Join our Discord
            </a>{" "}
            and ask in #faucet for 222 $FWEB3 tokens by specifying your wallet
            address.
          </p>
          <p>That&apos;s enough to complete all the tasks in the game.</p>
          <p>
            Don&apos;t see your tokens? Double check that your wallet is
            connected to the Polygon Network.
          </p>
          <p>
            Once you receive them, use the #collabland-join channel to verify
            your ownership and see the rest of the channels on Discord.
          </p>
        </>
      )}
      {activeDot === 2 && (
        <>
          <h2>Receive gas using tokens (for free!)</h2>
          <p>
            Use our faucet to receive .1 MATIC. You&apos;ll need at least 100
            $FWEB3 tokens in order to do this.
          </p>
          <p style={{ color: "#f55" }}>
            Note that using the faucet directly will cost some gas, which you
            don&apos;t have yet! So...
          </p>
          <p>
            Use this website we built to use it for free:{" "}
            <a
              href="https://fweb3-matic-faucet.netlify.app/"
              target="_blank"
              rel="noreferrer"
            >
              https://fweb3-matic-faucet.netlify.app/
            </a>
          </p>
        </>
      )}
      {activeDot === 3 && (
        <>
          <h2>Use gas to send tokens</h2>
          <p>This one&apos;s easy!</p>
          <p>Use MetaMask to send 100 FWEB3 tokens to someone.</p>
        </>
      )}
      {activeDot === 4 && (
        <>
          <h2>Mint an NFT</h2>
          <p>
            Go to{" "}
            <a
              href="https://polygonscan.com/address/0x9a323979dD8AebC6ecc156d965C417D39Eb61a5B#writeContract"
              target="_blank"
              rel="noreferrer"
            >
              our diamond NFT smart contract
            </a>{" "}
            and mint yourself a Diamond NFT that will last forever.
          </p>
          <p>
            To mint yourself a unique diamond, pick a number of your choice and
            enter it in the “mint” function.
          </p>
          <p style={{ color: "#f55" }}>
            If the gas is too high, it means that diamond is already taken.
            Please try a new one!
          </p>
          <p>
            This will show up in your OpenSea shortly, which you can see here:{" "}
            <a
              href="https://opensea.io/account"
              target="_blank"
              rel="noreferrer"
            >
              https://opensea.io/account
            </a>
          </p>
        </>
      )}
      {activeDot === 5 && (
        <>
          <h2>Burn a token</h2>
          <p>
            Do this by sending at least 1 $FWEB3 token to:{" "}
            <pre>0x000000000000000000000000000000000000dead</pre>
          </p>
          <p>
            This is kind of like throwing a dollar bill in a river. It
            won&apos;t be reflected in the totalSupply function universally, but
            there is a paper trail that you effectively destroyed one token.
            Deflation!
          </p>
        </>
      )}
      {activeDot === 6 && (
        <>
          <h2>Swap a token</h2>
          <p>
            Go to Uniswap to swap 1 $FWEB3 token for some more MATIC:{" "}
            <a
              href="https://app.uniswap.org/#/swap?chain=polygon"
              target="_blank"
              rel="noreferrer"
            >
              https://app.uniswap.org/#/swap?chain=polygon
            </a>
            .
          </p>
          <p>
            If it doesn&apos;t appear, that means you need to import the FWEB3
            token into Uniswap.
          </p>
        </>
      )}
      {activeDot === 7 && (
        <>
          <h2>Vote in a proposal with your tokens</h2>
          <p>
            Use our poll contract to vote yes or no. You&apos;ll need at least
            100 $FWEB3 tokens in order to do this.
          </p>
          <p>
            <a
              href="https://polygonscan.com/address/0x718ad63821a6a3611Ceb706f15971ee029812365#writeContract"
              target="_blank"
              rel="noreferrer"
            >
              0x718ad63821a6a3611Ceb706f15971ee029812365
            </a>
          </p>
          <p>What question are you answering? Who knows!</p>
        </>
      )}
      {activeDot === 8 && (
        <>
          <h2>Create your own token</h2>
          <p>
            This is the final step. You&apos;re going to deploy your own code to
            the Polygon blockchain, just like we had to do to make this game.
          </p>
          <p>
            So far, you have interfaced with **three** smart contracts we have
            deployed:
          </p>
          <ol>
            <li>The ERC20 token for the 10,000,000 $FWEB3 tokens</li>
            <li>The ERC721 token for the Diamond NFT</li>
            <li>The scratch-made smart contract of the poll above</li>
          </ol>
          <p>
            Now you will deploy one of your own. Need help? Check out{" "}
            <a
              href="https://www.notion.so/fweb3/Walkthrough-8ac4fc0d3b814a068767c86d63fd8fb7#3c526735ae074b88838ad7b467545614"
              target="_blank"
              rel="noreferrer"
            >
              this video
            </a>{" "}
            we made.
          </p>
        </>
      )}
      {!gameTileCompletionStates[0] && !query.wallet && (
        <div>
          <p>
            It&apos;s free to play. Login with MetaMask to get started
            (you&apos;ll be prompted to install it if you don&apos;t have it
            already):
          </p>
          <ConnectWalletButton />
          {chainId !== undefined && chainId !== 137 && !query.wallet && (
            <p style={{ color: "#f55" }}>
              Switch to Polygon via MetaMask to play this game.
            </p>
          )}
        </div>
      )}
      {completedTiles !== 9 && (
        <p style={{ color: "#fff", fontWeight: "bold" }}>
          Stuck? Click the dots to the left to see further instructions, or
          check out the Walkthrough below.
        </p>
      )}
    </section>
  );
};
