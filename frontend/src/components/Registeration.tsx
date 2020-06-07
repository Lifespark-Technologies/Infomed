import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'

export default () => {
  return (
    <Form>
     
      <Form.Row>
        <Form.Label>Username</Form.Label>
        <FormControl 
          type="text"
          placeholder="username"
        />
      </Form.Row>
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
      <Form.Row>
        <Form.Label>Confirm Password</Form.Label>
        <FormControl 
          type="password"
          placeholder="confirm password"
        />
      </Form.Row>
      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
  )
}