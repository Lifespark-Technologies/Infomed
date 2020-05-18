import React from 'react'
import AppointmentScheduler from './AppointmentScheduler'

export default () => {

    const codeForm = {
        
    }

  return (
    <div style={{display: 'flex'}}>
      <div style={{textAlign: 'center', width: '50%'}}>
        <input type="text" placeholder="Insert six digit code"/>
        <br/>
        <button>Join Visit</button>
        <br/>
        <button>Upload results</button>
      </div>
      <div>
        <AppointmentScheduler />
      </div>
    </div>
  )
}