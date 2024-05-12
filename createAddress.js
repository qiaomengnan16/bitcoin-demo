const bitcoin = require('bitcoinjs-lib')
// 椭圆曲线
const ecc = require('tiny-secp256k1')
const {ECPairFactory} = require('ecpair')
const ECPair = ECPairFactory(ecc)
const REGTEST = bitcoin.networks.regtest
const keyPair = ECPair.makeRandom({network: REGTEST})
// 创建一个 p2pkh 地址
const p2pkhAddress = bitcoin.payments.p2pkh({
    pubkey: keyPair.publicKey,
    network: REGTEST
}).address
// 创建一个 p2wpkh 地址
const p2wpkhAddress = bitcoin.payments.p2wpkh({
    pubkey: keyPair.publicKey,
    network: REGTEST
}).address


console.log({
    p2pkhAddress,
    p2wpkhAddress,
    privateKey: keyPair.toWIF(),
    publicKey: keyPair.publicKey.toString('hex'),
    publicKeyHash: (bitcoin.crypto.hash160(keyPair.publicKey)).toString('hex')
})

/**
 * {
 *   p2pkhAddress: 'mocoUvZ9RTEd3FNycaEGnB9Z9YXHDE1vLB',   57d0f27f192638f7ee9fcb3931be0af0f0ee3ff17998cb5a005e26e3f2e8df13
 *   p2wpkhAddress: 'bcrt1qtrwz2jnxuhwn7uvtdaa5924mtpqm260ee3lflv',  4282aa3d28fdf69beb840dfac070ab431932b87fb930efa32fa049775cee64dc
 *   privateKey: 'cPq8wmq1UaKg3bZ8PccfHULDXZkegWX43cCfo5aRks6V5CaueFyR',
 *   publicKey: '02f23e6f933def8455320da0bbe36a432ce8173174eb72c1600743ea22579ebdbc',
 *   publicKeyHash: '58dc254a66e5dd3f718b6f7b42aabb5841b569f9'
 * }
 */

/**
 * {
 *   p2pkhAddress: 'mmzU3f5eWKVh8YDkBNWeJFuuETE8XbdUBy',
 *   p2wpkhAddress: 'bcrt1qguzdyw4vv2hc3g7adwlwvrk2tedna2rp8sr95g',
 *   privateKey: 'cRRD8mZKVrn3C1YayBdBDBQyz2R1PxbPvupYSyYaPWUqzkzDduoU',
 *   publicKey: '02b1b1a53c148d3244749b09e02e87916a91a0c77e0af1b710a1dcb89e63ba9858',
 *   publicKeyHash: '4704d23aac62af88a3dd6bbee60eca5e5b3ea861'
 * }
 */
