import * as os from "os";

const configFilePath = `${os.homedir()}/.thw-faucet-cli/config.json`;
const apiUrl = `https://thw-faucet-cli-production.up.railway.app/api`;

export { configFilePath, apiUrl };
