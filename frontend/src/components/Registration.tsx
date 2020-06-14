import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'

export default () => {
  return (
    <Form>
      <Form.Row >
        <Form.Label className="my-0" >Are you a Hospital Admin?</Form.Label>
      </Form.Row>
      <Form.Row className="mb-2">
        <Form.Check 
          type="radio"
          label="Yes"
          className="mr-5 font-weight-light"
        />
        <Form.Check 
          className="font-weight-light"
          type="radio"
          label="No"
        />
      </Form.Row>
      <Form.Row className="mb-2">
        <Form.Label className="my-0">Username</Form.Label>
        <FormControl 
          className="font-weight-light"
          type="text"
          placeholder="username"
        />
      </Form.Row>
      <Form.Row className="mb-2">
        <Form.Label className="my-0">Email</Form.Label>
        <FormControl 
          className="font-weight-light"
          type="email"
          placeholder="email"
        />
      </Form.Row>
      <Form.Row className="mb-2">
        <Form.Label className="my-0">Password</Form.Label>
        <FormControl 
          className="font-weight-light"
          type="password"
          placeholder="password"
        />
      </Form.Row>
      <Form.Row>
        <Form.Label className="my-0" >Confirm Password</Form.Label>
        <FormControl 
          className="font-weight-light"
          type="password"
          placeholder="confirm password"
        />
      </Form.Row>
      <Button className="mt-2" variant="primary" type="submit">
        Register
      </Button>
    </Form>
  )
}