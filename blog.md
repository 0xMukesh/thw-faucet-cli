# How to build a faucet command-line interface?

Hey everyone 👋! I guess I took a long break from blogging but I am back with some interesting web3 stuff. We are doing to be BUIDLing a command-line interface with would act as a faucet and we would be also adding metamask authentication to it 🚀!

![https://c.tenor.com/oR5fQW3UW78AAAAC/gm-web3.gif](https://c.tenor.com/oR5fQW3UW78AAAAC/gm-web3.gif)

# 💡 The idea

Let’s understand the idea of the command-line interface which we are going to be building. It’s a simple command-line interface that sends testnet tokens to the user and we are going to be adding metamask authentication also 👀.

Wait what? Metamask authentication via a CLI ???

![https://c.tenor.com/awhlFQC8WcAAAAAM/kid-what.gif](https://c.tenor.com/awhlFQC8WcAAAAAM/kid-what.gif)

Let me explain how are we going to implement the Metamask authentication.

- We would create a basic website using Next.js which would have the connect with wallet (Metamask authentication) button.
- After the user has authenticated themselves via Metamask on the website, they would be redirected to a page with route `/callback`. When redirected the page would also contain a query parameter that contains the user’s wallet address 👀. So the user would be redirected to a page with route path something like this: `/callback?address=0xd24CA0297558f0827e2C467603869D1AC9fF435d`.
- We would be starting up a local express application at port `9991` (don’t worry we would be immediately closing the port after the authentication process is been completed). The `/callback` route exists on this local express application.
- 👀 We don’t want the user to be seeing a blank page for hours right? (in context to make the user stay on the `/callback` route on the local express application) Instead, we can redirect them to a `/done` route on the main website, so that they will know that the authentication process is being completed.

![Authentication workflow](https://imgur.com/vMk25Mx.png)

😵‍💫 Woah! That’s hard to digest in one go

# ⚒️ Tech stack

The tech stack which we are going to be using to build this CLI:

- TypeScript is the main programming language that we are going to be using to program both the command-line interface and the website
- Next.js is the framework that we are going to be using to build the website
- Tailwind CSS as our CSS framework to style the website
- Express as the backend framework (We are going to be sending requesting to send the testnet via the backend, as it is safe to send the request directly from the command-line interface)
- Oclif as our command-line interface framework
- Thirdweb for the metamask authentication
- Web3.js to perform tasks such as sending the testnet token to the user
- Alchemy as our blockchain node service

# 🛠️ Building the website

## 🏗️ Creating a new Next.js project

Let’s create a new Next.js project by using the following command:

```bash
npx create-next-app -e=with-tailwindcss thw-faucet-cli
```

I am using `thw-faucet-cli` as my CLI name. Feel free to change the name of the CLI.

This should generate a folder structure similar to this:

![Folder structure of the generated Next.js project](https://imgur.com/7wf52Gk.png)

## 🦁 Adding metamask authentication using thirdweb

We would have to install a few packages so that we can build the metamask authentication using thirdweb.

```bash
yarn add @thirdweb-dev/react @thirdweb-dev/sdk ethers
```

After you have installed it, go ahead and open the `pages/_app.tsx` file. We would have to set up the `ThirdwebProvider` that provides all the context consumed by your app. With this context, you will have a standard web3 provider that you can use throughout your app.

To set up the `ThirdwebProvider` you need to just wrap your app with the following setup:

```ts
import type { AppProps } from "next/app";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const desiredChainId = ChainId.Mumbai;

  return (
    <ThirdwebProvider desiredChainId={desiredChainId}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
```

Let’s now open the setup feature where the user can click a button can connect to their wallet.

Head over to the `pages/index.tsx` file and add the following code:

```ts
import type { NextPage } from "next";

import {
  useAddress,
  useMetamask,
  useCoinbaseWallet,
  useWalletConnect,
  useDisconnect,
} from "@thirdweb-dev/react";

const Home: NextPage = () => {
  const connectWithCoinbaseWallet = useCoinbaseWallet();
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const address = useAddress();
  const disconnectWallet = useDisconnect();

  if (address) {
    return (
      <div>
        <p className="m-12 font-medium text-gray-600">Address: {address}</p>
        <br />
        <button
          onClick={disconnectWallet}
          className="w-64 rounded-full bg-blue-600 py-2 font-medium text-white transition-all duration-75 hover:bg-blue-500"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-gray-50">
        <button
          onClick={connectWithCoinbaseWallet}
          className="w-64 rounded-full bg-blue-600 py-2 font-medium text-white transition-all duration-75 hover:bg-blue-500"
        >
          Connect Coinbase Wallet
        </button>
        <button
          onClick={connectWithMetamask}
          className="w-64 rounded-full bg-blue-600 py-2 font-medium text-white transition-all duration-75 hover:bg-blue-500"
        >
          Connect MetaMask
        </button>
        <button
          onClick={connectWithWalletConnect}
          className="w-64 rounded-full bg-blue-600 py-2 font-medium text-white transition-all duration-75 hover:bg-blue-500"
        >
          Connect WalletConnect
        </button>
      </div>
    </>
  );
};

export default Home;
```

Let’s what kind of magic is the above code doing 👀

We can are using the React hooks provided by the `@thirdweb-dev/react` package which we have installed just a while ago. We are importing the following hooks:

- `useAddress`, Used to get the address when the user has successfully authenticated themselves
- `connectWithMetamask`, Used to open the Metamask popup from which the user can authenticate themselves
- `connectWithCoinbaseWallet`, Used to authenticate the user via [Coinbase Wallet](https://www.coinbase.com/wallet)
- `connectWithWalletConnect`, Used to authenticate the user via [Wallet Connect](https://walletconnect.com/)

Let’s now test it out by running `yarn dev` command.

%[https://youtu.be/Kk5WpFlbC4Y]

🎉 Woohoo!! It’s working

## 🎨 Building the done page

Let’s now build the done page. We are going to keep it simple as of this tutorial, you can improve the UI as you wish.

Create a new file named `done.tsx` under the `pages` folder and add the following code:

```ts
import type { NextPage } from "next";

const Done: NextPage = () => {
  return (
    <p className="m-12 font-medium text-gray-600">
      You have successfully connected your metamask wallet to the CLI. You can
      now close this tab and return to the CLI
    </p>
  );
};

export default Done;
```

# 🛠️ Building the CLI

## 🏗 Creating a new CLI project using Oclif

Let's create a new CLI project using the following command:

```bash
npx oclif generate cli
```

Fill in the inputs which are been asked and hit enter. This should generate a folder structure similar to this:

![](https://imgur.com/IbGbxej.png)

> Psst... I am making a monorepo for this tutorial. So make sure to make the CLI and website are in `cli` and `web` folders respectively.

Let's now clear up some default generated files by Oclif that we are not going to be using in this tutorial.

- We are not going to write any kind of tests for this tutorial. So let's just remove the `tests` folder and the `.mocharc.json` file.
- We are not going to be using CircleCI for this tutorial. So let's just remove the `.circleci` folder.
- Oclif has also generated a default command (`hello`) which isn't necessary for this tutorial, so let's
  just remove the `src/commands/hello` folder.

## 🔑 Building the login command

Oclif CLI has pretty useful generators which can be used to generate commands quickly!

Let's create a new command named `login` which would be used to authenticate the user via Metamask.

```bash
npx oclif generate command login
```

This would generate two files:

- `src/commands/login.ts`
- `src/test/commands/login.test.ts`

As I have said before, we would be not writing any tests in this tutorial. So let's just remove the `test` folder again.

Head over to the `src/commands/login.ts` file. You would see that there is a lot of boilerplate code.

Let's clean it up and add a console log to run the `run` function by which we can verify that our Oclif CLI setup doesn't have any issues.

```ts
import { Command } from "@oclif/core";

export default class Login extends Command {
  static description = "🦁 Connect your Metamask wallet to the faucet CLI";

  static examples = ["faucet-cli login"];

  async run() {
    console.log("🎉 It's working!");
  }
}
```

The `description` and the `examples` are shown in the help sub-command.

Let's test the CLI out but first, we need to compile TypeScript code into JavaScript code. We do it by running the `yarn build` command. It would create a `dist` folder with the compiled JavaScript code.

To run the CLI, we need to run the `run` file present in the `bin` folder along with the command. So to run the `login` command, we have to run the `./bin/run login` command.

![https://imgur.com/pYbAEBw.png](https://imgur.com/pYbAEBw.png)

🎉 Woohoo! It's working!

Let's now actually build the login command 👀.

Create a new folder named `lib` and then create a new file under it named `connectWallet.ts`. This file would contain the logic to connect the user's wallet to the CLI.

Let's install a package called [`inquirer`](https://www.npmjs.com/package/inquirer) which is used to prompt the user for input. We would be using this package to prompt the user to open the browser or not.

```bash
yarn add inquirer
```

As we are using TypeScript, we need also to install [`@types/inquirer`](https://npmjs.com/package/@types/inquirer) as a dev dependency. The `@types/inquirer` package includes the types for the `inquirer` package.

```bash
yarn add -D @types/inquirer
```

Let's import the `inquirer` package into our `src/lib/connectWallet.ts` file.

```ts
import * as inquirer from "inquirer";
```

Let's now programmatically create a prompt that asks the user whether to open the browser or not using inquirer.

```ts
import * as inquirer from "inquirer";

const connectWallet = () => {
  inquirer
    .prompt([
      {
        name: "openBrowser",
        type: "confirm",
        message: "Would you like to open the browser to connect wallet?",
        default: true,
      },
    ])
    .then((answer) => {
      console.log(answer);
    });
};

export default connectWallet;
```

I have wrapped the entire code which is responsible for connecting the user's wallet inside a function. This helps us to maintain our codebase clean.

Let's import the `connectWallet` function into our `src/commands/login.ts` file and call it from the `run` function.

```ts
import { Command } from "@oclif/core";

import connectWallet from "../lib/connectWallet";

export default class Login extends Command {
  static description = "🦁 Connect your Metamask wallet to the faucet CLI";

  static examples = ["faucet-cli login"];

  async run() {
    connectWallet();
  }
}
```

Let's build the code and test it out.

![https://imgur.com/OSbXO8A.png](https://imgur.com/OSbXO8A.png)

As you can see the inquirer package returns an object with the key as the name of the prompt and the value as the answer.

Let's add a console log that says that the user won't be able to use the request command if they don't connect their wallet.

```ts
import * as inquirer from "inquirer";

const connectWallet = () => {
  inquirer
    .prompt([
      {
        name: "openBrowser",
        type: "confirm",
        message: "Would you like to open the browser to connect wallet?",
        default: true,
      },
    ])
    .then((answer) => {
      if (!answer.openBrowser) {
        console.log(
          "You won't be able to request testnet tokens if you don't connect your wallet."
        );
        return;
      }
    });
};

export default connectWallet;
```

Let's now start building the cool part of the CLI, authenticating the user 🦄.

We need to first need a few packages:

- [`express`](https://www.npmjs.com/package/express), to start a local server at port `9991` to handle the authentication.
- [`open`](https://www.npmjs.com/package/open), to open links in the browser from the cli.
- [`chalk`](https://www.npmjs.com/package/chalk), to colorize the console output.

To install all of the above packages, run the following command:

```bash
yarn add express open chalk@4.1.2
```

We are using the [v4.1.2](https://github.com/chalk/chalk/releases/tag/v4.1.2) of chalk are [v5](https://github.com/chalk/chalk/releases/tag/v5.0.0) of chalk is complete ESM module. As we are using TypeScript, it is better to stay on the v4.1.2.

As we are using Typescript, we need also to install the TypeScript declarations for the above packages. `chalk` and `open` come with in-built TypeScript declarations. So we need to just install the TypeScript declarations for the `express` package.

```bash
yarn add -D @types/express
```

Let's start a local express application when the user chooses `Yes` for the prompt.

```ts
import * as inquirer from "inquirer";
import * as express from "express";
import * as open from "open";

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

        server.close();

        process.exit(0);
      } catch (err) {
        console.log(err);

        process.exit(1);
      }
    });
};

export default connectWallet;
```

👀 We have changed some code in the website. So let's head back to the `web` folder and open the `pages/index.tsx` file. Let's replace the code where we were showing the user's wallet address after he connected to redirecting the user to the local express's `/callback` with the address query parameter.

```ts
import type { NextPage } from "next";

import {
  useAddress,
  useMetamask,
  useCoinbaseWallet,
  useWalletConnect,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const connectWithCoinbaseWallet = useCoinbaseWallet();
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const address = useAddress();
  const router = useRouter();

  if (address) {
    router.push(`http://localhost:9991/callback?address=${address}`);
  }

  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-gray-50">
        <button
          onClick={connectWithCoinbaseWallet}
          className="w-64 rounded-full bg-blue-600 py-2 font-medium text-white transition-all duration-75 hover:bg-blue-500"
        >
          Connect Coinbase Wallet
        </button>
        <button
          onClick={connectWithMetamask}
          className="w-64 rounded-full bg-blue-600 py-2 font-medium text-white transition-all duration-75 hover:bg-blue-500"
        >
          Connect MetaMask
        </button>
        <button
          onClick={connectWithWalletConnect}
          className="w-64 rounded-full bg-blue-600 py-2 font-medium text-white transition-all duration-75 hover:bg-blue-500"
        >
          Connect WalletConnect
        </button>
      </div>
    </>
  );
};

export default Home;
```

Let's now try to open the `http://localhost:3000` in the browser and console log the user's wallet address when he successfully connected his wallet.

```ts
import * as inquirer from "inquirer";
import * as express from "express";
import * as open from "open";

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
            res.redirect("http://localhost:3000/done");
          }
        );

        // opening the main website in browser
        open("http://localhost:3000");

        // grabbing the address from the query param
        const code = await p;

        console.log(code);

        // closing the server as we don't want it to run forever
        server.close();

        process.exit(0);
      } catch (err) {
        console.log(err);

        process.exit(1);
      }
    });
};

export default connectWallet;
```

Let's test it out by running the website by the `yarn dev` command. Make sure that you are present in the `web` folder before running this command.

Let's also compile our TypeScript code of the CLI into JavaScript by using the `yarn build` command. Make sure that you are present in the `cli` folder before running this command.

Let's now finally test the login command by running the `./bin/run login` command while being there in the `cli` directory.

%[https://youtu.be/w-aUXaZueLE]

👀 We are missing out on something...

We don't want the user to connect their wallet every single time they use our CLI to request testnet tokens. So let's store the user's wallet address in a local file that lives in the user's root directory. The path of the config file (`config.json`) would be something like this `<user's-root-dir>/.thw-faucet-cli/config.json`. The structure of content inside the `config.json` would be something like this:

```json
{
  "address": "0x0"
}
```

Create a new folder named `utils` and create a new file under it named `saveAddress.ts`. This file would contain the logic for creating a new file and then writing the user's wallet address to it.

```ts
import * as fs from "fs";
import * as os from "os";

import { configFilePath } from "../constants/constants";

const saveAddress = (address: string) => {
  try {
    fs.mkdirSync(`${os.homedir()}/.thw-faucet-cli`);
    fs.writeFileSync(configFilePath, JSON.stringify({ address: address }));
  } catch (err) {
    console.log(err);
    return;
  }
};

export default saveAddress;
```

I have created a new file named `constants/constants.ts` which contains the path of the config file. I did this because we are going to be using the path of the file in multiple places.

Let's import the `saveAddress` function into the `lib/connectWallet.ts` file and call it along with the user's wallet address as the parameter.

```ts
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
            res.redirect("http://localhost:3000/done");
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

        // closing the server as we don't want it to run forever
        server.close();

        process.exit(0);
      } catch (err) {
        console.log(err);

        process.exit(1);
      }
    });
};

export default connectWallet;
```

If the user has logged in once and the address has been saved then if the user tried to log in again, then it would be a problem 🤔. So let's first check if the `config.json` file exists or not. If it exists then call the `connectWallet` function or else console log that the user is already logged in.

Let's create a new file named `utils/getToken.ts` which contains the logic for getting the token which is been stored in the local file (`config.json`).

```ts
import * as fs from "fs";

import { configFilePath } from "../constants/constants";

const getToken = () => {
  try {
    const config = JSON.parse(fs.readFileSync(configFilePath, "utf8"));
    return config.address;
  } catch (err) {
    return null;
  }
};

export default getToken;
```

We are returning `null` if the `address` key in the `config.json` file doesn't exist and the value of the `address` key if it exists.

Let's import the `getToken` function into the `src/commands/login.ts` file and call it.

```ts
import { Command } from "@oclif/core";
import * as chalk from "chalk";

import connectWallet from "../lib/connectWallet";

import getToken from "../utils/getToken";

export default class Login extends Command {
  static description = "🦁 Connect your Metamask wallet to the faucet CLI";

  static examples = ["faucet-cli login"];

  async run() {
    if (getToken() === null) {
      console.log(chalk.redBright("\nYou are already logged in!"));
      return;
    }
    connectWallet();
  }
}
```

Let's test it out 👀

![](https://imgur.com/847lRJj.png)

🎉 Woohoo! We have successfully made the login command. Phew! It was long. Let's take a coffee break ☕.

![](https://c.tenor.com/2KcNT1aGdNEAAAAC/coffee-need.gif)

Let's back to work now 🚀!
