import React, { useEffect, useRef } from "react"
import ReactDOM from 'react-dom'
import PatientsOverview from "./PatientsOverview"

const DoctorView = ({ contract, accounts, accountId }) => {
  const doctorViewRef = useRef()
  useEffect(() => {
    const patients = []
    const buildPatientsOverview = async () => {
      const doctorsPermissions = await contract.methods.getDoctorsPermissions(accounts[accountId]).call({ from: accounts[accountId], gas: 100000 })
      const seenAddresses = []
      doctorsPermissions.map(async (address, _) => {
        if (!seenAddresses.includes(address)) {
          seenAddresses.push(address)
          const documents = await contract.methods.getDocuments(address).call({ from: accounts[accountId], gas: 100000 })
          patients.push({address: address, documents: documents})
        }
      })
    }
    buildPatientsOverview()
    setTimeout(() => {
      ReactDOM.render(
        <PatientsOverview patients={patients} doctorsAddress={accounts[accountId]}></PatientsOverview>,
        doctorViewRef.current
      )
    }, 500
    )
  /* eslint-disable-next-line */
  }, [])
  return (
    <div ref={doctorViewRef}></div>
  )
}

export default DoctorView;