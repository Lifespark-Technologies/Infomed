import React, { useState } from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

export default () => {
  const [ email, setEmail ] = useState<string>('')
  const [ password, setPassword ] = useState<string>('')

  const login = () => {
    // Login
  }

  return (
    <Form>
      <Form.Row>
        <Form.Label >Email</Form.Label>
        <FormControl
          className="font-weight-light"
          type="email"
          placeholder="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => 
            setEmail(e.currentTarget.value)}
        />
      </Form.Row>
      <Form.Row className="mt-3">
        <Form.Label >Password</Form.Label>
        <FormControl 
          className="font-weight-light"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            setPassword(e.currentTarget.value)}
        />
      </Form.Row>
      <Button 
        className="mt-3" 
        variant="primary" 
        type="submit" 
        onClick={login}
      >
          Login
      </Button>
    </Form>
  )
}