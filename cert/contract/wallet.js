const Arweave = require('arweave');
const fs = require("fs");

const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https'
  });

  var wallet_keys={};

arweave.wallets.generate().then((key) => {
     wallet_keys={...key};
     try {
        fs.writeFileSync("wallet.json", JSON.stringify(wallet_keys));
        console.log("done buddy");
      } catch (error) {
        // logging the error
        console.error(error);
        throw error;
      }

});


