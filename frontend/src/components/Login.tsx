import React from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

export default () => {

  return (
    <Form>
      <Form.Row>
        <Form.Label>Email</Form.Label>
        <FormControl
          type="email"
          placeholder="email"
        />
      </Form.Row>
      <Form.Row>
        <Form.Label>Password</Form.Label>
        <FormControl 
          type="password"
          placeholder="password"
        />
      </Form.Row>
      <Button variant="primary" type="submit" >
        Login
      </Button>
    </Form>
  )
}