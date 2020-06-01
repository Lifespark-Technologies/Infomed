import React from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
// import countryList from 'react-select-country-list'

export default () => {

  return (
    <Row>
      <Col>
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
          <Form.Group as={Col} xs={8} md={6}>
            <Form.Control as="select">
              <option>1</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} xs={8} md={6}>
          <Button variant="outline-primary" size="lg" block>Update Info</Button>{' '}
          </Form.Group>
        </Form.Row>
      </Form>
      </Col>
      <Row>
        
      </Row>
    </Row>
  )
}