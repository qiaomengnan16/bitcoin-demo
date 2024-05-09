const Client = require('bitcoin-core');
const client = new Client({network: 'regtest', port: 18443, username: '111111', password: '111111'});

const txid = 'c482ef7d75daf02bc398a11eac72ee93f4ff553457e409e73245dad34fd1b5ee'
// 获取交易内容
client.getRawTransaction(txid)
    // 解码交易内容
    .then(res => {
        console.log(res)
        return client.decodeRawTransaction(res)
    })
    // 输出交易内容
    .then(tx => {
         console.log(tx)
        // console.log(tx.vin)
        //console.log(tx.vout)
    })
