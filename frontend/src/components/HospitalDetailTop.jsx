import React from 'react'

export default () => {
  
  const hospImage = {
    width: '50%',
    height: 400
  }

  const hospDesc = {
    width: '50%',
    height: 400
  }

  return (
    <div style={{display: 'flex'}}>
        <div style={hospImage}><img src="" alt="" srcset=""/></div>
        <div style={hospDesc}>
          <div>
            <h3>Fortis Hospital</h3>
            <p>Fortis Hospital Banglore's clinical & surgical centres of 
                excellence with great pre and post care facilities ensure that 
                your loved ones get back to the best of their health in no time.
            </p>
            <p>- More than 1000 patients are treated everyday</p>
            <p>- International Patients Services</p>
            <p>- Best In-Class Services</p>
          </div>
          <div>
            <table>
              <tr>
                <td>Adult ICU</td>
                <td>Docid-19 ICU</td>
              </tr>
              <tr>
                <td>Pediatric ICU</td>
                <td>Neonatal ICU</td>
              </tr>
            </table>
          </div>
        </div>
    </div>
  )
}