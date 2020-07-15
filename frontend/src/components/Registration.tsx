import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

interface Register {
  hospital_admin: string;
  username: string;
  email: string;
  password: string;
  password_confirm: string;
}

export default () => {
  const emptyUser = {
    hospital_admin: '',
    username: '',
    email: '',
    password: '',
    password_confirm: ''
  }

  const [ userData, setUserData ]  = useState<Register>(emptyUser);

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserData({
      ...userData, 
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  const register = () => {
    // register
  }

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
          name="hospital_admin"
          value="true"
          checked={userData.hospital_admin === 'true'}
          onChange={handleDataChange}
        />
        <Form.Check 
          type="radio"
          label="No"
          className="font-weight-light"
          name="hospital_admin"
          value="false"
          checked={userData.hospital_admin === 'false'}
          onChange={handleDataChange}
        />
      </Form.Row>
      <Form.Row className="mb-2">
        <Form.Label className="my-0">Username</Form.Label>
        <FormControl 
          name="username"
          className="font-weight-light"
          type="text"
          placeholder="username"
          value={userData.username}
          onChange={handleDataChange}
        />
      </Form.Row>
      <Form.Row className="mb-2">
        <Form.Label className="my-0">Email</Form.Label>
        <FormControl 
          name="email"
          className="font-weight-light"
          type="email"
          placeholder="email"
          value={userData.email}
          onChange={handleDataChange}
        />
      </Form.Row>
      <Form.Row className="mb-2">
        <Form.Label className="my-0">Password</Form.Label>
        <FormControl 
          name="password"
          className="font-weight-light"
          type="password"
          placeholder="password"
          value={userData.password}
          onChange={handleDataChange}
        />
      </Form.Row>
      <Form.Row>
        <Form.Label className="my-0" >Confirm Password</Form.Label>
        <FormControl 
          name="password_confirm"
          className="font-weight-light"
          type="password"
          placeholder="confirm password"
          value={userData.password_confirm}
          onChange={handleDataChange}
        />
      </Form.Row>
      <Button 
        className="mt-2" 
        variant="primary" 
        type="submit"
        onClick={register}
      >
        Register
      </Button>
    </Form>
  )
}