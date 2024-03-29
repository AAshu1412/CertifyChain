const { TurboFactory } = require('@ardrive/turbo-sdk') ;
const fs = require("fs");
const Arweave = require('arweave');

(async() => {
  const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https'
  });
  
  // import {fs} from 'fs';
  
  // load your JWK from a file or generate a new one
  const jwk = fs.readFileSync('./wallet.json');
  const address = arweave.wallets.jwkToAddress(jwk);
  const turbo = TurboFactory.authenticated({ privateKey: jwk });
  
  // get the wallet balance
  const { winc: balance } = await turbo.getBalance();

  // prep file for upload
  const filePath = path.join(__dirname, './eye.jpeg');
  const fileSize = fs.statSync(filePath).size;
  
  // get the cost of uploading the file
  const [{ winc: fileSizeCost }] = await turbo.getUploadCosts({
    bytes: [fileSize],
  });
  
  // check if balance greater than upload cost
  if (balance < fileSizeCost) {
    const { url } = await turbo.createCheckoutSession({
      amount: fileSizeCost,
      owner: address,
      // add a promo code if you have one
    });
    // open the URL to top-up, continue when done
    open(url);
    return;
  }
  
  // upload the file
  try {
      const { id, owner, dataCaches, fastFinalityIndexes } = await turbo.uploadFile({
        fileStreamFactory: () => fs.createReadStream(filePath),
        fileSizeFactory: () => fileSize,
        // no timeout or AbortSignal provided
      });
      // upload complete!
      console.log('Successfully upload data item!', { id, owner, dataCaches, fastFinalityIndexes });
  
  } catch (error) {
    // upload failed
    console.error('Failed to upload data item!', error);
  } finally {
    const { winc: newBalance } = await turbo.getBalance();
    console.log('New balance:', newBalance);
  }
})();

