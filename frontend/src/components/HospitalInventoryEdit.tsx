import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useParams } from 'react-router-dom'
import style from './HospitalInventoryEdit.module.css'
import { HospitalInventory, HospitalAddress, fetchHospitalInventory, fetchHospitalAddress } from '../apis/infomed'


interface HospitalInventoryParams {
  hospitalId: string
}

export const HospitalInventoryEdit = ({hospitalId}: HospitalInventoryParams) => {

  const [inventoryList, setInventoryList] = useState<HospitalInventory[]>([]);
  const [hospitalAddress, setHospitalAddress] = useState<HospitalAddress[]>([]);

  useEffect(() => {
    (async () => {
      const list = await fetchHospitalInventory(hospitalId);
      setInventoryList(list);
      
      const address = await fetchHospitalAddress(hospitalId);
      setHospitalAddress(address);
    })();
  }, [hospitalId]);

  const handleInventoryChange  = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const updateList = [...inventoryList];
    const target = e.target.getAttribute("data-index");
    const dataIndex = parseInt(target !== null ? target : '0');
    updateList[dataIndex]["available"] = parseInt(e.currentTarget.value);
    setInventoryList(updateList);
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const updateAddress = [...hospitalAddress];
    const inputName = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (inputName === 'zip') updateAddress[0][inputName] = parseInt(value);

    if (inputName === 'city' || inputName === 'street' || inputName === 'country') 
      updateAddress[0][inputName] = value;
  
    setHospitalAddress(updateAddress);
  }

  const updateInventoryList = () => {
    // Update the inventory list
  }

  const updateHospitalAddress = () => {
    // Update the hospital address
  }

  return (
    <div className={style.containerDiv}>
      <Form>
        <h5>Address</h5>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Control 
              type="text" 
              placeholder="street" 
              name="street"
              value={hospitalAddress[0] ? hospitalAddress[0].street : ''}
              onChange={handleAddressChange}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Control 
              type="text" 
              placeholder="city" 
              name="city"
              value={hospitalAddress[0] ? hospitalAddress[0].city : ''}
              onChange={handleAddressChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Control 
              type="number" 
              placeholder="zip" 
              name="zip"
              value={hospitalAddress[0] ? hospitalAddress[0].zip : ''}
              onChange={handleAddressChange}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} xs={8} md={6}>
            <Form.Control as="select" 
              name="country"
              value={hospitalAddress[0] ? hospitalAddress[0].country : ''}
              onChange={handleAddressChange}
            >
              <option value="India">India</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} xs={8} md={6}>
            <Button 
              variant="outline-primary" 
              size="lg" 
              block
              onClick={updateHospitalAddress}
            >
              Update Info
            </Button>{' '}
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
              <option>India</option>
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
          {inventoryList.map((item, index) => (
            <Card 
              className={`text-center ${style.inputCard}`}
              key={item.resourceType} >
                <Form.Text>
                  <strong>{item.resourceType}</strong>
                </Form.Text>
                <Form.Group>
                  <Form.Control
                    type="number"
                    className={style.inventoryInput}
                    data-index={index}
                    value={item.available ? item.available : 0}
                    onChange={handleInventoryChange}
                  />
                </Form.Group>
            </Card>
          ))}
        </Form.Row>
        <Form.Row>
          <Form.Label column md={2}></Form.Label>
          <Form.Group as={Col} md={8}>
            <Button 
              variant="outline-primary" 
              size="lg" 
              block
              onClick={updateInventoryList}
            >
              Update Inventory
            </Button>{' '}
          </Form.Group>
          <Form.Label column md={2}></Form.Label>
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