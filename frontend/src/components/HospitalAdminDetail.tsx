import React from 'react'
import Calendar from "react-calendar";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card';
import styles from './HospitalAdminDetail.module.css';

interface HospitalAdminDetailProps {
  onDateChange?: (date: Date | Date[]) => void;
}

export default ({ onDateChange }: HospitalAdminDetailProps) => (
  <Row className="mb-4">
    <Col md="5">
      <Card bg="light" className="shadow">
        <Card.Body>
          <input type="text" placeholder="Insert six digit code" />
          <br />
          <button>Join Visit</button>
          <br />
          <button>Upload results</button>
        </Card.Body>
      </Card>
    </Col>
    <Col md="7">
      <Card bg="light" className="shadow">
        <Card.Body className={styles.calendarCard}>
          <Calendar onChange={onDateChange} />
        </Card.Body>
      </Card>
    </Col>
  </Row>

)