import React from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

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
            <Form.Control type="text" placeholder="country"/>
          </Form.Group>
        </Form.Row>

      </Form>
    </div>
  )
}