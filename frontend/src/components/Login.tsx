import React from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

export default () => {

  return (
    <Form>
      <Form.Row>
        <Form.Label >Email</Form.Label>
        <FormControl
          className="font-weight-light"
          type="email"
          placeholder="email"
        />
      </Form.Row>
      <Form.Row className="mt-3">
        <Form.Label >Password</Form.Label>
        <FormControl 
          className="font-weight-light"
          type="password"
          placeholder="password"
        />
      </Form.Row>
      <Button className="mt-3" variant="primary" type="submit" >
        Login
      </Button>
    </Form>
  )
}