import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { format } from 'date-fns'
import { useParams } from 'react-router-dom'
import { HospitalInventory, HospitalAddress, fetchHospitalInventory, fetchHospitalAddress } from '../apis/infomed'


interface HospitalInventoryParams {
  hospitalId: string
}

export const HospitalInventoryEditor = ({hospitalId}: HospitalInventoryParams) => {

  const [inventoryList, setInventoryList] = useState<HospitalInventory[]>([]);
  const [hospitalAddress, setHospitalAddress] = useState<HospitalAddress>({});

  useEffect(() => {
    (async () => {
      const [list, address] = await Promise.all([
        fetchHospitalInventory(hospitalId),
        fetchHospitalAddress(hospitalId)
      ])
      setInventoryList(list);
      setHospitalAddress(address);
    })();
  }, [hospitalId]);

  const handleInventoryChange  = (index: number, e: React.ChangeEvent<HTMLInputElement>): void => {
    const updatedList = [...inventoryList];
    updatedList[index].available = parseInt(e.currentTarget.value);
    setInventoryList(updatedList);
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const updatedAddress = {...hospitalAddress};
    const inputName = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (inputName === 'zip') updatedAddress[inputName] = parseInt(value);

    if (inputName === 'city' || inputName === 'street' || inputName === 'country') 
      updatedAddress[inputName] = value;
  
    setHospitalAddress(updatedAddress);
  }

  const updateInventoryList = () => {
    // Update the inventory list
  }

  const updateHospitalAddress = () => {
    // Update the hospital address
  }

  return (
    <div className="mx-5">
      <Form>
        <h5>Address</h5>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Control 
              type="text" 
              placeholder="street" 
              name="street"
              value={hospitalAddress.street || ''}
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
              value={hospitalAddress.city || ''}
              onChange={handleAddressChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Control 
              type="number" 
              placeholder="zip" 
              name="zip"
              value={hospitalAddress.zip || ''}
              onChange={handleAddressChange}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} xs={8} md={6}>
            <Form.Control as="select" 
              name="country"
              value={hospitalAddress.country || ''}
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
            </Button>
          </Form.Group>
        </Form.Row>
      </Form>

      <Form>
        <h5>Fortis Hospital</h5>
        <Form.Text className="text-muted">
          {format(new Date(), 'do MMMM yyyy, hh:mm:ss a' )}
        </Form.Text>
        <Form.Row>
          {inventoryList.map((item, index) => (
            <Card 
              className="text-center mx-1"
              key={item.resourceType} 
            >
              <Form.Text>
                <strong>{item.resourceType}</strong>
              </Form.Text>
              <Form.Group>
                <Form.Control
                  type="number"
                  className="text-center"
                  data-index={index}
                  value={item.available ? item.available : 0}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInventoryChange(index, e)}
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
            </Button>
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
    <HospitalInventoryEditor hospitalId={hospitalId}/>
  )
}