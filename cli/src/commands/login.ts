import { Command } from "@oclif/core";
import * as chalk from "chalk";

import connectWallet from "../lib/connectWallet";

import getToken from "../utils/getToken";

export default class Login extends Command {
  static description = "🦁 Connect your Metamask wallet to the faucet CLI";

  static examples = ["faucet-cli login"];

  async run() {
    if (getToken() !== null) {
      console.log(chalk.redBright("\nYou are already logged in!"));
      return;
    }
    connectWallet();
  }
}
