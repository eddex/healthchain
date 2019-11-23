const express = require('express')
const app = express()
const port = 3001 || process.env.PORT
const Web3 = require('web3')
const HealthchainContract = require("./contracts/Healthchain.json")

const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"))

let healthchain_contract = null

// GET server welcome message
app.get('/', (req, res) => {
    res.send('hello world!')
});

// GET all accounts
app.get('/accounts', async (req, res) => {
    const accounts = await web3.eth.getAccounts()
    res.send(accounts)
})

// GET a single medical evidence document by id
app.get('/MedicalEvidence/:id', async (req, res) => {
   
    const response = await healthchain_contract.methods.getDocument(req.params.id).call();
    console.log("response from getDocument", response)
    res.send(response)
})

app.listen(port, async () => {
     // Get the contract instance.
     const networkId = await web3.eth.net.getId();
     const deployedNetwork = HealthchainContract.networks[networkId];
     console.log('deployment network: ' + deployedNetwork)
     healthchain_contract = new web3.eth.Contract(
         HealthchainContract.abi,
         deployedNetwork && deployedNetwork.address,
     );
    console.log("Express Listening at http://localhost:" + port)
})