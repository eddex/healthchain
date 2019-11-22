# healthchain
Store your medical records in a blockchain and give doctors permissions when they need it :hospital:

:warning: **disclaimer** :warning:
This projects is a proof of concept and by no means ready to use in real world use cases. Deploying the smart contract on the real ethereum network might result in high costs!

## dev-setup

1. Install Ganche from the [official webpage](https://www.trufflesuite.com/ganache) or the latest [release on github](https://github.com/trufflesuite/ganache/releases).
2. Start Ganache and create a new workspace (quickstart). Make sure the RPC server is set to 127.0.0.1:7545.
3. run `npm install truffle -g` to install truffle globally
4. [Windows] If you don't have Visual Studio installed, run `npm install --global --production windows-build-tools`
5. clone this repository
6. in the root of this repository, run:
```bash
truffle compile
truffle migrate
```
8. Start the react app:
```
cd client
npm start
```

## testimonials

This project is based on the react truffle box: https://www.trufflesuite.com/boxes/react
