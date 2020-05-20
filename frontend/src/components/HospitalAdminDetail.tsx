import React from 'react'
import Calendar from "react-calendar";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default () => {

  return (
    <Container>
      <Row>
        <Col>
          <input type="text" placeholder="Insert six digit code"/>
          <br/>
          <button>Join Visit</button>
          <br/>
          <button>Upload results</button>
        </Col>
        <Col>
          <Calendar />
        </Col>
      </Row>
    </Container>
  )
}