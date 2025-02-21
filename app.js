import {
  ethers,
  formatEther,
  parseEther,
} from 'https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js';

let provider = undefined;

const initApp = () => {
  provider = new ethers.JsonRpcProvider('http://localhost:7545');

  console.log(provider);
  displayBlocks();
};

const displayBlocks = async () => {
  const allBlocksList = document.querySelector('#allBlocks');

  let blockNumber = await provider.getBlockNumber();

  for (let i = blockNumber; i >= 0; i--) {
    let block = await provider.getBlock(i);
    // console.log(block);

    const li = document.createElement('li');
    li.innerHTML = `
    <div class="block-number"><i class="fa-light fa-cube"></i>${
      block.number
    }</div>
    <div class="hash-wrapper">
      <div class="hash">
        <b>Hash:</b><br>
        <a href="/blockDetails.html?block=${block.number}">${block.hash}<a/>
        
      </div>
      <span>...</span>
    </div>
    
    <div class="date"><b>Mined on:</b><br> ${new Date(
      block.timestamp * 1000
    ).toLocaleString()}</div>
    <a class="button-link" href="/blockDetails.html?block=${block.number}
    "><i class="fa-light fa-eye"></i></a>

    `;

    allBlocksList.appendChild(li);
  }
};

document.addEventListener('DOMContentLoaded', initApp);
