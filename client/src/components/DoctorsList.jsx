import React from "react"
import './Components.css'

const giveAccessToDoctor = async (doctorAddress, contract, accounts, accountId) => {
  await contract.methods.giveAccessToDoctor(accounts[1]).call({ from: accounts[accountId], gas: 100000 })
  const permissions = await contract.methods.getDoctorsPermissions(accounts[1]).call({ from: accounts[accountId], gas: 100000 })
  console.log(permissions)
}

const DoctorsList = ({ items: doctors, contract, accounts, accountId }) => {
  return (
    <div>
      {doctors && doctors.length &&
        doctors.map((doctor, index) => {
          return <div key={index} className='row'>
            <div className='col-lg-2 m-1'><b>{doctor.name}</b></div>
            <div className='col-lg m-1'>{doctor.address}</div>
            <div className='col-lg-2 m-1'>
              <button className='btn btn-success'
                onClick={() => giveAccessToDoctor(doctor.address, contract, accounts, accountId)}>
                  Give Access
              </button>
            </div>
            <div className='col-lg-2 m-1'>
              <button disabled className='btn btn-warning'>Revoke Access</button>
            </div>
          </div>
        })}
    </div>
  )
}

export default DoctorsList;