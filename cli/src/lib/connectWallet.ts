import * as inquirer from "inquirer";
import * as express from "express";
import * as open from "open";
import * as chalk from "chalk";

import saveAddress from "../utils/saveAddress";

const connectWallet = async () => {
  inquirer
    .prompt([
      {
        name: "openBrowser",
        type: "confirm",
        message: "Would you like to open the browser to connect wallet?",
        default: true,
      },
    ])
    .then(async (answer) => {
      if (!answer.openBrowser) {
        console.log(
          "You won't be able to request testnet tokens if you don't connect your wallet."
        );
        return;
      }

      try {
        const app: express.Application = express();

        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));

        const server = app.listen(9991);

        let resolve: any;

        const p = new Promise((_resolve) => {
          resolve = _resolve;
        });

        // get the address query param which is been sent by the website and redirecting the user to the done page.
        app.get(
          "/callback",
          async (req: express.Request, res: express.Response) => {
            resolve(req.query.address);
            res.redirect("http://localhost:3000/redirect");
          }
        );

        // opening the main website in browser
        open("http://localhost:3000");

        // grabbing the address from the query param
        const code = await p;

        saveAddress(code as string);

        console.log(
          chalk.greenBright(
            `\nYou have successfully connected your wallet to the faucet CLI!\nWallet address: ${code}`
          )
        );

        // closing the server as we don't want it to running forever
        server.close();

        process.exit(0);
      } catch (err) {
        console.log(err);

        process.exit(1);
      }
    });
};

export default connectWallet;
