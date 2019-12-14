const express = require('express')
const app = express()
const port = 3001 || process.env.PORT
const Web3 = require('web3')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const HealthchainContract = require("./contracts/Healthchain.json")
const glob = require('glob')

const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"))

let healthchain_contract = null

// configure cors
var whitelist = ['http://localhost:3000', 'http://127.0.0.1:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(null, true)
      //callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))

// configure file upload
app.use(fileUpload({
  limits: { fileSize: 10 * 1024 * 1024 },
}));

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

// POST a new medical record
app.post('/UploadMedicalEvidence/', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.')
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let medicalRecord = req.files.medicalRecord;
  console.log(medicalRecord.md5)
  // Use the mv() method to place the file somewhere on your server
  medicalRecord.mv('./medical-records/' + medicalRecord.md5 + '_' + medicalRecord.name, function (err) {
    if (err) return res.status(500).send(err);
  });
  res.send({ 'hash': medicalRecord.md5 });
})

app.get('/GetFileName/:hash', (req, res) => {
  const hash = req.params.hash
  glob('./medical-records/' + hash + '*', (err, files) => {
    if (err) return res.status(404).send('no file found for hash ' + hash)

    if (!files[0]) res.status(404).send('no file found for hash ' + hash)
    res.send({ name: files[0].split('./medical-records/')[1] });
  })
})

app.get('/DownloadMedicalEvidence/:hash', (req, res) => {
  const hash = req.params.hash
  console.log('trying to download ' + hash)
  glob('./medical-records/' + hash + '*', (err, files) => {
    if (err) return res.status(404).send('no file found for hash ' + hash)

    res.download(files[0]);
  })
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