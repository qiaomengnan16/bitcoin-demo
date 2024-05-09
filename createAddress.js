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

/**
 * {
 *   address: 'muR9pCyG1SUeTsvntGYAq92vvsnuJddnJp',
 *   privateKey: 'cQbY4cdW28X9oX1NqFRedAj7V7ZvSmU6VbrK2XsEYBHtkSsXvuqE',
 *   publicKey: '02d38d85812e96aa83842d0c0234d6664b8401fbaeaeded93edd384e0ab560df02',
 *   publicKeyHash: '9878e1ab024335095ebd104bd6827ca1d3d0e71d'
 * }
 */
