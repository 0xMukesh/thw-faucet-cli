import networks from "./networks";

const questions = [
  {
    type: "list",
    name: "network",
    message:
      "🦄 choose the testnet network on which you want to request the tokens",
    choices: networks,
  },
];

export default questions;
