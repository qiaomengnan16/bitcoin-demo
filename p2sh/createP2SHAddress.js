const bitcoin = require('bitcoinjs-lib');
const ecc = require('tiny-secp256k1')
const {ECPairFactory} = require('ecpair')
const ECPair = ECPairFactory(ecc)

// 定义网络类型，这里以比特币主网为例
const network = bitcoin.networks.regtest

// 生成三个随机密钥对
const keyPair1 = ECPair.makeRandom({ network });
const keyPair2 = ECPair.makeRandom({ network });
const keyPair3 = ECPair.makeRandom({ network });

console.log(keyPair1.toWIF())
console.log(keyPair2.toWIF())
console.log(keyPair3.toWIF())

// 提取公钥
const pubkey1 = keyPair1.publicKey;
const pubkey2 = keyPair2.publicKey;
const pubkey3 = keyPair3.publicKey;

// 创建一个 2-of-3 多重签名赎回脚本
const p2ms = bitcoin.payments.p2ms({
    m: 2, // 2个必需的签名
    pubkeys: [pubkey1, pubkey2, pubkey3].sort((a, b) => a.compare(b)), // 排序公钥
    network: network
});

// 创建 P2SH 地址
const p2sh = bitcoin.payments.p2sh({
    redeem: p2ms,
    network: network
});

console.log("P2SH Address:", p2sh.address);
console.log("Redeem Script:", p2sh.redeem.output.toString('hex'));

/**
 * cVZYrUWtwuq6LiFM3WuHGNocxXpsZFChtRYQm76RDsaVwMsHZ4be
 * cUE3DmLi4NuHJg5AXHM1BTQW2UheoVjJH9SEscw2AE9o9S2EvHGC
 * cPWHfqYrdZJeC58WgB4zN2Mtdv8gZZNdMxNbrhLbsD1C6EZ9hMwt
 * P2SH Address: 2NDEy5MfFzEvbY5LXNhWKAgGaTtef8E92fp
 * Redeem Script: 5221028bb5efdf3e9d975f4efd5c7264ff8190f3d2c72e203fe1a3b90f12b6554228c82102a8b901355f8846b96fda58c173eb7e1c600d82f757bd9b645af3e7edd480d26a21037cc22ad760c67965596236d0e0fc33091442628b16a12fc4dcda5cc5aaf1ebd053ae
 */
