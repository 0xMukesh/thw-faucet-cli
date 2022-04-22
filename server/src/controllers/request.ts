import { Request, Response } from "express";
import { ethers } from "ethers";
import dotenv from "dotenv";
import Web3 from "web3";

import constants from "../data/constants";
import { chainId, txUrl, apiUrls, amount } from "../data/networks";

dotenv.config();

const privateKey = process.env.PRIVATE_KEY!.toString();
const wallet = new ethers.Wallet(privateKey);

const request = async (req: Request, res: Response) => {
  const address = wallet.address;

  const httpsUrl = apiUrls.get(String(req.query.network!));

  var web3 = new Web3(new Web3.providers.HttpProvider(httpsUrl!));

  const httpsProvider = ethers.getDefaultProvider(httpsUrl);

  let nonce = await httpsProvider.getTransactionCount(address, "latest");

  let feeData = await httpsProvider.getFeeData();

  const balance = web3.utils.fromWei(
    // @ts-ignore
    await web3.eth.getBalance(constants["fromAddress"]),
    "ether"
  );

  if (web3.utils.isAddress(String(req.query.address!)) === false) {
    res.json({
      error: "Invalid receiver address",
      invalidAddress: true,
    });
  } else {
    // @ts-ignore
    if (balance < amount?.get(req.query.network)!) {
      res.json({
        error: "Insufficient funds",
        insufficientFunds: true,
      });
    } else {
      const tx = {
        type: 2,
        nonce: nonce,
        to: req.query.address,
        maxPriorityFeePerGas: feeData["maxPriorityFeePerGas"],
        maxFeePerGas: feeData["maxFeePerGas"],
        // @ts-ignore
        value: ethers.utils.parseEther(amount.get(req.query.network)),
        gasLimit: 30000,
        chainId: chainId.get(String(req.query.network)),
      };

      // @ts-ignore
      const signedTx = await wallet.signTransaction(tx);

      const txHash = ethers.utils.keccak256(signedTx);
      console.log("Precomputed txHash:", txHash);
      httpsProvider.sendTransaction(signedTx).then(console.log);

      res.json({
        txLink: `${txUrl.get(String(req.query.network))}/${txHash}`,
      });
    }
  }
};

export default request;
