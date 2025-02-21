import {
  ethers,
  formatEther,
  parseEther,
} from 'https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js';

let provider = undefined;

const initApp = () => {
  provider = new ethers.JsonRpcProvider('http://localhost:7545');

  listTransactions();
};

const listTransactions = async () => {
  const blockNumber = await provider.getBlockNumber();

  console.log(blockNumber);

  const transactionList = document.querySelector('#transactionList');

  transactionList.classList.add('trx-list');

  for (let i = blockNumber; i >= 0; i--) {
    let block = await provider.getBlock(i);

    // Ta ut alla hashar för transaktioner
    let transactions = block.transactions;
    // console.log(``);

    // Loopa igenom hashar för transaktioner och ta ut transaktionsinfo
    for (let t of transactions) {
      const trx = await block.getTransaction(t);
      console.log(trx);

      const li = document.createElement('li');
      li.innerHTML = `
      <div class="trx-wrapper">
        <div>
          <b>Hash:</b> ${trx.hash}
        </div>
        <div>
        <b>From:</b> ${trx.from}
        </div>
        <div>
          <b>To:</b> ${trx.to}
        </div>
        <div>
        <b>Value:</b> ${formatEther(
          trx.value
        )} <i class="fa-brands fa-ethereum"></i>
        </div>
      </div>
      
      `;

      transactionList.appendChild(li);
    }
  }
};

document.addEventListener('DOMContentLoaded', initApp);
