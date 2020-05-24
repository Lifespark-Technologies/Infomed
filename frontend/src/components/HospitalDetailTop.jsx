import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default () => {

  return (
    <Row>
      <Col><img src="" alt="" srcSet="" /></Col>
      <Col>
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
            <tbody>
              <tr>
                <td>Adult ICU</td>
                <td>Docid-19 ICU</td>
              </tr>
              <tr>
                <td>Pediatric ICU</td>
                <td>Neonatal ICU</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Col>
    </Row>
  )
}