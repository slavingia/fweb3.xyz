// Interfaces are preferred to types these days for their added features
// https://stackoverflow.com/a/37233777
export interface Address {
  address: string | string[];
}

export interface TrophyProps {
  trophyId: number;
}

export interface IAccountProps {
  triedToEagerConnect: boolean;
}
