import React from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
// import countryList from 'react-select-country-list'

export default () => {

  return (
    <div>
      <Form>
        <h5>Address</h5>
        <Form.Row>
          <Form.Group as={Col} controlId="formGroupEmail">
            <Form.Control type="text" placeholder="street" />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Control type="text" placeholder="city" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Control type="number" placeholder="zip" />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Control as="select">
              <option>1</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
      </Form>
    </div>
  )
}