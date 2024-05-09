# 跑起docker本地regtest环境

docker run --rm --name bitcoin-server -d -p 18443:18443 -p 18444:18444 -it ruimarinho/bitcoin-core \
-regtest=1 \
-rpcbind=0.0.0.0 \
-rpcallowip=172.17.0.0/16 \
-rpcuser=111111 \
-rpcpassword=111111

# Bitcoin-cli 操作

## 1. 创建一个名为demo的钱包

bitcoin-wallet -regtest -wallet=demo create

## 2. 加载demo钱包

bitcoin-cli -regtest -rpcuser=111111 -rpcpassword=111111 loadwallet demo

### 2.1 这一步加载如果出错，说demo不存在请执行下面操作

mkdir -p /home/bitcoin/.bitcoin/regtest/wallets/demo/

cp /root/.bitcoin/regtest/wallets/demo/wallet.dat /home/bitcoin/.bitcoin/regtest/wallets/demo/wallet.dat

cd  /home/bitcoin/.bitcoin/regtest/wallets/demo/

chmod 777 wallet.dat

cd ../

chmod 777 -R demo/

bitcoin-cli -regtest -rpcuser=111111 -rpcpassword=111111 loadwallet demo

## 3. 生成创世区块

bitcoin-cli -regtest  -rpcuser=111111 -rpcpassword=111111 -generate 110


## 4. 查看余额

bitcoin-cli -regtest -rpcuser=111111 -rpcpassword=111111 listaddressgroupings



