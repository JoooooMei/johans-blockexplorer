import {
  ethers,
  formatEther,
  parseEther,
} from 'https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js';

let provider = undefined;

const initApp = () => {
  provider = new ethers.JsonRpcProvider('http://localhost:7545');
  getBlock();
};

const getBlock = async () => {
  const blockNumber = parseInt(location.search.split('=')[1]);

  let block = await provider.getBlock(blockNumber);

  displayBlockDetails(block);
};

const displayBlockDetails = async (block) => {
  // Ta ut alla hashar för transaktioner
  let transactions = block.transactions;
  console.log('Hashar');
  console.log(transactions);

  const blockDetails = document.querySelector('#blockDetails');
  const trxList = document.createElement('ul');

  blockDetails.innerHTML = `<h4><i class="fa-light fa-cube"></i> ${block.hash}</h4>`;
  trxList.innerHTML = `<h3><i class="fa-sharp-duotone fa-regular fa-arrow-right-arrow-left"></i> Transaktioner</h3>`;
  trxList.classList.add('trx-list');

  // Loopa igenom alla transaktioner
  for (let t of transactions) {
    const trx = await block.getTransaction(t);
    console.log('Transaktioner: ');
    console.log(trx);
    const trxListItem = document.createElement('li');

    trxListItem.innerHTML = `
    <div class="trx-wrapper">
      <div><b>Hash:</b> ${trx.hash}</div>
      <div><b>From:</b> ${trx.from}</div>
      <div><b>To:</b> ${trx.to}</div>
      <div><b>Value:</b> ${formatEther(
        trx.value
      )} <i class="fa-brands fa-ethereum"></i></div>
    </div>
    `;
    trxList.appendChild(trxListItem);
  }
  blockDetails.appendChild(trxList);
};

document.addEventListener('DOMContentLoaded', initApp);
