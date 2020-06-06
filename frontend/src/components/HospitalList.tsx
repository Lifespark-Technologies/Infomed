import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import style from './HospitalList.module.css';

export default () => {
  
  return (
    <CardColumns>
      <Card className={style.card}>
        <Card.Img variant="top" src="" className={style.hospital_image} />
        <Card.Body>
          <Card.Title>Fortis Hospital</Card.Title>
          <Button variant="info">More</Button>
        </Card.Body>
      </Card>
      <Card className={style.card}>
        <Card.Img variant="top" src="" className={style.hospital_image}/>
        <Card.Body>
          <Card.Title>Mahatma Ghandi Hopital</Card.Title>
          <Button variant="info">More</Button>
        </Card.Body>
      </Card>
      <Card className={style.card}>
        <Card.Img variant="top" src="" className={style.hospital_image}/>
        <Card.Body>
          <Card.Title>Rajiv Gandi Institute</Card.Title>
          <Button variant="info">More</Button>
        </Card.Body>
      </Card>
      <Card className={style.card}>
        <Card.Img variant="top" src="" className={style.hospital_image} />
        <Card.Body>
          <Card.Title>Fortis Hospital</Card.Title>
          <Button variant="info">More</Button>
        </Card.Body>
      </Card>
      <Card className={style.card}>
        <Card.Img variant="top" src="" className={style.hospital_image}/>
        <Card.Body>
          <Card.Title>Mahatma Ghandi Hopital</Card.Title>
          <Button variant="info">More</Button>
        </Card.Body>
      </Card>
      <Card className={style.card}>
        <Card.Img variant="top" src="" className={style.hospital_image}/>
        <Card.Body>
          <Card.Title>Rajiv Gandi Institute</Card.Title>
          <Button variant="info">More</Button>
        </Card.Body>
      </Card>
    </CardColumns>
  )
}
