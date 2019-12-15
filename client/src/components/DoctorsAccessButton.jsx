import React, { useState } from "react"

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

const DoctorsAccessButton = ({ doctor, contract, accounts, accountId }) => {
  const [hasAccess, setHasAccess] = useState(doctor.hasAccess)
  return (
    <div>
      {hasAccess &&
        <button className='btn btn-success'
          onClick={() => {
            revokeAccessFromDoctor(accounts[doctor.account], contract, accounts, accountId)
            setHasAccess(false)
          }}>
          Revoke Access
        </button>
      }
      {!hasAccess &&
        <button className='btn btn-warning'
          onClick={() => {
            giveAccessToDoctor(accounts[doctor.account], contract, accounts, accountId)
            setHasAccess(true)
          }}>
          Give Access
        </button>
      }
    </div >
  )
}

export default DoctorsAccessButton;