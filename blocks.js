import { createPublicClient, http, formatEther } from 'https://esm.sh/viem';
import { localhost, sepolia } from 'https://esm.sh/viem/chains';
import { getBlock } from 'https://esm.sh/viem/actions';

let client = undefined;

const initApp = () => {
  client = createPublicClient({
    chain: localhost,
    transport: http('http://localhost:7545'),
  });

  getBalance();
  listAllBlocks();
};

const getBalance = async () => {
  const balance = await client.getBalance({
    address: '0xD3595804E9a343b986a5A2f69D9E169D78365AFE',
  });
  console.log(parseFloat(formatEther(balance)).toFixed(2));
};

const listAllBlocks = async () => {
  const blocks = await client.getBlockNumber();

  // console.log(blocks);

  for (let i = blocks; i >= 0; i--) {
    console.log(i);

    const block = await client.getBlock({ blockNumber: i });

    console.log(block);
  }
};

document.addEventListener('DOMContentLoaded', initApp);
