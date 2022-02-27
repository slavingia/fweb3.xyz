import React from "react";

const Trophy = (props) => {
  const contractUrl =
    "https://polygonscan.com/address/0x2a0493dee4f4b5e4b595326f0e73645f6f493923#writeContract";
  const openseaUrl =
    "https://opensea.io/assets/matic/0x2a0493dee4f4b5e4b595326f0e73645f6f493923/";

  if (props.trophyId == 0) {
    return (
      <>
        <p>
          For your efforts, you&apos;ve received 1,000 FWEB3 tokens and can now
          mint a <a href={contractUrl}>Trophy NFT</a>.
        </p>
        <p>
          Hurry! There are only 10,000 trophies. The first 333 winners get a
          Gold trophy, the next 3,333 get a Silver trophy, and the rest get a
          Bronze trophy.
        </p>
      </>
    );
  } else {
    let trophyColor;
    if (props.trophyId <= 333) {
      trophyColor = "gold";
    } else if (props.trophyId <= 3333) {
      trophyColor = "silver";
    } else {
      trophyColor = "copper";
    }
    return (
      <>
        <p>Here&apos;s your trophy:</p>
        <a href={openseaUrl + props.trophyId} target="_blank" rel="noreferrer">
          <img
            src={"/fweb_yearone_" + trophyColor + ".png"}
            style={{ width: "100%" }}
          />
        </a>
      </>
    );
  }
};

export default Trophy;
