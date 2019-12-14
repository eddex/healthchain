import React from "react"
import './Components.css'

const DoctorsList = ({ items: doctors }) => {
  return (
    <div>
      {doctors && doctors.length &&
        doctors.map((doctor, index) => {
          return <div key={index} className='row'>
            <div className='col-lg-2 m-1'><b>{doctor.name}</b></div>
            <div className='col-lg m-1'>{doctor.hash}</div>
            <div className='col-lg-2 m-1'>
              <button className='btn btn-success'>Give Access</button>
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