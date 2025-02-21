import {
  ethers,
  formatEther,
  parseEther,
} from 'https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js';

const searchAddressForm = document.querySelector('#senderAddressForm');
const senderAddressInput = document.querySelector('#senderAddressInput');
const recieverAddressForm = document.querySelector('#recieverAddressForm');
const recieverAddressInput = document.querySelector('#recieverAddressInput');

const currentBalance = document.querySelector('#currentBalance');
const receiptContainer = document.querySelector('#receipt');

const sendValue = document.querySelector('#sendValue');

let provider = undefined;
let senderAddress = undefined;

const initApp = () => {
  provider = new ethers.JsonRpcProvider('http://localhost:7545');
};

const handleSearchAddress = (e) => {
  e.preventDefault();
  senderAddress = senderAddressInput.value;
  const validInput = validateInput(senderAddress);

  if (!validInput) {
    console.log('Felaktig inmatning');
    displayBalance('No address');
  } else {
    getCurrentBalance(validInput);
  }
};

const validateInput = (input) => {
  if (input.trim() !== '') {
    return input;
  } else {
    return false;
  }
};

const getCurrentBalance = async (address) => {
  try {
    const balance = await provider.getBalance(address);

    const balanceEth = parseFloat(formatEther(balance)).toFixed(4);
    displayBalance(balanceEth);

    recieverAddressForm.style.display = 'flex';
  } catch (error) {
    const errorMessage = `"${address}" is not a valid address`;
    displayBalance(errorMessage);
  }
};

const displayBalance = (balance) => {
  currentBalance.innerHTML = `
  Current Balance<br> 
  <h3><i class="fa-brands fa-ethereum"></i> ${balance}</h3> `;
};

const handleSendEth = async (e) => {
  e.preventDefault();
  console.log('senderAddress:', senderAddress);
  const recieverAddress = recieverAddressInput.value;
  const valueEth = sendValue.value;
  console.log('recieverAddress: ', recieverAddress);

  const signer = await provider.getSigner(senderAddress);

  const trx = await signer.sendTransaction({
    to: recieverAddress,
    value: parseEther(valueEth),
  });

  const receipt = await trx.wait();
  console.log(receipt);
  await displayReceipt(receipt);
};

const displayReceipt = async (receipt) => {
  let block = await provider.getBlock(receipt.blockNumber);
  console.log(block);
  const trx = await block.getTransaction(receipt.hash);
  console.log(trx);

  receiptContainer.innerHTML = `
  <h3>Transaction completed</h3>
  <p><b>Value: </b>${formatEther(
    trx.value
  )} <i class="fa-brands fa-ethereum"></i></p>

  <p><b>Sent from: </b>${trx.from}</p>
  <p><b>Sent to: </b>${trx.to}</p>
  <p></p>
  `;
  receiptContainer.style.display = 'block';

  getCurrentBalance(trx.from);
};

recieverAddressForm.addEventListener('submit', handleSendEth);
searchAddressForm.addEventListener('submit', handleSearchAddress);
document.addEventListener('DOMContentLoaded', initApp);
