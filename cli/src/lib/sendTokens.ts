import * as ora from "ora";
var axios = require("axios").default;
import * as chalk from "chalk";

import { apiUrl } from "../constants/constants";

const sendTokens = async (wallet: string, network: string) => {
  const spinner = ora(`🦄 sending tokens to ${wallet} on ${network}`).start();

  await axios
    .post(`${apiUrl}/request?address=${wallet}&network=${network}`)
    .then((res: any) => {
      if (res.data.insufficientFunds === true) {
        spinner.fail(
          chalk.redBright(
            `😿 I'm out of funds! You can use the Chainlink Faucet until I get refilled. https://faucets.chain.link.\nDonate: 0x16aD561aC34818E2f314E2D1d5a777cC39f5E3aB`
          )
        );
      } else {
        if (res.data.invalidAddress === true) {
          spinner.fail(chalk.redBright(`🤷‍♂️ The address provided is invalid`));
        } else {
          spinner.succeed(
            chalk.greenBright(
              `🎉 sent the tokens to ${wallet} on ${network}, check ${res.data.txLink} to verify if the transaction was successful`
            )
          );
        }
      }
    })
    .catch((err: any) => {
      spinner.fail(chalk.redBright`😿 ${err}`);
    });
};

export default sendTokens;
