import React, { useState } from "react"
import './Components.css'

const uploadMedicalRecord = async (contract, accounts, medicalRecord) => {

    // use call to get the value from this transaction, no changes made yet!!!
    const documentIndex = await contract.methods.addDocument(medicalRecord).call();

    // actual changes here!!!
    await contract.methods.addDocument(medicalRecord).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.getDocument(documentIndex).call();

    console.log("response from getDocument", response)
    return response
}

const PatientView = ({contract, accounts}) => {
    const [storedValue, setStoredValue] = useState()
    return (<div>
        <h2>Upload a medical record</h2>
        <div className="input-group mb-3">
            <input type="file" className="form-control-file" id="medical-record-input"></input>
        </div>
        <button className="btn btn-primary" onClick={async () => {
            let documentHash = await uploadMedicalRecord(contract, accounts, document.getElementById('medical-record-input').value)
            setStoredValue(documentHash)
            }}>upload</button>
        {storedValue &&
            <div>Successfully stored medical record: {storedValue}</div>
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