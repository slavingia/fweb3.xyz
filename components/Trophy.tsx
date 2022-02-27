import React from 'react';

const Trophy = (props) => {
    const contractUrl = "https://polygonscan.com/address/0x2a0493dee4f4b5e4b595326f0e73645f6f493923#writeContract"

    if (props.trophyColor == '') {
        return (
            <>
                <p>
                    For your efforts, you&apos;ve received 1,000 FWEB3 tokens and can now mint a <a href={contractUrl}>Trophy NFT</a>.
                </p>
                <p>
                    Hurry! There are only 10,000 trophies. The first 333 winners get a Gold trophy, the next 3,333 get a Silver trophy, and the rest get a Bronze trophy.
                </p>
            </>
        )
    } else {
        return (
            <>
                <p>Here&apos;s your trophy:</p>
                <p>
                  <img src={'/fweb_yearone_' + props.trophyColor + '.png'} style={{width: '100%'}} />
                </p>
            </>
        )
    }
}

export default Trophy;