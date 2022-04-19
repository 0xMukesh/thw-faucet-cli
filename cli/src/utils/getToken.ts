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
