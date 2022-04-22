import { Command } from "@oclif/core";
import * as inquirer from "inquirer";
import * as chalk from "chalk";

import sendTokens from "../lib/sendTokens";

import getToken from "../utils/getToken";

import questions from "../data/questions";

export default class Request extends Command {
  static description = "🚰 Request for testnet tokens";

  async run() {
    if (getToken() === null) {
      console.log(
        chalk.redBright(
          "\nYou need to be logged in first to use this command!\nUse `faucet-cli login` command to login."
        )
      );
      return;
    }

    inquirer.prompt(questions).then((answers) => {
      sendTokens(getToken(), answers.network);
    });
  }
}
