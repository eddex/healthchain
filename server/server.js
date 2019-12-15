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

// GET the name of a file
app.get('/GetFileName/:hash', (req, res) => {
  const hash = req.params.hash
  glob('./medical-records/' + hash + '*', (err, files) => {
    if (err) return res.status(404).send('no file found for hash ' + hash)

    if (!files[0]) res.status(404).send('no file found for hash ' + hash)
    res.send({ name: files[0].split('./medical-records/')[1] });
  })
})

// GET a document
app.get('/DownloadMedicalEvidence/:doctor/:patient/:document', async (req, res) => {
  const documentHash = req.params.document
  const doctorAddress = req.params.doctor
  const patientAddress = req.params.patient

  try {
    const doctorPermissions = await healthchain_contract.methods.getDoctorsPermissions(doctorAddress).call();
    console.log(doctorPermissions)
    if (!doctorPermissions.includes(patientAddress) && doctorAddress != patientAddress) return res.send('Access denied!')

    const documents = await healthchain_contract.methods.getDocuments(patientAddress).call();
    console.log(documents)
    if (!documents.includes(documentHash)) return res.send('This document doesn\'t belong to the specified patient!')
  } catch (err) {
    return res.send('Access denied!')
  }

  console.log('trying to download ' + documentHash)
  glob('./medical-records/' + documentHash + '*', (err, files) => {
    if (err) return res.status(404).send('no file found for hash ' + documentHash)

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