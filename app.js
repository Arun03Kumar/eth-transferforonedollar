const { ethers } = require("ethers");
const axios = require("axios");
const abi = require("./abi");

const provider = new ethers.providers.JsonRpcProvider(
  "https://rpc.ankr.com/eth_goerli"
);

const priceTrackingContractAddress =
  "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e";

const priceFeed = new ethers.Contract(
  priceTrackingContractAddress,
  abi.abi,
  provider
);

const getLatestPrice = async () => {
  // console.log(abi)
  // priceFeed.latestAnswer().then((data) => {
  //   // console.log(ethers.utils.formatUnits(data, "8"));
  //   const data2 =  ethers.utils.formatUnits(data, "8");
  //   console.log(data2)
  //   return data2;
  // });
  return await priceFeed.latestAnswer();
};

const main = async () => {
  const val = await getLatestPrice();
  const valInNum = Number(ethers.utils.formatUnits(val, "8"));
  const roundedVal = Math.round((valInNum + Number.EPSILON) * 100) / 100;

  const ethForOneDollar = Math.round(
    (1 / roundedVal + Number.EPSILON) * 10 ** 18
  );
  // console.log(ethers.utils.formatEther(ethForOneDollar))
  console.log(ethForOneDollar);

  const wallet = ethers.Wallet.fromMnemonic(
    "record expand unaware pizza lunch lumber gloom chicken away future park pencil"
  );
  // console.log(wallet.address)
  const wallet2 = wallet.connect(provider);
  const tx = {
    to: "0xDBBB217c35753F3AB4B7E0dBCbCBdbD3Bd08C31d",
    value: ethForOneDollar,
  };
  wallet2.sendTransaction(tx).then((txObj) => {
    console.log(txObj);
  });
};

main();

// axios
//   .get(
//     "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&api_key=c27ec7c562a802bc563ff7d0e8bee1d30bab887c181901a724157c8c1430bcf0"
//   )
//   .then((res) => {
//     console.log(res.data.USD);
//   });
