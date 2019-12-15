import React from "react"
import DoctorsAccessButton from './DoctorsAccessButton'

const DoctorsList = ({ doctors, contract, accounts, accountId }) => {
  return (
    <div>
      {doctors && doctors.length &&
        doctors.map((doctor, index) => {
          return <div key={index} className='row'>
            <div className='col-lg-2 m-1'><b>{doctor.name}</b></div>
            <div className='col-lg m-1'>{accounts[doctor.account]}</div>
            <div className='col-lg-2 m-1'>
              <DoctorsAccessButton
                doctor={doctor}
                contract={contract}
                accounts={accounts}
                accountId={accountId}>
              </DoctorsAccessButton>
            </div>
          </div>
        })}
    </div>
  )
}

export default DoctorsList;