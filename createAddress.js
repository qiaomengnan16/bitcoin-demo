const bitcoin = require('bitcoinjs-lib')
// 椭圆曲线
const ecc = require('tiny-secp256k1')
const {ECPairFactory} = require('ecpair')
const ECPair = ECPairFactory(ecc)
const REGTEST = bitcoin.networks.regtest
const keyPair = ECPair.makeRandom({network: REGTEST})
// 创建一个 p2pkh 地址
const {address} = bitcoin.payments.p2pkh({
    pubkey: keyPair.publicKey,
    network: REGTEST
})
console.log({
    address,
    privateKey: keyPair.toWIF(),
    publicKey: keyPair.publicKey.toString('hex'),
    publicKeyHash: (bitcoin.crypto.hash160(keyPair.publicKey)).toString('hex')
})
