import dotenv from "dotenv";

dotenv.config();

const chainId = new Map([
  ["mumbai", 80001],
  ["rinkeby", 4],
]);

const txUrl = new Map([
  ["mumbai", "https://mumbai.polygonscan.com/tx"],
  ["rinkeby", "https://rinkeby.etherscan.io/tx"],
]);

const apiUrls = new Map([
  ["mumbai", process.env.ALCHEMY_API_URL_MUMBAI],
  ["rinkeby", process.env.ALCHEMY_API_URL_RINKEBY],
]);

const amount = new Map([
  ["mumbai", "1"],
  ["rinkeby", "0.1"],
]);

export { chainId, txUrl, apiUrls, amount };
