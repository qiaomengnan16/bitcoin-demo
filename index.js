const Client = require('bitcoin-core');
const client = new Client({network: 'regtest', port: 18443, username: '111111', password: '111111'});
client.getBlockchainInfo().then((res) => {
    console.log(res)
})

