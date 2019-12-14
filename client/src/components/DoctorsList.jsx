import React from "react"

const giveAccessToDoctor = async (doctorAddress, contract, accounts, accountId) => {
  await contract.methods.giveAccessToDoctor(doctorAddress).send({ from: accounts[accountId], gas: 100000 })
  const permissions = await contract.methods.getDoctorsPermissions(doctorAddress).call({ from: accounts[accountId], gas: 100000 })
  console.log(permissions)
}

const revokeAccessFromDoctor = async (doctorAddress, contract, accounts, accountId) => {
  const doctorsPermissions = await contract.methods.getDoctorsPermissions(doctorAddress).call({ from: accounts[accountId], gas: 100000 })
  doctorsPermissions.map(async (address, index) => {
    if (address === accounts[accountId]) {
      await contract.methods.revokeAccessFromDoctor(doctorAddress, index).send({ from: accounts[accountId], gas: 100000 })
    }
  })
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
                onClick={() => giveAccessToDoctor(doctor.address, contract, accounts, accountId)}
                >
                Give Access
              </button>
            </div>
            <div className='col-lg-2 m-1'>
              <button className='btn btn-warning'
                onClick={() => revokeAccessFromDoctor(doctor.address, contract, accounts, accountId)}
                >
                Revoke Access
              </button>
            </div>
          </div>
        })}
    </div>
  )
}

export default DoctorsList;