import * as os from "os";

const configFilePath = `${os.homedir()}/.thw-faucet-cli/config.json`;
const apiUrl = `http://localhost:8080/api`;

export { configFilePath, apiUrl };
