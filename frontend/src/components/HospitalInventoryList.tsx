import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default () => {
  
  return (
    <div>
      <h1>Fortis Hospital</h1>
      <h5>Inventory List</h5>
      <ListGroup>
        <ListGroup.Item>
          <Row>
            <Col xs={6}>Hospital Bed Occupancy</Col>
            <Col xs={6}><Badge pill variant="primary">63</Badge>{' '} </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col xs={6}>Number of Ventilators available</Col>
            <Col xs={6}><Badge pill variant="primary">50</Badge>{' '} </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col xs={6}>N95 Masks</Col>
            <Col xs={6}><Badge pill variant="primary">73</Badge>{' '} </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col xs={6}>3 Layer Mask</Col>
            <Col xs={6}><Badge pill variant="primary">63</Badge>{' '} </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col xs={6}>PPE Kit</Col>
            <Col xs={6}><Badge pill variant="primary">100</Badge>{' '} </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col xs={6}>Sanitizer</Col>
            <Col xs={6}><Badge pill variant="primary">1500</Badge>{' '} </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col xs={6}>Bleaching Powder</Col>
            <Col xs={6}><Badge pill variant="primary">63</Badge>{' '} </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col xs={6}>Sodium Hypochlorite</Col>
            <Col xs={6}><Badge pill variant="primary">10</Badge>{' '} </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col xs={6}>Chemical Gloves</Col>
            <Col xs={6}><Badge pill variant="primary">2000</Badge>{' '} </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col xs={6}>Infrared Thermometer</Col>
            <Col xs={6}><Badge pill variant="primary">150</Badge>{' '} </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col xs={6}>Handwash</Col>
            <Col xs={6}><Badge pill variant="primary">5633</Badge>{' '} </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col xs={6}>Viral Transport Medium</Col>
            <Col xs={6}><Badge pill variant="primary">62</Badge>{' '} </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col xs={6}>Swap Sticks</Col>
            <Col xs={6}><Badge pill variant="primary">76</Badge>{' '} </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col xs={6}>3 Layer packing Mask</Col>
            <Col xs={6}><Badge pill variant="primary">23</Badge>{' '} </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col xs={6}>Ice Gel Pack</Col>
            <Col xs={6}><Badge pill variant="primary">123</Badge>{' '} </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col xs={6}>Rubbing Alcohol</Col>
            <Col xs={6}><Badge pill variant="primary">60</Badge>{' '} </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </div>
  )
}