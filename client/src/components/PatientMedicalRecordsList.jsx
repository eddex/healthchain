import React, { useEffect } from "react"
import download from 'downloadjs'

const getFileNameForHash = async (hash) => {
  const response = await fetch('http://localhost:3001/GetFileName/' + hash)
  const data = await response.json().catch(err => console.log(err))
  if (!data || !data.name) return 'Upload failed. Try again later.'
  console.log(data.name)
  return data.name
}

const downloadMedicalRecord = async (medicalRecord, userAddress, patientAddress) => {
  const name = await getFileNameForHash(medicalRecord)
  const x = new XMLHttpRequest();
  const url = "http://localhost:3001/DownloadMedicalEvidence/" +
    userAddress + "/" +
    patientAddress + "/" +
    medicalRecord
  x.open("GET", url, true);
  x.responseType = "blob";
  x.onload = function (e) { download(e.target.response, name, "image/png"); };
  x.send();
}

const PatientMedicalRecordsList = ({ items: medicalRecords, userAddress, patientAddress, isDoctor = false }) => {

  useEffect(() => {
    const getNames = async (id) => {
      const nameElement = document.getElementById(id)
      const name = await getFileNameForHash(id)
      console.log(name)
      nameElement.innerHTML = name.replace(id + '_', '')
    }
    medicalRecords.map((medicalRecord, index) => getNames(medicalRecord))
  /* eslint-disable-next-line */
  }, [])
  return (
    <div>
      {!(medicalRecords && medicalRecords.length) &&
        'No medical records uploaded yet.'}
      {medicalRecords &&
        medicalRecords.map((medicalRecord, index) => {
          console.log(medicalRecord)
          return <div key={index} className='row'>
            <div id={medicalRecord} className='col-lg m-1 font-weight-bold'></div>
            <div className='col-lg m-1'>{medicalRecord}</div>
            <div className='col-lg-2 m-1'>
              <button className='btn btn-primary' onClick={
                () => downloadMedicalRecord(medicalRecord, userAddress, patientAddress)}
              >
                Download
              </button>
            </div>
            {!isDoctor &&
              <div className='col-lg-2 m-1'>
                <button disabled className='btn btn-danger'>Delete</button>
              </div>
            }
          </div>
        })}
    </div>
  )
}

export default PatientMedicalRecordsList;