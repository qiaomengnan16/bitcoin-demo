const bitcoin = require('bitcoinjs-lib');
const ecc = require('tiny-secp256k1')
const {ECPairFactory} = require('ecpair')
const ECPair = ECPairFactory(ecc)

// 定义网络类型
const network = bitcoin.networks.regtest;  // 这里以比特币主网为例，测试时可以使用 testnet

// 创建一个比特币交易构建器
const psbt = new bitcoin.Psbt({ network });

// 已知的UTXO和其他交易信息
const txid = 'e768c1677934579f88794ddbc05fc540db4cec74a96cbff3d380b46d4100f221';
const vout = 0; // UTXO的输出索引
const value = 2000000000; // UTXO的金额，单位为聪
const destinationAddress = 'mmzU3f5eWKVh8YDkBNWeJFuuETE8XbdUBy';
const sendAmount = 2000000000 - (0.003 * 100000000); // 发送的金额，单位为聪

// 添加输入
psbt.addInput({
    hash: txid,
    index: vout,
    redeemScript: Buffer.from('5221028bb5efdf3e9d975f4efd5c7264ff8190f3d2c72e203fe1a3b90f12b6554228c82102a8b901355f8846b96fda58c173eb7e1c600d82f757bd9b645af3e7edd480d26a21037cc22ad760c67965596236d0e0fc33091442628b16a12fc4dcda5cc5aaf1ebd053ae', 'hex'),  // 这里使用之前创建的赎回脚本
    nonWitnessUtxo: Buffer.from('02000000000101426b751c27c54df0b18905767540069538daa9199f8af177d1cec3b1ea1d32860000000000fdffffff02009435770000000017a914db56113bdb5f1bf24cf3725c78868c265ca96b3987682fceb20000000017a914271eda8bcff2893f033ba12557aa70b0bed26e868702473044022015773bee75dcf3de0f04be91f299661eabcdd6d3321545c573ac4e2c24930cfc02202d20319b607d388ad7ca3316f990a73eee72ff4ace5d66b7cdcf4fbee8fce52c012102a0c3cf20cfe0dcca3ec09df80e15a632275f0890a3fcc16fd673b719182c5a756e000000', 'hex')
});

// 添加输出
psbt.addOutput({
    address: destinationAddress,
    value: sendAmount,
});


const keyPair1 = ECPair.fromWIF(
    'cVZYrUWtwuq6LiFM3WuHGNocxXpsZFChtRYQm76RDsaVwMsHZ4be', network
);

const keyPair2 = ECPair.fromWIF(
    'cPWHfqYrdZJeC58WgB4zN2Mtdv8gZZNdMxNbrhLbsD1C6EZ9hMwt', network
);

// 签名交易
const keyPairs = [keyPair1, keyPair2];  // 需要至少两个密钥对中的签名
keyPairs.forEach(keyPair => {
    psbt.signInput(0, keyPair);
});

// 完成交易
psbt.finalizeAllInputs();

// 获取交易的最终十六进制格式，准备广播
const transaction = psbt.extractTransaction().toHex();

console.log('Signed Transaction:', transaction);


const Client = require('bitcoin-core');
const client = new Client({network: 'regtest', port: 18443, username: '111111', password: '111111'});
client.sendRawTransaction(transaction).then(res => console.log(res))
