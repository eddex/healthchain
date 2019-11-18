# healthchain
Store your medical records in a blockchain and give doctors permissions when they need it :hospital:

:warning: **disclaimer** :warning:
This projects is a proof of concept and by no means ready to use in real world use cases. Deploying the smart contract on the real ethereum network might result in high costs!

## dev-setup

1. Install Ganche from the [official webpage](https://www.trufflesuite.com/ganache) or the latest [release on github](https://github.com/trufflesuite/ganache/releases).
2. run `npm install truffle -g` to install truffle globally
3. [Windows] If you don't have Visual Studio installed, run `npm install --global --production windows-build-tools`
4. clone this repository
5. in the root of this repository, run:
```bash
truffle compile
truffle migrate
```
6. Start Ganache and create a new workspace. Leave everything on default but make sure the RPC server port is set to 127.0.0.1:7545.
7. Start the ganache workspace.
8. Start the react app:
```
cd client
npm start
```
