import React, { useState, useEffect, useRef } from "react"
import ReactDOM from 'react-dom'
import DoctorsList from "./DoctorsList"
import { doctors } from '../helpers/users'
import PatientMedicalRecordsList from "./PatientMedicalRecordsList"

/**
 * Upload a document to the server and add the document hash to the smart contract.
 */
const uploadMedicalRecord = async (contract, accounts, accountId, medicalRecordInput) => {
  const file = medicalRecordInput.files[0]
  console.log(file)
  const formData = new FormData()
  formData.append(medicalRecordInput.id, file)
  const response = await fetch('http://localhost:3001/UploadMedicalEvidence/', {
    method: 'POST',
    headers: {
    },
    body: formData
  })
  const data = await response.json().catch(err => console.log(err))
  try {
    if (!data || !data.hash) return 'Upload failed. Try again later.'
    console.log(data.hash) // Handle the success response object

    // use call to get the value from this transaction, no changes made yet!!!
    const documentIndex = await contract.methods.addDocument(data.hash).call({ from: accounts[accountId] });
    // actual changes here!!!
    await contract.methods.addDocument(data.hash).send({ from: accounts[accountId] });
    // Get the value from the contract to prove it worked.
    const myDocuments = await contract.methods.getDocuments(accounts[accountId]).call({ from: accounts[accountId], gas: 100000 });
    console.log(myDocuments)
    const documentHash = myDocuments[documentIndex];
    console.log("response from getDocuments", documentHash)
    return 'Successfully uploaded medical record \'' + file.name + '\' and added it to the blockchain as \'' + documentHash + '\''
  }
  catch (error) {
    console.log(error) // Handle the error response object
    return 'Please select a file to upload.'
  };
}

const PatientView = ({ contract, accounts, accountId }) => {
  const [uploadResponse, setUploadResponse] = useState()

  const medicalRecordsListRef = useRef()
  const doctorsListRef = useRef()

  useEffect(() => {
    async function getDocuments() {
      const documents = await contract.methods.getDocuments(accounts[accountId]).call({ from: accounts[accountId], gas: 100000 })
      ReactDOM.render(
        <PatientMedicalRecordsList items={documents} userAddress={accounts[accountId]} patientAddress={accounts[accountId]} />,
        medicalRecordsListRef.current
      )
    }
    getDocuments()
  }, [uploadResponse])

  useEffect(() => {
    const getDoctors = async () => {
      await doctors.map(async (doctor, index) => {
        const permissions = await contract.methods.getDoctorsPermissions(accounts[doctor.account]).call({ from: accounts[accountId], gas: 100000 })
        doctors[index].hasAccess = permissions.includes(accounts[accountId])
      })
      setTimeout(() => {
        console.log(doctors[0].hasAccess)
        ReactDOM.render(
          <DoctorsList doctors={doctors}
            contract={contract}
            accounts={accounts}
            accountId={accountId}>
          </DoctorsList>,
          doctorsListRef.current
        )
      }, 300);
    }
    getDoctors()
  })

  return (<div>
    <h2>Upload a medical record</h2>
    <div className="input-group mb-3">
      <input type="file" className="form-control-file" id="medicalRecord"></input>
    </div>
    <button className="btn btn-primary" onClick={async () => {
      const message = await uploadMedicalRecord(contract, accounts, accountId, document.getElementById('medicalRecord'))
      setUploadResponse(message)
    }}>upload</button>
    {uploadResponse &&
      <div>{uploadResponse}</div>
    }

    <hr />
    <h2>Manage permissions</h2>
    <h5>If you give access to a doctor, the doctor is able to view all your medical records.</h5>
    <div ref={doctorsListRef}></div>

    <h2>Manage your medical records</h2>
    <h5>View or delete your medical records.</h5>
    <div ref={medicalRecordsListRef}></div>
  </div>
  )
}

export default PatientView;