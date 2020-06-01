import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useParams } from 'react-router-dom'
import style from './HospitalInventoryEdit.module.css'
import { hospitalInventoryList } from '../apis/infomed'
// import countryList from 'react-select-country-list'

interface HospitalInventoryParams {
  hospitalId: string
}

interface InventoryItem {
  name: string;
  available: number;
}

export const HospitalInventoryEdit = ({hospitalId}: HospitalInventoryParams) => {

  const [inventoryList, setInventoryList] = useState<string[]>([]);
  const [inventoryItemState, setInventoryItemState] = useState<InventoryItem[]>([]);

  useEffect(() => {
    const list = hospitalInventoryList;
    setInventoryList(list);


  });

  return (
    <div>
      <Form>
        <h5>Address</h5>
        <Form.Row>
          <Form.Group as={Col} controlId="formGroupEmail">
            <Form.Control type="text" placeholder="street" />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Control type="text" placeholder="city" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Control type="number" placeholder="zip" />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} xs={8} md={6}>
            <Form.Control as="select">
              <option>1</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} xs={8} md={6}>
            <Button variant="outline-primary" size="lg" block>Update Info</Button>{' '}
          </Form.Group>
        </Form.Row>
      </Form>

      <Form>
        <Form.Row>
        <Form.Label>Filter By:</Form.Label>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Control as="select" value="Choose...">
              <option>State</option>
              <option>...</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Control as="select" value="Choose...">
              <option>District</option>
              <option>...</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Control as="select" value="Choose...">
              <option>Town</option>
              <option>...</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
      </Form>

      <Form>
        <h5>Fortis Hospital</h5>
        <Form.Text className="text-muted">
          1 June 2020, 05:14:33am
        </Form.Text>
        <Form.Row>
          {inventoryList.map((item) => (
            <Card className={`text-center ${style.inputCard}`} >
              <Form.Text>
                <strong>{item}</strong>
              </Form.Text>
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="number" className={style.inventoryInput} />
              </Form.Group>
            </Card>))}
        </Form.Row>
      </Form>
    </div>
  )
}

export default () => {
  const { hospitalId } = useParams();

  return (
    <HospitalInventoryEdit hospitalId={hospitalId}/>
  )
}