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
