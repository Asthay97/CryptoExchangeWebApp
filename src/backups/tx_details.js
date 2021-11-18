// import config from "dotenv";
// import { JsonRpcProvider } from "@ethersproject/providers";
// import { Interface } from "@ethersproject/abi";
import { ethers } from "ethers";
async function getTransactionDetails() {
  //   const provider = new JsonRpcProvider(
  //     `https://ropsten.infura.io/v3/03797d67b8714ebe8228dba70d3be946`
  //   );

  //   let block = await provider.getBlock(11369188);
  //   //   console.log("block:", block.transactions[0]);

  //   let txHash = block.transactions[0]; //`0x7e5e6f9f72ee32a7f4271cda60eed24ab62d5328edc9ff80e9e6dbd4bf4c209b`;
  //   //   console.log(`getTransactionDetails: ${txHash}`);

  //   let tx = await provider.getTransaction(txHash);
  //   console.log(tx);
  //   //   console.log("data:", tx.from, tx.to, tx.value);

  //   //   let lookup = await provider.lookupAddress(tx.from);
  //   //   console.log("lookup:", lookup);

  let providers = new ethers.providers.EtherscanProvider(
    "ropsten",
    "Y2538JXAEWASRXPFIGPYRT35X6ACHVHFTP"
  );

  //   ({
  //     etherscan: "Y2538JXAEWASRXPFIGPYRT35X6ACHVHFTP",
  //     infura: "03797d67b8714ebe8228dba70d3be946",
  //   });
  let history = await providers.getHistory(
    "0xE3Eb8b7FA8a68ABBBA55318d93267e6CF0B4e274"
  );
  console.log("history:", history.length);

  for (var i = 0; i < history.length; i++) {
    console.log(history[i].from, history[i].to, history[i].value);
  }

  //   const proxyArtifact = require("./abi/ExchangeProxy.json");
  //   const iface = new Interface(proxyArtifact.abi);
  //   const txParsed = iface.parseTransaction({ data: tx.data });
  //   console.log(txParsed.args.swapSequences); // Start looking at parsing the pools used from this. Some will have a single pool others will have multipool so check both work ok.
  //   console.log(txParsed.functionFragment.name); // i.e. multihopBatchSwapExactOut
}

export default getTransactionDetails();
