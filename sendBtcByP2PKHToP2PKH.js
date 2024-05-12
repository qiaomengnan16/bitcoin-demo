const bitcoin = require('bitcoinjs-lib')
// 椭圆曲线
const ecc = require('tiny-secp256k1')
const {ECPairFactory} = require('ecpair')
const ECPair = ECPairFactory(ecc)
const REGTEST = bitcoin.networks.regtest

const validator = ( pubkey, msghash, signature ) => ECPair.fromPublicKey(pubkey).verify(msghash, signature);

// 私钥
const keyPair = ECPair.fromWIF(
    'cQbY4cdW28X9oX1NqFRedAj7V7ZvSmU6VbrK2XsEYBHtkSsXvuqE', REGTEST
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
    hash: 'c482ef7d75daf02bc398a11eac72ee93f4ff553457e409e73245dad34fd1b5ee',
    // 上一笔交易的vout索引，确认你的资金索引是几
    index: 1,
    sequence: 0xffffffff, // These are defaults. This line is not needed.

    // non-segwit inputs now require passing the whole previous tx as Buffer
    // 上一笔交易的rawtransaction
    nonWitnessUtxo: Buffer.from(
        '02000000000101fad64a1f2d6bedad6959b53c95681e76163d1b99174fbd59ed49070c3dd703d30000000000fdffffff02c81fceb2000000001976a91421294a5730e690c6bb2b23251cd97db82d047c8288ac00943577000000001976a9149878e1ab024335095ebd104bd6827ca1d3d0e71d88ac02473044022049cb6ba8fa930c0fc17acafab78dfbdb36ed76291096e289d5f8422dc15d8f73022022bcbb5127489185491b2ed9b2512467c3904d1bef18ca2e74b47fe0f4ad0e120121031ef471f2f16f03526f55124ee67c773fe890add080762fb4c5b0d76e3fa25a3a6e000000',
        'hex',
    ),
});
// 发送给谁，以及发送多少聪
psbt.addOutput({
    address: 'n4HBXgJdmthLnM7wm2XWBHVLMWRHDL4mod',
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
