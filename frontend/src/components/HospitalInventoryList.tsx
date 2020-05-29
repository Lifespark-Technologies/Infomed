import React, { useState, useEffect } from 'react'
import {HospitalInventory, fetchHospitalInventory} from '../apis/infomed'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useParams } from 'react-router-dom'

interface HospitalInventoryListParams {
  hospitalId: string;
}

export const HospitalInventoryList =  ({hospitalId}: HospitalInventoryListParams) => {

  const [hospitalInventoryList, setHospitalInventoryList] = useState<HospitalInventory[]>([]);

  useEffect(() => {
    (async () => {
      const inventoryList = await fetchHospitalInventory(hospitalId);
      setHospitalInventoryList(inventoryList);
    })();
  });
  
  const inventoryItems = hospitalInventoryList.map((item) => 
    <ListGroup.Item key={item.resourceType}>
      <Row>
        <Col xs={6}>{item.resourceType}</Col>
        <Col xs={6}>
          <Badge pill variant="primary">
            {item.available ? `${item.available} of ` : '0 of '}
            {item.total ? `${item.total} ` : '0 '}
            {item.unit}
          </Badge>{' '} 
        </Col>
      </Row>
    </ListGroup.Item>
  );

  return (
    <ListGroup>
      {inventoryItems}
    </ListGroup>
  )
}

export default () => {
  const { hospitalId } = useParams()
  return (
    <div>
      <h1>Fortis Hospital</h1>
      <h5>Inventory List</h5>
        <HospitalInventoryList hospitalId={hospitalId} />
    </div>
  )
}