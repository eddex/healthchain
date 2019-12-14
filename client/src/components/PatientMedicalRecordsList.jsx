import React from "react"
import download from 'downloadjs'

const getFileNameForHash = async (hash) => {
  const response = await fetch('http://localhost:3001/GetFileName/' + hash)
  const data = await response.json().catch(err => console.log(err))
  if (!data || !data.name) return 'Upload failed. Try again later.'
  console.log(data.name)
  return data.name
}

const downloadMedicalRecord = async (hash) => {
  const name = await getFileNameForHash(hash)
  var x = new XMLHttpRequest();
  x.open("GET", "http://localhost:3001/DownloadMedicalEvidence/" + hash, true);
  x.responseType = "blob";
  x.onload = function (e) { download(e.target.response, name, "image/png"); };
  x.send();
}

const PatientMedicalRecordsList = ({ items: medicalRecords }) => {
  return (
    <div>
      {!(medicalRecords && medicalRecords.length) &&
        'No medical records uploaded yet.'}
      {medicalRecords && medicalRecords.length &&
        medicalRecords.map((medicalRecord, index) => {
          console.log(medicalRecord)
          return <div key={index} className='row'>
            <div className='col-lg m-1'><b>{medicalRecord}</b></div>
            <div className='col-lg-2 m-1'>
              <button className='btn btn-primary' onClick={() => downloadMedicalRecord(medicalRecord)}>Download</button>
            </div>
            <div className='col-lg-2 m-1'>
              <button disabled className='btn btn-danger'>Delete</button>
            </div>
          </div>
        })}
    </div>
  )
}

export default PatientMedicalRecordsList;