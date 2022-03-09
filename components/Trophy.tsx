import { ReactElement } from "react";
import Image from "next/image";

import { TROPHY_NFT_ADDRESS } from "../constants";
import { TrophyProps } from "./types";

const _getTrophyColor = (trophyId: number): string => {
  if (trophyId <= 333) {
    return "gold";
  } else if (trophyId <= 3333) {
    return "silver";
  }
  return "copper";
};

export const Trophy: React.FC<TrophyProps> = ({ trophyId }): ReactElement => {
  const contractUrl = `https://polygonscan.com/address/${TROPHY_NFT_ADDRESS}#writeContract`;
  const openSeaUrl = `https://opensea.io/assets/matic/${TROPHY_NFT_ADDRESS}/`;

  if (trophyId == 0) {
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
    const trophyColor = _getTrophyColor(trophyId);
    return (
      <>
        <p>Here&apos;s the trophy that proves it:</p>
        <p>
          <a
            href={openSeaUrl + trophyId}
            style={{ display: "block" }}
            target="_blank"
            rel="noreferrer"
          >
            <Image
              alt="trophy image"
              src={"/fweb_yearone_" + trophyColor + ".png"}
              layout="intrinsic"
            />
          </a>
        </p>
      </>
    );
  }
};
