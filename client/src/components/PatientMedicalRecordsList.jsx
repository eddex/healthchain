import React from "react"
import './Components.css'
import download from 'downloadjs'

const downloadMedicalRecord = async (hash) => {
  const response = await fetch('http://localhost:3001/GetFileName/' + hash)
  const data = await response.json().catch(err => console.log(err))
  if (!data || !data.name) return 'Upload failed. Try again later.'
  console.log(data.name)
  var x = new XMLHttpRequest();
  x.open("GET", "http://localhost:3001/DownloadMedicalEvidence/" + hash, true);
  x.responseType = "blob";
  x.onload = function (e) { download(e.target.response, data.name, "image/png"); };
  x.send();
}

const PatientMedicalRecordsList = ({ items: medicalRecords }) => {
  console.log('records', medicalRecords)
  return (
    <div>
      {medicalRecords && medicalRecords.length &&
        medicalRecords.map((medicalRecord, index) => {
          console.log(medicalRecord)
          return <div key={index} className='row'>
            <div className='col-lg m-1'><b>{medicalRecord}</b></div>
            <div className='col-lg-2 m-1'>
              <button className='btn btn-primary' onClick={() => downloadMedicalRecord(medicalRecord)}>Download</button>
            </div>
            <div className='col-lg-2 m-1'>
              <button className='btn btn-danger'>Delete</button>
            </div>
          </div>
        })}
    </div>
  )
}

export default PatientMedicalRecordsList;