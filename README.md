# 跑起docker本地regtest环境

docker run --rm --name bitcoin-server -d -p 18443:18443 -p 18444:18444 -it ruimarinho/bitcoin-core \
-regtest=1 \
-rpcbind=0.0.0.0 \
-rpcallowip=172.17.0.0/16 \
-fallbackfee=0.01 \
-rpcuser=111111 \
-rpcpassword=111111

## 镜像源地址

https://hub.docker.com/r/ruimarinho/bitcoin-core

## 镜像源码地址

https://github.com/ruimarinho/docker-bitcoin-core

# Bitcoin-cli 操作

## 前置

进入容器内部

docker exec -it bitcoin-server /bin/bash


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

## 5. 发送btc

bitcoin-cli -regtest -rpcuser=111111 -rpcpassword=111111 sendtoaddress muR9pCyG1SUeTsvntGYAq92vvsnuJddnJp 20


## 6. 根据txid获取交易信息
bitcoin-cli -regtest -rpcuser=111111 -rpcpassword=111111 getrawtransaction f2ed3255a5819b5fc97eb8fd26ea3da7f87c4f77da2c4357fb99571551ae9fdf

## 7. decode交易
bitcoin-cli -regtest -rpcuser=111111 -rpcpassword=111111 decoderawtransaction 0200000001eeb5d14fd3da4532e709e4573455fff493ee72ac1ea198c32bf0da757def82c4010000006b483045022100aeefc8a0bc4e7ffbaffe44aecfcbf5e06fe0802995355380aa8efaa3457a915f0220051db6d3c035cc4c8adcc7edec77eafe06788b976b4fbd50a17e7f6faba27eb7012102d38d85812e96aa83842d0c0234d6664b8401fbaeaeded93edd384e0ab560df02ffffffff0120003177000000001976a914f9b01e14b7567e9ecd488cf4e605b22c62aa0b4488ac00000000


