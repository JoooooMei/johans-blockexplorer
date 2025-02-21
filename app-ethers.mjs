import { ethers, formatEther, parseEther } from 'ethers';

const provider = new ethers.JsonRpcProvider('http:localhost:7545');
console.log('Provider', provider);

const signerAddress = '0xD3595804E9a343b986a5A2f69D9E169D78365AFE';
const recieverAddress = '0xFB251799A52acCDdeF732ca71B6e47e850e632a2';

let balance = await provider.getBalance(signerAddress);

console.log('Balance wei: ', balance);
console.log('Balance ETH:', formatEther(balance));

/*
let transactionList = await provider.getTransactionCount(signerAddress);

console.log('Antal transaktioner', transactionList);

const signer = await provider.getSigner(signerAddress);

const trx = await signer.sendTransaction({
  to: recieverAddress,
  value: parseEther('1'),
});

const receipt = await trx.wait();

console.log('Kvittens', receipt);

balance = await provider.getBalance(signerAddress);
console.log('Avsändarens saldo: ', formatEther(balance));

balance = await provider.getBalance(recieverAddress);
console.log('Mottagarens saldo: ', formatEther(balance));

transactionList = await provider.getTransactionCount(signerAddress);
console.log(`antal transaktioner efter:  ${transactionList}`);

const blockNumber = await provider.getBlockNumber();
console.log('Aktuellt block', blockNumber);

let block = await provider.getBlock(receipt.blockNumber);

console.log('block Info:', block);

console.log('Transaktioner:', block.transactions);

const transaction = await block.getTransaction(0);

console.log('Transaktionsinfo: ', transaction);

// let blockNumber = await provider.getBlockNumber();
// let block = await provider.getBlock(0);
// console.log(block);

// console.log('Totalt antal block', blockNumber);
*/
for (let i = 0; i <= blockNumber; i++) {
  let block = await provider.getBlock(i);

  // Ta ut alla hashar för transaktioner
  let transactions = block.transactions;

  console.log(`
  _________________________________________
  Blocknummer; ${i}
  Block Hash: ${block.hash}
  _________________________________________
  Mined date: ${new Date(block.timestamp * 1000).toLocaleString()}
  Gas Used: ${block.gasUsed}
  `);

  // Loopa igenom hashar för transaktioner och ta ut transaktionsinfo
  for (let transaction of transactions) {
    const trx = await block.getTransaction(transaction);
    console.log(`
  From: ${trx.from}
  To: ${trx.to}
  Value: ${formatEther(trx.value)}
  -----------------------------------------

    `);
  }
}
