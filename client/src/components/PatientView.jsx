import React, { useState } from "react"
import './Components.css'

const uploadMedicalRecord = async (contract, accounts, medicalRecordInput) => {

    const file = medicalRecordInput.files[0]
    console.log(file)
    const formData = new FormData()
    formData.append(medicalRecordInput.id, file)
    const response = await fetch('http://localhost:3001/UploadMedicalEvidence', {
      method: 'POST',
      headers: {
      },
      body: formData
    })
    const data = await response.json().catch(err => console.log(err))
    try {
        console.log(data.hash) // Handle the success response object

        if (!data.hash) return 'Upload failed. Try again later.'

        // use call to get the value from this transaction, no changes made yet!!!
        const documentIndex = await contract.methods.addDocument(data.hash).call();
        // actual changes here!!!
        await contract.methods.addDocument(data.hash).send({ from: accounts[0] });
        // Get the value from the contract to prove it worked.
        const documentHash = await contract.methods.getMyDocuments().call();

        console.log("response from getDocument", documentHash)
        return 'Successfully uploaded medical record \'' + file.name + '\' and added it to the blockchain as \'' + documentHash + '\''
    }
    catch(error) {
        console.log(error) // Handle the error response object
        return 'Please select a file to upload.'
    };
}

const PatientView = ({contract, accounts}) => {
    const [uploadResponse, setUploadResponse] = useState()
    return (<div>
        <h2>Upload a medical record</h2>
        <div className="input-group mb-3">
            <input type="file" className="form-control-file" id="medicalRecord"></input>
        </div>
        <button className="btn btn-primary" onClick={async () => {
            let documentHash = await uploadMedicalRecord(contract, accounts, document.getElementById('medicalRecord'))
            setUploadResponse(documentHash)
            }}>upload</button>
        {uploadResponse &&
            <div>{uploadResponse}</div>
        }

        <hr />
        <h2>Manage permissions of medical records</h2>
        <h4>Step 1: Choose a doctor</h4>
        <p>TODO</p>
        <h4>Step 2: Select files</h4>
        <p>TODO</p>
        <button className="btn btn-primary" onClick={async () => {
            console.log('TODO')
            }}>Update permissions</button>
    </div>
)}

export default PatientView;