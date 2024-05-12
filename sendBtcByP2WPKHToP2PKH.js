const bitcoin = require('bitcoinjs-lib')
// 椭圆曲线
const ecc = require('tiny-secp256k1')
const {ECPairFactory} = require('ecpair')
const ECPair = ECPairFactory(ecc)
const REGTEST = bitcoin.networks.regtest

const validator = ( pubkey, msghash, signature ) => ECPair.fromPublicKey(pubkey).verify(msghash, signature);

// 私钥
const keyPair = ECPair.fromWIF(
    'cPq8wmq1UaKg3bZ8PccfHULDXZkegWX43cCfo5aRks6V5CaueFyR', REGTEST
);

// p2pkh地址
// bitcoin.opcodes.OP_DUP
const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: REGTEST });



const psbt = new bitcoin.Psbt({network: REGTEST});
psbt.setVersion(2); // These are defaults. This line is not needed.
psbt.setLocktime(0); // These are defaults. This line is not needed.
// input 即上一笔交易的output
psbt.addInput({
    // if hash is string, txid, if hash is Buffer, is reversed compared to txid
    // 上一笔交易的txid
    hash: '4282aa3d28fdf69beb840dfac070ab431932b87fb930efa32fa049775cee64dc',
    // 上一笔交易的vout索引，确认你的资金索引是几
    index: 0,
    witnessUtxo: {
        script: Buffer.from('001458dc254a66e5dd3f718b6f7b42aabb5841b569f9', 'hex'),
        value: 2000000000,
    },
});
// 发送给谁，以及发送多少聪
psbt.addOutput({
    address: 'mmzU3f5eWKVh8YDkBNWeJFuuETE8XbdUBy',
    value: 2000000000 - (0.003 * 100000000),
});
psbt.signInput(0, keyPair);
psbt.validateSignaturesOfInput(0, validator);
psbt.finalizeAllInputs();
// 生成交易
const rawTransaction = psbt.extractTransaction().toHex()
console.log(rawTransaction)


const Client = require('bitcoin-core');
const client = new Client({network: 'regtest', port: 18443, username: '111111', password: '111111'});
client.sendRawTransaction(rawTransaction).then(res => console.log(res))
